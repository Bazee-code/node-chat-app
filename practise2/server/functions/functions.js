// we'll use this file to write our re-usable functions
var generateLocationMessage = (from,latitude,longitude)=>{
	return{
		from ,
		url: `https://www.google.com/maps?q${latitude},${longitude}`,
		createdAt : new Date().getTime()
	};
};

module.exports ={
generateLocationMessage
};