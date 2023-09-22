import { useState, useEffect } from "react"
import Header from './components/header' 
import Tasks from './components/Tasks' 
import AddTask from "./components/AddTask"

function App() {
  const [showAddTask, setShowAddTask]= useState(false )
  const [tasks, setTasks]= useState( [  ])

  useEffect(()=>{
    const fetchTask= async()=>{
      const res= await fetch('http://localhost:5000/tasks')
      const data= await res.json()

      console.log(data);
    }
    fetchTask();
  },[])
//DELETE TASKS
const deleteTask= (id)=>{
    setTasks(tasks.filter((tasks)=>(tasks.id!==id)))
  }
// TOGGLE REMINDER
const toggleReminder=(id)=> {
  setTasks(
    tasks.map((task)=>task.id===id? 
    {...task, reminder: !task.reminder}: task))
}
//ADD INPUTS TO SETTASK
const addTask= (task)=>{
  const id= Math.floor(Math.random()*10000)+1
  console.log(id)
  const newTask= {id, ...task}
  setTasks([...tasks, newTask])
}
return (
    <div className="container">

      <Header onAdd={()=>{setShowAddTask(!showAddTask) 
        }} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}         
      {tasks.length >0 ?
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>: 
    'No Task To Show'}

    </div>
  );
}


export default App;
