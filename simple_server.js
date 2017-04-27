var http = require('http');
const PORT = 8080;

function handle_incoming_request(req, res) {
  console.log('INCOMING REQUEST:' + req.method + ' ' + req.url);
  res.writeHead(200, { "Content_Type" : "application/json" });
  res.end(JSON.stringify( { error: null }) + '\n');
}

var server = http.createServer(handle_incoming_request);

server.listen(PORT, () => {
  console.log('listening on http://localhost: ' + PORT);
});
