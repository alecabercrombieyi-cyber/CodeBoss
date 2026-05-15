// revenova-bridge: a tiny localhost HTTP shim that lets load-manager.html
// (running from file:// or anywhere) call Salesforce REST endpoints without
// the iframe download trick. Holds the SF access token server-side; emits
// permissive CORS so the browser fetch works.
//
// Build:   go build -o revenova-bridge ./serve
// Run:     SF_ACCESS_TOKEN=... SF_INSTANCE_URL=https://bayandbaytms.my.salesforce.com \
//          ./revenova-bridge --port 8765
//
// Endpoints:
//   GET  /health                       → {"ok":true}
//   GET  /report/<reportId>            → Analytics REST run-report (includeDetails=true)
//   GET  /soql?q=<SOQL>                → /services/data/<v>/query
//   GET  /sobjects/<Name>/<Id>         → record fetch
//   PATCH /sobjects/<Name>/<Id>        → update fields (JSON body proxied through)
package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
)

func main() {
	port := flag.Int("port", 8765, "port to listen on")
	apiVersion := flag.String("api-version", "v62.0", "Salesforce REST API version")
	flag.Parse()

	token := os.Getenv("SF_ACCESS_TOKEN")
	instance := strings.TrimRight(os.Getenv("SF_INSTANCE_URL"), "/")
	if token == "" || instance == "" {
		log.Fatal("SF_ACCESS_TOKEN and SF_INSTANCE_URL must be set in env")
	}

	proxy := func(method, sfPath string, body io.Reader) (*http.Response, error) {
		req, err := http.NewRequest(method, instance+sfPath, body)
		if err != nil {
			return nil, err
		}
		req.Header.Set("Authorization", "Bearer "+token)
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Accept", "application/json")
		return http.DefaultClient.Do(req)
	}

	withCORS := func(h http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}
			h(w, r)
		}
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/health", withCORS(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"ok":true,"instance":%q,"apiVersion":%q}`, instance, *apiVersion)
	}))

	mux.HandleFunc("/report/", withCORS(func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/report/")
		if id == "" {
			http.Error(w, "missing report id", http.StatusBadRequest)
			return
		}
		sfPath := fmt.Sprintf("/services/data/%s/analytics/reports/%s?includeDetails=true", *apiVersion, id)
		resp, err := proxy(http.MethodPost, sfPath, nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.StatusCode)
		io.Copy(w, resp.Body)
	}))

	mux.HandleFunc("/soql", withCORS(func(w http.ResponseWriter, r *http.Request) {
		q := r.URL.Query().Get("q")
		if q == "" {
			http.Error(w, "missing q", http.StatusBadRequest)
			return
		}
		sfPath := fmt.Sprintf("/services/data/%s/query?q=%s", *apiVersion, url.QueryEscape(q))
		resp, err := proxy(http.MethodGet, sfPath, nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.StatusCode)
		io.Copy(w, resp.Body)
	}))

	mux.HandleFunc("/sobjects/", withCORS(func(w http.ResponseWriter, r *http.Request) {
		rest := strings.TrimPrefix(r.URL.Path, "/sobjects/")
		if rest == "" {
			http.Error(w, "missing sobject path", http.StatusBadRequest)
			return
		}
		sfPath := fmt.Sprintf("/services/data/%s/sobjects/%s", *apiVersion, rest)
		resp, err := proxy(r.Method, sfPath, r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.StatusCode)
		io.Copy(w, resp.Body)
	}))

	addr := fmt.Sprintf("127.0.0.1:%d", *port)
	log.Printf("revenova-bridge listening on http://%s (instance=%s)", addr, instance)
	log.Fatal(http.ListenAndServe(addr, mux))
}
