
var socket = io(); //creates our connection
//socket.on listens to a new event
socket.on('connect',function(){
	console.log("Connected to server");

	// socket.emit('createEmail',{
	// 	to : "nudy@gmail.com",
	// 	text : "yo pierre!"
	// });

// we can only write back our message if we're connected to server
// event of new user requesting to join group
	socket.emit('createMessage',{
		from :"client",
		text: "I wanna join group!"
	});
	// socket.emit('createMessage',generateMessage("client","I want to join group"));
});
// we are now creating a custom event
//we shall use an email app as our example
//our event right now is a newEmail notification
// socket.on('newEmail',function (email){
// 	console.log("New Email!",email);
// });

// //make a createMessage event and a newMessage event
// socket.on('newMessage',function (received){
// 	console.log("New Message!",received);
// });

//NEW USER RECEIVES EVENT
socket.on('createMessage',function(message){
	console.log("From Admin:",message);
});

socket.on('disconnect',function()
{
	console.log("Disconnected from server");
});
