//integrating socket.io with our server
// socket.io allows for connection to and from client (browser)and server
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//make our port dynamic for heroku
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//middleware for our static webpage
app.use(express.static(path.join(__dirname,"../public")));

//register an event listener
io.on('connection',(socket)=>{
	console.log("New user connected!");
	//registering our event
	socket.on('disconnect',()=>{
		console.log("User disconnected!");
	});
});


server.listen(port,()=>{
	console.log(`Server is up on port ${port}!`);
});



// console.log(__dirname + '/../public');
// const publicPath = path.join(__dirname,"../public");
// console.log(publicPath);