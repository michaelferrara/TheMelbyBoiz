const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());

// Generates listener
app.post('/Test', (req, res) => {
  console.log(req.body.message);
  res.status(200).send("Hello World");
})


// Generates the server
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/login.html')
})


const server = app.listen(3000, () => {
	console.log('http://localhost:3000')
});



var request = require("request");


// Generates the token for the API
var options = { method: 'POST',
  url: 'https://api.fonestorm.com/v2/auth',
  body: 
   { password: '6087736198',
     username: '2005553366',
     expires: 86400 },
  json: true };

var tkn;
var theFone;
var num;

request(options, function (error, response, body) {


  // Gets the auth token
  if (error) throw new Error(error);
  tkn = body.auth.token;
  console.log(body);

  // Creates a fonenumber
  var options = { method: 'GET',
  url: 'https://api.fonestorm.com/v2/fonenumbers',
  headers: {token: tkn},
  json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    theFone = body;
    num = body.fonenumbers[0];
    console.log(body);
  });

  
  // Generates listener
  var options = { method: 'POST',
  url: 'https://api.fonestorm.com/v2/messages/receive_notify',
  body: { fonenumber: '3212344381', type: 'Callback', url: "https://7f56d64a.ngrok.io/Test", method: "JSON" },
  headers: {token: tkn},
  json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
  
  /*
  // Sends a message
  var options = { method: 'POST',
  url: 'https://api.fonestorm.com/v2/messages/send',
  body: 
   { to: '3216267704',
     fonenumber: num,
     message: 'Hello world' },
     headers: {token: tkn},
     json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
  */




  //


});
