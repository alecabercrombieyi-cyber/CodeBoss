// Supabase Edge Function: revenova-pull
//
// Logs into Salesforce/Revenova server-side and returns your report as CSV
// (or JSON). This is what lets the Load Manager's "Update" button pull data
// directly — the browser can't call Salesforce itself (CORS), but this can.
//
// Deploy (no install needed — all in the browser):
//   1. Supabase Dashboard → Edge Functions → Deploy a new function
//   2. Name it exactly:  revenova-pull
//   3. Paste this file's contents, click Deploy
//   4. Project Settings → Edge Functions → Secrets, add:
//        SF_USERNAME   your Revenova login email
//        SF_PASSWORD   your password
//        SF_TOKEN      your security token (blank if your org doesn't use one)
//        SF_REPORT     your report URL or 00O... id   (the Load Manager one is
//                      00OPe00000kBFfZMAW)
//        SF_LOGIN_URL  https://login.salesforce.com  (or test.salesforce.com for sandbox)
//
// Call it:  GET /functions/v1/revenova-pull            → CSV
//           GET /functions/v1/revenova-pull?format=json → JSON rows
//           GET /functions/v1/revenova-pull?report=00O… → override the report

const API_VERSION = "59.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
};

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function extractReportId(input: string): string | null {
  const m = String(input || "").match(/00O[a-zA-Z0-9]{12,15}/);
  return m ? m[0] : null;
}

function originOf(url: string): string | null {
  try { const u = new URL(url); return u.protocol + "//" + u.host; } catch { return null; }
}

// Minimal RFC-4180 CSV parser → row arrays.
function parseCSV(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let field = ""; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); field = ""; rows.push(row); row = []; }
    else if (c === "\r") { /* skip */ }
    else field += c;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function csvToObjects(text: string): Record<string, string>[] {
  const rows = parseCSV(text).filter((r) => r.length && !(r.length === 1 && r[0] === ""));
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const o: Record<string, string> = {};
    headers.forEach((h, i) => { o[h] = r[i] ?? ""; });
    return o;
  });
}

async function login(): Promise<{ sessionId: string; instanceUrl: string }> {
  const username = Deno.env.get("SF_USERNAME");
  const password = Deno.env.get("SF_PASSWORD");
  const token = Deno.env.get("SF_TOKEN") || "";
  const loginUrl = Deno.env.get("SF_LOGIN_URL") || "https://login.salesforce.com";
  if (!username || !password) throw new Error("Server is missing SF_USERNAME / SF_PASSWORD secrets.");

  const endpoint = (originOf(loginUrl) || "https://login.salesforce.com") + "/services/Soap/u/" + API_VERSION;
  const body =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<env:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
    ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
    ' xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<env:Body><n1:login xmlns:n1="urn:partner.soap.sforce.com">' +
    "<n1:username>" + xmlEscape(username) + "</n1:username>" +
    "<n1:password>" + xmlEscape(password + token) + "</n1:password>" +
    "</n1:login></env:Body></env:Envelope>";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/xml; charset=UTF-8", "SOAPAction": "login" },
    body,
  });
  const text = await res.text();
  const fault = text.match(/<faultstring>([\s\S]*?)<\/faultstring>/);
  if (fault) throw new Error("Salesforce login failed: " + fault[1]);
  const sid = text.match(/<sessionId>([\s\S]*?)<\/sessionId>/);
  const surl = text.match(/<serverUrl>([\s\S]*?)<\/serverUrl>/);
  if (!sid || !surl) throw new Error("Login response had no sessionId (HTTP " + res.status + ").");
  const instanceUrl = originOf(surl[1]);
  if (!instanceUrl) throw new Error("Could not parse instance URL from login response.");
  return { sessionId: sid[1], instanceUrl };
}

async function fetchReportCSV(session: { sessionId: string; instanceUrl: string }, reportId: string): Promise<string> {
  const url = session.instanceUrl + "/servlet/PrintableViewDownloadServlet" +
    "?reportId=" + encodeURIComponent(reportId) + "&xf=csv&enc=UTF-8&csvDelimiter=comma";
  const res = await fetch(url, {
    headers: { "Cookie": "sid=" + session.sessionId, "Authorization": "Bearer " + session.sessionId },
    redirect: "follow",
  });
  const text = await res.text();
  if (!res.ok) throw new Error("Report download failed (HTTP " + res.status + ").");
  if (/^\s*<(!DOCTYPE|html)/i.test(text) || /<title>[^<]*login/i.test(text)) {
    throw new Error("Got an HTML page instead of CSV — session rejected or wrong report id.");
  }
  return text;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const u = new URL(req.url);
    const reportArg = u.searchParams.get("report") || Deno.env.get("SF_REPORT") || "";
    const reportId = extractReportId(reportArg) || reportArg;
    if (!reportId || !/^00O/.test(reportId)) {
      throw new Error("No valid report id. Set the SF_REPORT secret or pass ?report=00O...");
    }
    const session = await login();
    const csv = await fetchReportCSV(session, reportId);

    if (u.searchParams.get("format") === "json") {
      return new Response(JSON.stringify({ rows: csvToObjects(csv), count: parseCSV(csv).length - 1 }), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    return new Response(csv, { headers: { ...cors, "Content-Type": "text/csv; charset=utf-8" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 502, headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
