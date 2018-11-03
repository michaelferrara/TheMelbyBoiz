const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/login.html')
})

const server = app.listen(3000, () => {
	console.log('http://localhost:3000')
});