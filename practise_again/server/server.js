// socket.io is a module used to enhance real-time,bi-directional
// communication btwn the client and server

const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {generateLocationMessage} = require('./functions/function.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//crete an express middleware to get access to our static webpage
app.use(express.static(path.join(__dirname,"../client")));

// create a connection
io.on('connect',function(socket){
	console.log("New device connected!")
	// createMessage = client && newMessage = server
	// create a new event to welcome user
	socket.emit('newMessage',{
		from : "Admin",
		text: "Welcome to my chat app!"
	});
	// event listener for createMessage
	socket.on('createMessage',function(message,callback){
		console.log("New Message!",message);

		// we want to make our webpages interactive
		//a message sent from one webpage appears on the other
		// io.emit emits an event for every single connection
		io.emit('newMessage',{
			from : message.from,
			text : message.text,
			createdAt : new Date().getTime()
		});
		callback();
	});


	//event listener for our createLocationMessage event
	socket.on('createLocationMessage',function(coords){
		console.log(coords);
		io.emit('newLocationMessage',{
			from :"User",
			url : `https://google.com/maps?q${coords.latitude},${coords.longitude}`,
			createdAt :new Date().getTime()
		});
		// io.emit('createLocationMessage',generateLocationMessage("Admin",coords.latitude,coords.longitude));
	});

	//inform other users of a new login
	socket.broadcast.emit('newMessage',{
		from : "Admin",
		text : "We have a new user!"
	})

	socket.on('disconnect',function(){
		console.log("Device disconnected!");
	});
});


// bind app to port
server.listen(3000,()=>{
	console.log("Connected to port 3000!");
});