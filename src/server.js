const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = process.env.PORT || 8080

app.use(express.json())
// app.use(express.static(path.join(__dirname, 'build')));



// If home, send UI
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// If GET to /api/people, send entire Assignments.people
app.get('/api/people', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./Assignments.json'));
    return res.send(data.people);
  } catch (err) {
    console.error(err);
    return res.send("Error when fetching Assignments");
  }
});



// If GET to /api/people/:id, send specific person
app.get('/api/people/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./Assignments.json'));
    const person = data.people.find(c => c.id === parseInt(req.params.id));
    if (!person) return res.status(404).send("Could not find a person with that ID...");
    return res.send(person);
  } catch (err) {
    console.error(err);
    return res.send("Error when fetching Assignments")
  }
  
})



// If POST to /api/people, post specific person to Assignments.people
app.post('/api/people', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./Assignments.json'));
    const person = {
      id: [...Array(5)].map(i=>(~~(Math.random()*36)).toString(36)).join(''),
      name: req.body.name
    };
    data.people.push(person);
    fs.writeFileSync('./Assignments.json', JSON.stringify(data, null, 4));
    return res.send(person)
  } catch (err) {
    console.error(err)
    return res.send("Error when fetching Assignments")
  }
})


 
// If PUT to /api/people/:id, change attributes of person in that position
app.put('/api/people/:id', (req, res) => {

  try {
    const data = JSON.parse(fs.readFileSync('./Assignments.json'));
    const person = data.people.find(c => c.id === parseInt(req.params.id));
    // const personIndex = data.people.findIndex(c => c.id === parseInt(req.params.id));
    if (!person) return res.status(404).send("Could not find a person with that ID...");
    person.name = req.body.name;
    fs.writeFileSync('./Assignments.json', JSON.stringify(data, null, 4));
    return res.send(person)
  } catch (err) {
    console.error(err)
    res.send("Error when fetching Assignments")
  } 

})


// If DELETE to /api/people/:id, delete person of that ID
app.delete('/api/people/:id', (req, res) => {

  try {
    const data = JSON.parse(fs.readFileSync('./Assignments.json'));
    const personIndex = data.people.findIndex(c => c.id === parseInt(req.params.id));
    if (personIndex === -1) return res.status(404).send("Could not find a person with that ID...");
    data.people.splice(personIndex, 1)
    console.log(data.people);
    fs.writeFileSync('./Assignments.json', JSON.stringify(data, null, 4));
    return res.send(data.people)
  } catch (err) {
    console.error(err)
    res.send("Error when fetching Assignments")
  }

})


// Run server
app.listen(port, () => {
  console.log(`server started on port: ${port}`);

});