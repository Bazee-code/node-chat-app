var expect = require('expect');
var {generateLocationMessage} = require('./functions.js');


desribe('generateLocationMessage',()=>{
	it("should generate the correct user location",()=>{
		//we now go through each individual test
		var from = "Admin";
		var latitude = 15;
		var longitude = 21;
		var url = "https://google.com/maps?q=15,19";
		var message = generateLocationMessage(from,latitude,longitude);

		expect(generateLocationMessage.createdAt).toBeA('number');
		expect(generateLocationMessage).toInclude({
			from ,
			url 
		});
	});
});