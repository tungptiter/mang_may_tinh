//Code khai báo sử dụng socket.io ở server:
var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});
 
// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => { // tạo kết nối giữa client và server

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){     //server lắng nghe dữ liệu từ client
        console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){  //sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
        socket.broadcast.emit('typing', data); // socket.broadcast.emit là gửi cho tất cả client trừ người gửi
    });

});
