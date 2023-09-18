// Imported modules
const express = require('express');
const path = require('path');
const fs = require('fs');
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
    if ( req.body ) {
        storedNotes.push(req.body)

        //NOTE TO SELF: Need to make new note permanant in DB....append not working in below method
        // perhaps its an issue w/the data payload?? it seems "push" and "appendFile" aren't compatible

        // function saveMyNote (note) {
        //     storedNotes.push(note)
        // }
        // myNote = JSON.stringify(saveMyNote(req.body))
        // fs.appendFile('./db/db.json',myNote, (err) =>{
        //     err ? console.error(err) : console.log('New note has been added!')
        // });
        
        console.log('Request recieved successfully!')
        res.status(200).json({status: "Note saved successfully~"}) //lies.... FOR NOW 
    } else {
        res.status(500).json('Note unable to be saved :-( Try adding a title or some text!')
    }
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