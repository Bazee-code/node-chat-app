// all our javascript code shall be here
var socket = io();

socket.on('connect',function(){
	console.log("Connected to server!");

});


//we will use jQuery to make our form responsive to users
jQuery("#message-form").on('submit',function(e){
	e.preventDefault(); //prevent the webpage from refreshing
	var textbox = jQuery('[name=message]'); 
	// everytime we press send as refreshing first disconnects user from server
	socket.emit('createMessage',{
		from : "User",
		text : textbox.val()
	},function(){
		console.log("Sent!");
		//we also want to clear our textbox after pressing submit
		textbox.val('');
	});
});

//we will now use jquery to make our inserted data to appear on our webpage
socket.on('newMessage',function(message){
	console.log("New Message:",message);

	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	// we then add our data to our DOM
	//we append to our li component hence they apear on our webpage
	jQuery("#messages").append(li);
});

//we now want to share our location with other users
// we will use jquery to do this using our latitudes and longitudes
jQuery('#send-location').on('click',function(){
	if(!navigator.geolocation){  //geolocation is stored here in our api
		return alert("Geolocation NOT supported by your browser!");
	} 

// if its supported by browser we get the actual position
	navigator.geolocation.getCurrentPosition(function(position){
		// console.log(position);

		socket.emit('createLocationMessage',{
			latitude : position.coords.latitude,
			longitude : position.coords.longitude
		});
	});
});

// we now create a listener for our newLocationMessage
socket.on('newLocationMessage',function(message){
	var li = jQuery('<li></li>'); //creating a li element using jquery
	var a = jQuery('<a target ="_blank">My current Location</a>');

	li.text(`${message.from}:`);
	a.attr('href',message.url); //set our href property to our url
	//we then append it to our list
	li.append(a);
	// then append our list to webpage <Ol>
	jQuery('#messages').append(li);
});

socket.on('disconnect',function(){
	console.log("Disconnected from server!");
});