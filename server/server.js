const path = require('path');
const express = require('express');

var app = express();
//make our port dynamic for heroku
const port = process.env.PORT || 3000;

//middleware for our static webpage
app.use(express.static(path.join(__dirname,"../public")));

// app.get('/',(req,res)=>{
// 	res.send(index.html);
// });

app.listen(port,()=>{
	console.log(`Server is up on port ${port}!`);
});



// console.log(__dirname + '/../public');
// const publicPath = path.join(__dirname,"../public");
// console.log(publicPath);