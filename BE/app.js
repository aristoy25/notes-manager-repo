import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { title } from 'process';
import { validateNote, validateTask } from './middleware/validateNote.js';

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
});

app.get('/notes/:id', (req,res) => {
    const notes = JSON.parse(fs.readFileSync('./data/notes.json', 'utf8'));
    const note = notes.find(note => note.id === req.params.id);
    if(!note) {
        res.status(404).send('Note not found');
        return;
    }
    res.send(note);
});

app.delete('/notes/:id', (req,res) => {
    const notes = JSON.parse(fs.readFileSync('./data/notes.json', 'utf8'));
    const updatedNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFile('./data/notes.json', JSON.stringify(updatedNotes, null, 2), (err) => {
        if(err) {
            res.status(500).send('Error writing notes file');
            return;
        }
        res.send(updatedNotes);
    });
});

app.post('/notes', validateNote, (req, res, next) => {
    //read the notes file
    const notes = JSON.parse(fs.readFileSync('./data/notes.json', 'utf8'));
    const newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    fs.writeFile('./data/notes.json', JSON.stringify(notes, null, 2), (err) => {
        if(err) {
            res.status(500).send('Error writing notes file');
            return;
        }
        res.send(newNote);
    });
});

app.get('/tasks', (req,res) => {
    fs.readFile('./data/tasks.json', 'utf8', (err, data) => {
        if(err) {
            res.status(500).send('Error reading tasks file');
            return;
        }
        res.json( JSON.parse(data) );
    });
})

app.post('/tasks', validateTask, (req, res, next) => {
    //read the tasks file
    const tasks = JSON.parse(fs.readFileSync('./data/tasks.json', 'utf8'));
    const newTask = req.body;
    console.log(newTask);
    tasks.push(newTask);
    fs.writeFile('./data/tasks.json', JSON.stringify(tasks, 2, null), (err) => {
        if(err) {
            res.status(500).send('Error writing tasks file');
            return;
        }
        res.send(newTask);
    });
});

app.delete('/tasks/:id', (req,res) => {
    const tasks = JSON.parse(fs.readFileSync('./data/tasks.json', 'utf8'));
    const updatedTasks = tasks.filter(task => task.id !== req.params.id);
    fs.writeFile('./data/tasks.json', JSON.stringify(updatedTasks, null, 2), (err) => {
        if(err) {
            res.status(500).send('Error writing tasks file');
            return;
        }
        res.send(updatedTasks);
    });
});

app.get('/tasks/:id', (req,res) => {
    const tasks = JSON.parse(fs.readFileSync('./data/tasks.json', 'utf8'));
    const task = tasks.find(note => note.id === req.params.id);
    if(!task) {
        res.status(404).send('Note not found');
        return;
    }
    res.send(task);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})