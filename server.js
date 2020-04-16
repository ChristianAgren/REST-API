const express = require('express');
const fs = require('fs');
const path = require('path');
const getDate = require('./DateManager.js')
const app = express();
const port = process.env.PORT || 8080;
const filePath = './Assignments.json'

app.use('/api/assignments', express.json());




// If home, send UI
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// If GET, send entire Assignments.people
app.get('/api/assignments', (req, res, next) => {
  fs.readFile(filePath, (err, data) => {
    if(err) {
      console.error(err)
      next(err)
    }
    const { assignments } = JSON.parse(data)
    return res.send(assignments)
  })
});



// If GET, send specific assignment
app.get('/api/assignments/:id', (req, res, next) => {
  fs.readFile(filePath, (err, data) => {
    if(err) {
      console.error(err)
      next(err)
    }
    const { assignments } = JSON.parse(data)
    const assignment = assignments.find(a => a.id === req.params.id)
    if (!assignment) return res.status(404).send({error: {message: "Could not find an assignment with that ID..."}});
    return res.send([assignment])
  })
})



// If POST, post specific assigment to assignments
app.post('/api/assignments', (req, res, next) => {
  fs.readFile(filePath, (err, data) => {
    if(err) {
      console.error(err)
      next(err)
    }
    const assignData = JSON.parse(data)
    const newAssignment = {
      id: [...Array(5)].map(i=>(~~(Math.random()*36)).toString(36)).join(''),
      name: req.body.name,
      desc: req.body.desc,
      date: getDate()
    };
    assignData.assignments.unshift(newAssignment)
    fs.writeFile(filePath, JSON.stringify(assignData, null, 4), (err) => {
      if(err) {
        console.error(err)
        next(err)
      }
    })
    return res.send(assignData.assignments)
  })
})


 
// If PUT, change attributes of assignment in that position
app.put('/api/assignments/:id', (req, res, next) => {
  fs.readFile(filePath, (err, data) => {
    if(err) {
      console.error(err)
      next(err)
    }
    const assignData = JSON.parse(data)
    const assignment = assignData.assignments.find(a => a.id === req.params.id)
    if (!assignment) return res.status(404).send({error: {message: "Could not find an assignment with that ID..."}});
    assignment.name = req.body.name
    assignment.desc = req.body.desc
    console.log(assignment, req.body);
    
    fs.writeFile(filePath, JSON.stringify(assignData, null, 4), (err) => {
      if(err) {
        console.error(err)
        next(err)
      }
    })
    return res.send(assignData.assignments)
  })
})



// If DELETE, delete assignment of that ID
app.delete('/api/assignments/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    const assignmentIndex = data.assignments.findIndex(c => c.id === req.params.id);
    
    if (assignmentIndex === -1) return res.status(404).send("Could not find an assignment with that ID...");
    data.assignments.splice(assignmentIndex, 1)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    return res.send(data.assignments)
  } catch (err) {
    console.error(err)
    res.send("Error when fetching Assignments")
  }

})

app.use(express.static(path.join(__dirname, 'build')));

// Run server
app.listen(port, () => {
  console.log(`server started on port: ${port}`);

});