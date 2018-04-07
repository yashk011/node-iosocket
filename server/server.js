const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {generateMessage , generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');

const publicPath = path.join(__dirname , '../public');
const PORT = process.env.PORT || 3000;
var app =  express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection' ,(socket) =>{
  console.log('New user connected');

  socket.on('disconnect' , () =>{
    var user = users.removeUsers(socket.id);

    if(user){

      io.to(user.room).emit('updateUserList' , users.getUserList(user.room));
      io.to(user.room).emit('newMessage' , generateMessage('Admin' , `${user.name} has left`));

    }

  });


  socket.on('join' , (params, callback) =>{


    if(!isRealString(params.name) || !isRealString(params.room)){

      callback('Name and Room Name are required');

    }
    socket.join(params.room);

    users.removeUsers(socket.id);
    users.addUsers(socket.id ,params.name , params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room));
    socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to chat App'));
    socket.broadcast.to(params.room).emit('newMessage' , generateMessage('Admin' , `${params.name} has joined.`));

      callback();
  });

  socket.on('createMessage' , function(msg , callback) {

    var user = users.getUsers(socket.id);

    if(user && isRealString(msg.text)) {

      io.to(user.room).emit('newMessage' , generateMessage(user.name , msg.text));

    }
    callback();
    });

    socket.on('createLocationMessage' ,function (coords){

      var user = users.getUsers(socket.id);


      io.to(user.room).emit('newLocationMessage' , generateLocationMessage(user.name , coords.latitude , coords.longitude));
    //  console.log(generateLocationMessage('Admin' , coords.latitude , coords.longitude));

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
