var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.port || 1337;
var pub = '/public/'
var css = pub + 'css/'

app.get('/', function (req, res) {
    res.sendFile(__dirname + pub + 'index.html');
});

app.get('/css/index.css', function (req, res) {
    res.sendFile(__dirname + css + 'index.css');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(port, function () {
    console.log('Server stated on port ' + port);
});


 