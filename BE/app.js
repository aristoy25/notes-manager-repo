import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { title } from 'process';
import { validateNote } from './middleware/validateNote.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

//const notes = JSON.parse(fs.readFileSync('./data/notes.json', 'utf8'));
app.get('/', (req,res) => {
    res.send('Hello World');
})

app.get('/notes', (req,res) => {
    fs.readFile('./data/notes.json', 'utf8', (err, data) => {
        if(err) {
            res.status(500).send('Error reading notes file');
            return;
        }
        res.send(data);
    });
})

app.post('/notes', validateNote, (req, res, next) => {
    //read the notes file
    const notes = JSON.parse(fs.readFileSync('./data/notes.json', 'utf8'));
    const newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    fs.writeFile('./data/notes.json', JSON.stringify(notes), (err) => {
        if(err) {
            res.status(500).send('Error writing notes file');
            return;
        }
        res.send(newNote);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})