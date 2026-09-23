import http.server, socketserver, os
PORT = 8000
class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow iframe embedding for Arena preview
        self.send_header('X-Frame-Options', 'ALLOWALL')
        self.send_header('Access-Control-Allow-Origin', '*')
        if self.path.endswith('.zip'):
            self.send_header('Content-Disposition', 'attachment; filename=pfp-premium-site.zip')
        super().end_headers()

os.chdir('/home/user/pfp')
with socketserver.TCPServer(('0.0.0.0', PORT), Handler) as httpd:
    print(f"Serving PFP Premium at http://0.0.0.0:{PORT}")
    httpd.serve_forever()
