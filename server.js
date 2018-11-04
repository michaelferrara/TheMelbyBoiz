const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(bodyParser.json());
var request = require("request");
var tkn;
//var theFone;
//var num;

// Generates sms listener
app.post('/Test', (req, res) => {
  console.log(req.body.message);
  console.log(req.body.from);
  
  var theMessage = req.body.message;

  
  io.emit('chatMessage', theMessage);

})

app.use("/styles", express.static(__dirname + '/styles'));

// Generates the get request for the website
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.get('/hostpage', (req, res) => {
    res.sendFile(__dirname+'/hostpage.html')
})

// Hosts server for website
const server = http.listen(3000, () => {
	console.log('http://localhost:3000')
});

// Generates the token for the API
var options = { method: 'POST',
  url: 'https://api.fonestorm.com/v2/auth',
  body: 
   { password: '6087736198',
     username: '2005553366',
     expires: 86400 },
  json: true };

// Everything in here is authorized by the token
request(options, function (error, response, body) {

  // Gets the auth token
  if (error) throw new Error(error);
  tkn = body.auth.token;
  console.log(body);

  // For future implementation, not necessary for hackathon because
  // we only use one number and its constant
  /*
  // Gets a fonenumber
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
  */
  
  // Generates Callback for the fone
  var options = { method: 'POST',
  url: 'https://api.fonestorm.com/v2/messages/receive_notify',
  body: { fonenumber: '3212344381', type: 'Callback', url: "http://8bb418ca.ngrok.io/Test", method: "JSON" },
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

});
