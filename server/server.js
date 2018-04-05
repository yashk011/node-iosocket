const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage , generateLocationMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname , '../public');
const PORT = process.env.PORT || 3000;
var app =  express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection' ,(socket) =>{
  console.log('New user connected');

  socket.on('disconnect' , () =>{
    console.log('Disconnected to client');
  });

  socket.emit('newMessage' , generateMessage('Admin' , 'Welcome New User'));

  socket.broadcast.emit('newMessage' , generateMessage('Admin' , 'New User Joined'));


  socket.on('createMessage' , function(msg , callback) {

    console.log('Message From Client :', msg);

    io.emit('newMessage' , generateMessage(msg.from , msg.text));
    callback();
    });

    socket.on('createLocationMessage' ,function (coords){

      io.emit('newLocationMessage' , generateLocationMessage('Admin' , coords.latitude , coords.longitude));
      console.log(generateLocationMessage('Admin' , coords.latitude , coords.longitude));

    });

    // socket.broadcast.emit('newMessage' , {
    //   from: msg.from,
    //   text: msg.text,
    //   completedAt: new Date().getTime()
    //
    // });

  });


server.listen(PORT , () =>{

  console.log(`App is running on port ${PORT}`);
});
