var socket = io();

socket.on('connect' ,function  (){

  var params = jQuery.deparam(window.location.search);

  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href = '/';

    }
    else{
        console.log('No error');
    }
  });
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


socket.on('updateUserList', function (users) {

  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

var scrollToBottom = function () {

  var messages=jQuery('#messages');
  var clientHeight = messages.prop('clientHeight');
  var scrollHeight = messages.prop('scrollHeight');
  var scrollTop = messages.prop('scrollTop');
  var newMessage = messages.children('li:last-child');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}


socket.on('newMessage' , function (msg){

  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html= Mustache.render(template , {
    text : msg.text ,
    from : msg.from ,
    createdAt : formattedTime

  });
  jQuery('#messages').append(html);
  scrollToBottom();

});

 socket.on('newLocationMessage' , function(message) {
  var formattedTime = moment(message.completedAt).format('h:mm a');
  var template = jQuery('#location-template').html();
  var html = Mustache.render(template,{
    url : message.url ,
    createdAt : formattedTime,
    from : message.from
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

  // var formattedTime = moment(msg.crea tedAt).format('h:mm a');
  // console.log('New Message' , msg);
  // var li = jQuery('<li> </li>');
  // li.text(`${msg.from} ${formattedTime} : ${msg.text}`);
  // jQuery('#messages').append(li);



// socket.emit('createMessage' , {
//   from :'User' ,
//   text:'Hi'
// } , function(data) {
//   console.log(data);
// });

  //
  // socket.on('newLocationMessage', function(message) {
  //   var formattedTime = moment(message.completedAt).format('h:mm a');
  //   console.log('Test' , message);
  //   var li = jQuery('<li></li>');
  //   var a = jQuery('<a target="_blank">My current Location</a>');
  //   li.text(`${message.from} ${formattedTime} : `);
  //   a.attr('href', message.url);
  //   li.append(a);
  //   jQuery('#messages').append(li);
  //
  // });


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
