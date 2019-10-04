var socket = io(); //creates our connection
//socket.on listens to a new event
socket.on('connect',function(){
	console.log("Connected to server");

	// socket.emit('createEmail',{
	// 	to : "nudy@gmail.com",
	// 	text : "yo pierre!"
	// });

// we can only write back our message if we're connected to server
// createMessage event 
	socket.emit('createMessage',{
		to :"travis scott",
		from : "me boy!"
	});
});

socket.on('disconnect',function()
{
	console.log("Disconnected from server");
});

// we are now creating a custom event
//we shall use an email app as our example
//our event right now is a newEmail notification
// socket.on('newEmail',function (email){
// 	console.log("New Email!",email);
// });

//make a createMessage event and a newMessage event
socket.on('newMessage',function (received){
	console.log("New Message!",received);
});