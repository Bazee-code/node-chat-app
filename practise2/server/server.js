// * SERVER SIDE
//we are going to use socket.io to enhance the client,server 
//relationship

const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//we need an express middleware
//the middleware will give us access to our static webpage
app.use(express.static(path.join(__dirname,"../client")));

//want to make a connection
io.on('connection',(socket)=>{
	console.log("New device connected!");

	// receive the event from client
	socket.on('newGroup',function(message){
		console.log("New message!:",message);

		socket.emit('newGroup',{
			from : message.to,
			text : "Welcome to group Node js!"
		})
	});
	
	// we want to notify other users of new member
	socket.broadcast.emit('newGroup',{
		from : "Admin",
		text : "We have a new member in the group!"
	});

	//the receiving and sending process to and from server

	//from server
	// socket.emit emits an event for a single connection
	// socket.broadcast.emit('newEmail',{
	// 	from : "menstayfit",
	// 	text : "eat your apple today!",
	// 	time : new Date().getTime()
	// });

	// we want to emit an event for every connection
	// socket.on('createMessage',function(message){
	// 	// IO.EMIT emits an event for every connection on network
	// 	io.emit('newMessage',{
	// 		from : message.from,
	// 		text : message.text,
	// 		time : new Date().getTime()
	// 	});

	// 	console.log("createMessage:",message);
	// });
	//receive event from user
	// socket.on("newEmail",function(email){
	// 	console.log("newEmail :",email)
	// });

 // how whatsapp groups work!


	socket.on('disconnect',function(){
		console.log("New device disconnected!");
	})
});
//bind app to port
server.listen(3000,()=>{
	console.log("Connected to port 3000");
});