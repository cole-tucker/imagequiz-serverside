const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 4002;

app.use(express.json());
app.use(cors());

let scores = [];

app.get('/', (request, response) => {
    response.send('<h1>Welcome to imagequiz serverside.</h1>');
});

app.get('/flowers', (request, response) => {
    db.getFlowers()
    .then(flowers => response.json(flowers))
    .catch(e => {console.log(e); response.status(500).send(e)});
});

app.get('/quizzes', (request, response) => {
    response.json(quizzes);
});

app.get('/quiz/:id', (request, response) => {
    let id = request.params.id;
    let quiz = quizzes[Number(id)];
    if(quiz) {
        response.json(quiz);
    } else {
        response.status(404).send(`Quiz ID: ${id} could not be found.`);
    }
});

app.post('/score', (request, response) => {
    let s = request.body.score;
    scores.push(s);
    response.send(`Score: ${s} was added successfully`);
});

app.post('/customer', (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    db.addCustomer(name,email,password)
    .then(() =>response.send(`Score: ${s} was added successfully`))
    .catch(e => response.status(500).send('There was an error with saving the customer'));
});

app.listen(port, () => console.log('Listening on port ' + port));