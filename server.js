// Imported modules
const express = require('express');
const path = require('path');
const storedNotes = require('./db/db.json')
// Declarations
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API routes
// GET
app.get('/api/notes', (req, res) => {
    res.json(storedNotes)
})
// POST 
app.post('/api/notes', (req, res) => {
    
})
// DELETE 
app.delete('/api/notes/:id', (req, res) => {

})

// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.listen(PORT, () =>
  console.log(`Live and listening at port ${PORT}★`)
);