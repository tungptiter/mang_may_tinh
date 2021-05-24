// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){    //client gửi dữ liệu lên server
    socket.emit('chat', { 
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){ 
    socket.emit('typing', handle.value);   // lắng nghe xem có đang gõ ô tin nhắn không
})

// Listen for events
socket.on('chat', function(data){ // tin nhắn
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){ // hiển thị ai đang nhập tin nhắn
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
