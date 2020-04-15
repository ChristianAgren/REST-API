const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
// app.use(express.static(path.join(__dirname, 'build')));



// If home, send UI
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// If GET to /api/people, send entire Assignments.people
app.get('/api/assignments', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./Assignments.json'));
    return res.send(data.assignments);
  } catch (err) {
    console.error(err);
    return res.send("Error when fetching Assignments");
  }
});



// If GET, send specific assignment
app.get('/api/assignments/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./Assignments.json'));
    const assignment = data.assignments.find(c => c.id === req.params.id);
    if (!assignment) return res.status(404).send("Could not find an assignment with that ID...");
    return res.send(assignment);
  } catch (err) {
    console.error(err);
    return res.send("Error when fetching Assignments")
  }
  
})



// If POST, post specific assigment to assignments
app.post('/api/assignments', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./Assignments.json'));
    const newAssignment = {
      id: [...Array(5)].map(i=>(~~(Math.random()*36)).toString(36)).join(''),
      name: req.body.name,
      desc: req.body.desc,
      date: "today"
    };
    data.assignments.push(newAssignment);
    fs.writeFileSync('./Assignments.json', JSON.stringify(data, null, 4));
    return res.send(newAssignment)
  } catch (err) {
    console.error(err)
    return res.send("Error when fetching Assignments")
  }
})


 
// If PUT, change attributes of assignment in that position
app.put('/api/assignments/:id', (req, res) => {

  try {
    const data = JSON.parse(fs.readFileSync('./Assignments.json'));
    const assignment = data.assignments.find(c => c.id === req.params.id);
    if (!assignment) return res.status(404).send("Could not find an assignment with that ID...");
    assignment.name = req.body.name;
    fs.writeFileSync('./Assignments.json', JSON.stringify(data, null, 4));
    return res.send(assignment)
  } catch (err) {
    console.error(err)
    res.send("Error when fetching Assignments")
  } 

})


// If DELETE, delete assignment of that ID
app.delete('/api/assignments/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./Assignments.json'));
    const assignmentIndex = data.assignments.findIndex(c => c.id === req.params.id);
    
    if (assignmentIndex === -1) return res.status(404).send("Could not find an assignment with that ID...");
    data.assignments.splice(assignmentIndex, 1)
    fs.writeFileSync('./Assignments.json', JSON.stringify(data, null, 4));
    return res.send(data.assignments)
  } catch (err) {
    console.error(err)
    res.send("Error when fetching Assignments")
  }

})


// Run server
app.listen(port, () => {
  console.log(`server started on port: ${port}`);

});