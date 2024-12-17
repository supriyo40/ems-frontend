import React, { useEffect, useState } from 'react'
import AcceptTask from './AcceptTask.jsx'
import NewTask from './NewTask.jsx'
import CompleteTask from './CompleteTask.jsx'
import FailedTask from './FailedTask.jsx'
import { useAuth } from '../../hooks/useAuth';
import { useTaskUpdate } from '../../context/TaskContext';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const TaskList = () => {
    const [taskList, setTaskList] = useState([]);
    const { getUserData } = useAuth();
    const userData = getUserData();
    const { taskUpdate } = useTaskUpdate();

    useEffect(() => {
        if (!userData?.user?._id) return;
        
        fetch(`${backendUrl}/tasks/${userData.user._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {    
            setTaskList(data.tasks);
        })
        .catch((error) => {
            console.error('Failed to fetch tasks:', error);
        });
    }, [userData?.user?._id, taskUpdate]);

    return (
        <div id='tasklist' className='h-[270px] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-2 mt-10'>
            {taskList.map((task, idx) => {
                if(task.status === "new"){
                    return <NewTask key={idx} task={task} />
                }
                if(task.status === "active"){
                    return <AcceptTask key={idx} task={task} />
                }
                if(task.status === "completed"){
                    return <CompleteTask key={idx} task={task} />
                }
                if(task.status === "failed"){
                    return <FailedTask key={idx} task={task}/>
                }
                return null;
            })}
        </div>
    )
}

export default TaskList