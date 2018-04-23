//Server

var express = require('express');
var socket = require('socket.io');

//Chat setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', function(socket){

    console.log('made socket connection', socket.id); //esercizio?

    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    // Handle typing event //esercizio?
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
