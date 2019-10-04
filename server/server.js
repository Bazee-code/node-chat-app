//integrating socket.io with our server
// socket.io allows for connection to and from client (browser)and server
// NOTE * events in socket.io will always be linked to each other
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
//listen to an event and respond accordingly
//connection is our event here!
io.on('connection',(socket)=>{
	console.log("New user connected!");

	// socket.emit('newEmail',{
	// 	from : "skrr@udemy.com",
	// 	text : "Register for new courses today!",
	// 	createdAt : 124
	// });

	//new Message event from server
	socket.emit('newMessage',{
		from : "Neigbour",
		text : "Turn that shit up fool!",
		createdAt : 125
	});

	//event listener for createMesage event
	socket.on('createMessage',function(sent){
		console.log("createMessage",sent);
	});
	// //create email event
	// socket.on('createEmail',(newEmail)=>{
	// 	console.log("createEmail",newEmail);
	// });

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