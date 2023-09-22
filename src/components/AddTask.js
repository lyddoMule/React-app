import { useState } from "react"

const AddTask = ({onAdd}) => {
    const [text, setText]=useState('')
    const [day, setDay]=useState('')
    const [reminder, setReminder]=useState(false)

    const onSubmit=(a)=>{
        a.preventDefault()

      if(!text || !day){
        alert('please add a task')
        return
      }
      
      onAdd({text, day, reminder})

      setDay('')
      setText('')
      setReminder(false)
    }
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input type="text" placeholder="add task" value={text} 
            onChange={(e)=>setText(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>day & time</label>
        <input type="text"  placeholder="day & time" value={day} 
        onChange={(e)=>setDay(e.target.value)}/>
      </div>
      <div className="form-control-check">
        <label>set reminder</label>
        <input type="checkbox"  checked={reminder}
        value={reminder}
        onChange={(e)=>setReminder(e.currentTarget.value)}/>
      </div>
      <input className="btn btn-block" type="submit" value='Save Task'/>
    </form>
  )
}

export default AddTask
