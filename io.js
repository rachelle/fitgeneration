/*var io = require('socket-io')(); 
var Message = require('./models/Message'); 

io.on('connection', function(socket) {
  console.log('user connected'); 

  socket.on('disconnect', function() {
    console.log('user disconnected'); 
  }); 

  socket.on('register-chat', function(room) {
    // console.log()
    socket.join(room); 

    socket.room = room;
}); 

  socket.on('private-message', function(message) {
    io.to(socket.room).emit('private-message', message); 
    Message.create(message);
  });
});

module.exports = io; */