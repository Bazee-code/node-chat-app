// we want to integrate socket.io into our server
//socket.io enables real-time,bidirectional communication
// btwn the server and client
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {generateLocationMessage} = require('./functions/functions.js');
//make our port dynamic cause of heroku
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// we now create a middleware to access our static html page
app.use(express.static(path.join(__dirname,"../client")));

//CREATE A CONNECTION
io.on('connect',(socket)=>{
	console.log("New device connected!");

	socket.emit('newMessage',{
		from : "Admin",
		text : "Welcome to my chat app!"
	});

	socket.on('createMessage',function(message,callback){
		console.log("New sign-up!",message);

		io.emit('newMessage',{
		from : message.from,
		text : message.text
		});	
		callback();
	});

	
	// emulate how private groups work
	// you ask admin to let you join,admin responds
	//and notifies other users with custom message

	//the join clan event is received
// 	socket.on('joinClan',function(request,callback){
// 		console.log("New request!",request);
// 		callback ();
// 		//admin respnds to request
// // socket.emit emits an event for a single connection
// // io.emit emits an event for every single connection
// 		socket.emit('joinClan',{
// 			from : request.to,
// 			text : "Welcome to the clan!",
// 			createdAt : new Date().getTime()
// 		});
// 	});
// // we also want to notify other users of a new user except the user 
// //we shall broadcast 
	socket.broadcast.emit('newMessage',{
		from : "Admin",
		text : "We have a new user!",
		createdAt : new Date().getTime()
	});

	// new event listener for our createLocation
	socket.on('createLocationMessage',function(coords){
		// io.emit("newMessage",{
		// 	from : "Admin",
		// 	text : `${coords.latitude},${coords.longitude}`
		// });
		// we want to generate a url that will take the user 
		// to specified location

		io.emit('newLocationMessage',generateLocationMessage("Admin",coords.latitude,coords.longitude));
	});

	socket.on('disconnect',function(){
		console.log("New device disconnected!");
	});
});


//bind our app to port 3000
server.listen(3000,()=>{
	console.log(`Connected to port ${port}`);
});