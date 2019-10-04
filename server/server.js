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

	// //new Message event from server
	// socket.emit('newMessage',{
	// 	// socket.emit() emits an event to a single connection
	// 	from : "Neigbour",
	// 	text : "Turn that shit up fool!",
	// 	createdAt : 125
	// });

	//CHALLENGE
	//YOU ARE ADMIN OF A GROUP ,SEND WELCOME MESSAGE TO NEW USER
	//NOTIFY OLD USERS OF A NEW USER WITHOUT NEW USER BEEN NOTIFIED


// response to event of new user
	socket.emit('createMessage',{
		from : "Admin",
		text : "Welcome to the winning team!",
		createdAt : new Date().getTime()
	});
//old users
	socket.on('createMessage',function(){
		socket.broadcast.emit('createMessage',{
			from :"Admin",
			text :"We have a new user!",
			createdAt : new Date().getTime()
		});
	});

	//event listener for createMesage event
	// socket.on('createMessage',function(sent){
	// 	console.log("createMessage",sent);
	// 	//io.emit emits an event to every connection on network
	// 	io.emit('newMessage',{
	// 		from :sent.from,
	// 		text :sent.text,
	// 		createdAt : new Date().getTime()
	// 	});
		// *BROADCASTING
		// this refers to the emitting of a event for every person on a connection but one
		// socket.broadcast.emit('newMessage',{
		// 	from : sent.from,
		// 	text : sent.text,
		// 	createdAt : new Date().getTime()
		// });
	

// (socket.emit(client) -> socket.on(server) -> io.emit(server) ->socket.on (everyclient))
	// });
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