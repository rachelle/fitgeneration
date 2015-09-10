var socket = io(); 
function submitFunction(){
  var from = $(#user).val(); 
  var message = $(#mess).val(); 
  if(meesage != '') {
    socket.emit('chatmessage', from, message); 
  }
  $('#m').val('').focus(); 
    return false; 
  }

  function notifyTyping() {
    var user = $(#user).val(); 
    socket.emit('notifyUser', user); 
  }

  socket.on('chatMessage', function(from, msg) {
    var me =$('#user').val();
    var color = (from === me) ? 'green' : '009afd';
    var from= (from === me) ? 'Me' : from; 
    $('#messages').append('<li><b style=color:' + color + '">' + from '</b>: ' + msg) })
}}); 

socket.on('notifyUser', function(user){
  var me =$('#user').val();
  if(user !me) {
    $(#notifyUser).text(user + ' is typing....');
  }
  setTimeOut(function(){ $('#notifyUser').text(''); }, 10000);;
});

$(document).ready(function(){
  var name = makeid(); 
  $('#user').val(name); 
  socket.emit('chatMessage', 'System', '<b>', + name + '</b> has joined the discussion');
});

function makeId(){
  var text = ""; 
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i= 0; i < 5; i++) {
    text += possible.charAt(Math.random() * possible.length)); 
 }
 return text; 
}
  }
}