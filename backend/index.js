//// core module insert
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");





//// making fucitionality to core modules

const app = express();
app.use(bodyParser.json());
app.use(cors());

const tasksFile = "tasks.json"; ///// this is creatting file to store data








// Helper function to read/write tasks
const saveTasks = (tasks) => fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
const getTasks = () => JSON.parse(fs.readFileSync(tasksFile, "utf8"));

//// save task writting file to json file after getting task from it







// Ensure tasks file exists
if (!fs.existsSync(tasksFile)) saveTasks([]);







// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(getTasks());
});





// Add a new task
app.post("/tasks", (req, res) => {
  const tasks = getTasks();
  const newTask = { id: Date.now(), task: req.body.task };
  tasks.push(newTask);
  saveTasks(tasks);
  res.json(tasks);
});






// Update a task
app.put("/tasks/:id", (req, res) => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks[index].task = req.body.task;
    saveTasks(tasks);
  }
  res.json(tasks);
});






// Delete a task
app.delete("/tasks/:id", (req, res) => {
  let tasks = getTasks();
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  saveTasks(tasks);
  res.json(tasks);
});






// Start the server
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
