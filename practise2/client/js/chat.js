var socket = io();

//we want to eb=nable autoscrolling
function scrollToBottom(){
	// selectors
	var messages = jQuery('#messages');
	//select the last messages in our <li> element
	var newMessage = messages.children('li:last-child');

	// 	Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight(); //takes us to previous child

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		// console.log("Should scroll down!");
		messages.scrollTop(scrollHeight);
	}
};

socket.on('connect',function(){
	console.log("Connected to server!");

	// socket.emit('joinClan',{
	// 	to : "Admin",
	// 	text : "I would like to join your clan!"
	// },function(){
	// 	console.log("Sent!");
	// });
});

// socket.on('createMessage',function(message){
// 	console.log("From Admin:",message);
// });

// *JQUERY 
//we want to overide the behaviour of webpages reloading
//during form submission
// hence we use jquery for DOM manipulation
jQuery('#message-form').on('submit',function(e){
	e.preventDefault(); // no page reloading during form submission

	var messageTextbox = jQuery("[name=message]");
	// we created a var cause we re-used the jQuery function

	socket.emit('createMessage',{
		from : "User",
		//in order to get the value submitted inside the text field
		// text : jQuery("[name=message]").val() 
		text : messageTextbox.val()
	},function(){
		// console.log("Sent!");
		// in order to clear the text box once our submit is hit
		messageTextbox.val('')
	});
});
//event that makes message appear on webpage
socket.on('newMessage',function(message){
	var formattedTime = moment(message.createdAt).format('LT');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template,{
		text: message.text,
		from : message.from,
		createdAt : formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
	
	// console.log("New Message!",message);
	// //use jQuesry to create an element
	// var li = jQuery('<li></li>');
	// li.text(`${formattedTime},${message.from}: ${message.text}`);

	// // we now add our data to the DOM
	// jQuery("#messages").append(li);
	// // .append calls it as the last function
});

// send our location to server 
// jQuery().on('',function(){

// })
// same as below
var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
	if(!navigator.geolocation){ //the geolocation api exists here
		return alert("Geolocation not supported by your browser!");
	}

	// we want to disable our button till location is shown
	locationButton.attr('disabled','disabled').text("Sending location...");
// if geolocation is supported by browser
	navigator.geolocation.getCurrentPosition(function(position){
		// console.log(position);
		locationButton.removeAttr('disabled').text("Send location");
		socket.emit('createLocationMessage',{
			latitude  : position.coords.latitude,
			longitude : position.coords.longitude
		});
	},function(){
		alert("Unable to fetch location!");
	});
});

//we need a listener for newLocationMessage
socket.on('newLocationMessage',function (message){
	var formattedTime = moment(message.createdAt).format('LT');

	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template,{
		from : message.from,
		createdAt : formattedTime,
		url : message.url
	});
	//we then append to our li to make it appear on webpage
	jQuery('#messages').append(html);
	scrollToBottom();
	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target ="_blank">Current location</a>');

	// li.text(`${formattedTime}:${message.from}: `);
	// //update anchor tag
	// a.attr('href',message.url);
	// //append to end of list item
	// li.append(a);

	// jQuery('#messages').append(li);
});

socket.on('disconnect',function(){
	console.log("Disconnected from server!");
});
