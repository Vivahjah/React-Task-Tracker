import React, { useState, useEffect } from 'react'
import {BrowserRouter,  Route} from "react-router-dom";
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'


const App = () =>{
  const [showAddTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTask = async() =>{
      const tasks = await fetchTasks()
      setTasks(tasks);
    } 
    getTask()
    
  },[])
  // Fetching all the  Tasks
  const fetchTasks = async()=> fetch("http://localhost:5000/tasks").then(res => res.json());
  
  // Fetching a Single Task
  const fetchTask = async(id)=> fetch(`http://localhost:5000/tasks/${id}`).then(res => res.json());
  


  //Add Task
  const addTask = async(task) =>{
    const res = await fetch('http://localhost:5000/tasks', {
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      } ,
      body : JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])

  // Manually assigning an ID
    // const id = Math.floor(Math.random()*100) + 1
    // const newTask = {id,...task}
    // setTasks([...tasks, newTask])
  }


  //Delete Task
  const deleteTask = async(id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method : 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
    
  }

  //Toggle reminder
  const toggleReminder = async(id) =>{
    const taskToToggle =  await fetchTask(id)
    const updateTask = {...taskToToggle, reminder : !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method : 'PUT',
      headers : {
        'content-type' : 'application/json'
      } ,
      body : JSON.stringify(updateTask),
    })

    const data = await res.json()

    setTasks(tasks.map( (task) => task.id === id ? { ...task, reminder : data.reminder} : task))
  }

  return (
    <BrowserRouter>
    
      <div className="container">
      <Header onAdd={() => setAddTask(!showAddTask)} showAdd={showAddTask}/>

      
      <Route path='/' exact render={(props) => (
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? <Tasks tasks={tasks} onToggle={toggleReminder} 
          onDelete={deleteTask}/> : ('No Task to Show') }
        </>
        
      )} />
      <Route path='/about' component= {About} />
      <Footer />
      </div>
      
      </BrowserRouter>
   
  );
}

export default App;
