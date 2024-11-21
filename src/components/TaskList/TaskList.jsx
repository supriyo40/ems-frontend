import React, { useContext, useEffect, useState } from 'react'
import AcceptTask from './AcceptTask.jsx'
import NewTask from './NewTask.jsx'
import CompleteTask from './CompleteTask.jsx'
import FailedTask from './FailedTask.jsx'
import { AuthContext } from '../../context/AuthProvider.jsx'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const TaskList = () => {
    const [taskList, setTaskList] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(()=>{
        fetch(`${backendUrl}/tasks/${user.user._id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            
        })
        .then((res)=>res.json())
        .then((data)=>{    
            setTaskList(data.tasks);
            
        })
    },[user])

    return (
        <div id='tasklist' className='h-[270px] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-2 mt-10'>
            {taskList.map((task, idx)=>{
                if(task.status == "new"){
                    return <NewTask key={idx} task = {task} />
                }
                if(task.status == "active"){
                    return <AcceptTask key={idx} task = {task} />
                }
                if(task.status == "completed"){
                    return <CompleteTask key={idx} task = {task} />
                }
                if(task.status == "failed"){
                    return <FailedTask key={idx} task = {task}/>
                }
            })}
        </div>
    )
}

export default TaskList