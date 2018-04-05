var socket = io();

socket.on('connect' , ()=>{
  console.log('connected to server');

});
//
// socket.on('newMessage' , function (msg) {
//
//   console.log('Message Details',msg);
//
// });

socket.on('disconnect' , () =>{

  console.log('Disconnected to server');
});

socket.on('newMessage' , function (msg){
  console.log('New Message' , msg);
  var li = jQuery('<li> </li>');
  li.text(`${msg.from} : ${msg.text}`)
  jQuery('#messages').append(li);
});


// socket.emit('createMessage' , {
//   from :'User' ,
//   text:'Hi'
// } , function(data) {
//   console.log(data);
// });


  socket.on('newLocationMessage', function(message) {
    console.log('Test' , message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current Location</a>');
    li.text(`${message.from} : `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);

  });


jQuery('#message-form').on('submit' ,function(e){
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]')
  socket.emit('createMessage' , {
    from : 'User' ,
    text : messageTextBox.val()
  },function () {
    messageTextBox.val('')
    });

});

var locationButton = jQuery('#sendLocation');
locationButton.on('click' , function () {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled' ,'disabled' ).text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send Location');
    console.log(position);

    socket.emit('createLocationMessage' ,  {

      latitude : position.coords.latitude ,
      longitude : position.coords.longitude
    });
  },function () {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Cant acces your loaction');
  });
});
