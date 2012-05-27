var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs')

app.listen(process.env.PORT || 8001);

function handler (req, res) {
fs.readFile('index.html',
function (err, data) {
if (err) {
res.writeHead(500);
return res.end('Error loading index.html');
}

res.writeHead(200, {'Content-Type': 'text/html', "Content-Length": data.length});
res.end(data);
});
}


var mongopass = process.env.MONGO_PASS != undefined ? process.env.MONGO_PASS : process.argv[2];


io.sockets.on('connection', function (socket) {
// echo the message
socket.on('message', function (data) {
console.info(data);
socket.send("[ECHO] "+data + " - argv : " + mongopass);
});
});

console.log(process.argv[2]);

