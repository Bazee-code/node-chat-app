//we want to intergrate socket.io into our express app
// socket.io allows for a 2 way real-time connection between the client
// and the server
// socket.io works on two principles
// creating and listening to events
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
//we now need to change our express server into a http server
var server = http.createServer(app);
//the io module helps us out in listening to events
var io = socketIO(server); //integrated our server with socket.io
//set up our event listener
//our event listener registers our events from the client and responds accordingly

io.on('connection',(socket)=>{
	console.log("New user connected to server!");

	//when user disconnects
	socket.on('disconnect',()=>{
		console.log("User disconnected!");
	})
});

//we are going to create an express middleware to access our static webpage
app.use(express.static(path.join(__dirname,'../client')));

server.listen(3000,()=>{  //bind our app to port
	console.log("Server is up on port 3000!");
});