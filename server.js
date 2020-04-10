const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = process.env.PORT || 8080

const people = [
  {
    id: 1,
    name: 'Christian1',
  },
  {
    id: 2,
    name: 'Christian2',
  },
  {
    id: 3,
    name: 'Christian3',
  },
]

app.use(express.json())
// app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/people', (req, res) => {
  return res.send(people);
});

app.get('/api/people/:id', (req, res) => {
  const person = people.find(c => c.id === parseInt(req.params.id));
  if (!person) res.status(404).send('Could not find a person with that ID...');
  res.send(person);
})

app.post('/api/people', (req, res) => {
  const person = {
    id: people.length + 1,
    name: req.body.name
  };
  people.push(person);
  res.send(people)
})

app.put('/api/people/:id', (req, res) => {
  const person = people.find(c => c.id === parseInt(req.params.id));
  if (!person) res.status(404).send('Could not find a person with that ID...');

  person.name = req.body.name
  res.send(person)
})

app.listen(port, () => {
  console.log(`server started on port: ${port}`);

});