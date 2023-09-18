// Imported modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const storedNotes = require('./db/db.json');
const { randomUUID } = require('crypto');

// Declarations
const PORT = process.env.PORT || 3001;
const app = express();

// Express modules 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API routes

//GET - Returns stored notes as JSON 
app.get('/api/notes', (req, res) => {
    res.json(storedNotes)
})

//POST - Adds and saves new note to database 
app.post('/api/notes', (req, res) => {
    const {title, text } = req.body;
    if ( title && text ) {
        const myNote = {
            title,
            text,
            id: randomUUID()
        };
        storedNotes.push(myNote)
        fs.writeFile('./db/db.json', JSON.stringify(storedNotes), (err) => {
                err ? console.error(err) : console.log('New note has been added!')
            })

        console.log('Request recieved successfully!')
        res.status(200).json({status: "Note saved successfully~"})
    } else {
        res.status(500).json('Note unable to be saved :-( Try adding a title or some text!')
    }
})

// HTML routes - Return relevant HTML pages to client
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.listen(PORT, () =>
  console.log(`Live and listening at port ${PORT}★`)
);