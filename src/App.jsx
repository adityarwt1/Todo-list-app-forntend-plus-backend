import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);


  





  // Add Task
  const addTask = () => {
    if (!newTask.trim()) return;
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
    setNewTask("");
  };








  // Delete Task
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  // Update Task
  const updateTask = () => {
    fetch(`http://localhost:5000/tasks/${editTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: editTaskValue }),
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
    setEditTaskId(null);
    setEditTaskValue("");
  };

  return (
    <div className="App">
      <h1 className="text-4xl font-bold">To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="border rounded-lg mt-3 ml-3 bg-yellow-100"
      />
      <button onClick={addTask} className="bg-green-500 text-white rounded-lg duration-300 hover:scale-110 ">Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-4 rounded-md w-full bg-yellow-100"> 
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskValue}
                  onChange={(e) => setEditTaskValue(e.target.value)}
                  className="w-full bg-yellow-100 "
                />
                <button onClick={updateTask} className="bg-green-500 text-white rounded-md">Save</button>
              </>
            ) : (
              <>
                {task.task}
                <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white rounded-md duration-300 hover:scale-110">Delete</button>
                <button
                  onClick={() => {
                    setEditTaskId(task.id);
                    setEditTaskValue(task.task);
                  }}
                  className="bg-teal-500 text-white rounded-md duration-300 hover:scale-100"
                >

                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




