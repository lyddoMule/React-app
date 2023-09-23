import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/header' 
import Tasks from './components/Tasks' 
import AddTask from "./components/AddTask"
import Footer from "./components/footer"
import About from "./components/About"
// import {route} from 'json-server'

function App() {
  const [showAddTask, setShowAddTask]= useState(false )
  const [tasks, setTasks]= useState( [  ])

  useEffect(()=>{
    const getTasks= async()=>{
      const taskFromServer= await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks();
  },[])

  // FETCH TASK
  const fetchTasks= async()=>{
    const res= await fetch('http://localhost:5000/tasks')
    const data= await res.json()
    console.log(data);
    return  data
  }
//single task
  const fetchTask= async(id)=>{
    const res= await fetch(`http://localhost:5000/tasks/${id}`)
    const data= await res.json()
    console.log(data);
    return  data
  }

//DELETE TASKS
const deleteTask= async(id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE'
  })
    setTasks(tasks.filter((tasks)=>(tasks.id!==id)))
  }
// TOGGLE REMINDER
const toggleReminder= async (id)=> {

  const taskToToggle= await fetchTask(id)
  const updTask= {...taskToToggle, 
    reminder: !taskToToggle.reminder
  }
  const res= await fetch (`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(updTask)
  }
)

const data= await res.json()

  setTasks(
    tasks.map((task)=>task.id===id? 
    {...task, reminder: data.reminder}: task))
}
//ADD INPUTS TO SETTASK
const addTask= async(task)=>{
  // const id= Math.floor(Math.random()*10000)+1
  // console.log(id)
  // const newTask= {id, ...task}
  // setTasks([...tasks, newTask])

  const res =await fetch( `http://localhost:5000/tasks`, {
    method: 'POST',
    headers:{
      'content-type':' application/json'
    },
    body: JSON.stringify(task)
  })
  const data= await res.json()
  setTasks([...tasks, data])

}
return (
  <Router>

  <div className="container">

      <Header onAdd={()=>{setShowAddTask(!showAddTask) 
        }} showAdd={showAddTask}/>

       <Routes>
        <Route path="/" element={
          <>           
           {showAddTask && <AddTask onAdd={addTask}/>}         
            {tasks.length >0 ?
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>: 
          'No Task To Show'}
          </>

        }/>
       </Routes>

     
    <Routes>
            <Route path="/About" Component={About} />

    </Routes>
 
      <Footer/>
  </div>
  </Router>
  );
}


export default App;
