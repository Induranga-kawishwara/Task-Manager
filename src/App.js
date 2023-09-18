import Header from "./compornants/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Task from "./compornants/Task";
import Save from "./compornants/AddTask";
import React, { useState, useEffect } from "react";
import Footer from "./compornants/Footer";
import About from "./compornants/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTask = async () => {
      const tasksFromServer = await fetchTas();
      setTasks(tasksFromServer);
    };
    getTask();
  }, []);
  //fetch data
  const fetchTas = async () => {
    const res = await fetch(" http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(` http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  //add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  //delete task
  const delteeTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };
  //taggle Reminder
  const toggleRemnder = async (id) => {
    const taskto = await fetchTask(id);
    const upTask = { ...taskto, reminder: !taskto.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify(upTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <Save onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Task
                    tasks={tasks}
                    onDelete={delteeTask}
                    onToggle={toggleRemnder}
                  />
                ) : (
                  "No tasks to show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
