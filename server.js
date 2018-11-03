const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/login.html')
})

const server = app.listen(3000, () => {
	console.log('http://localhost:3000')
});

var request = require("request");

var options = { method: 'POST',
  url: 'https://api.fonestorm.com/v2/auth',
  body: 
   { password: '6087736198',
     username: '2005553366',
     expires: 86400 },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});