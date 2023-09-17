// Imported modules
const express = require('express');
const path = require('path');

//Declarations
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));


//HTML routes
// GET
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
// POST

//API routes

// GET 
// POST 
// DELETE 

app.listen(PORT, () =>
  console.log(`Live and listening at port ${PORT}★`)
);