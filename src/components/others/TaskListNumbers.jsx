import React, {useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { useTaskUpdate } from '../../context/TaskContext';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const TaskListNumbers = () => {
    const [taskCount, setTaskCount] = useState({
        newTask: 0,
        activeTask: 0,
        failedTask: 0,
        completedTask: 0,
    });
    const { getUserData } = useAuth();
    const { taskUpdate } = useTaskUpdate();
    const userData = getUserData();
    
    useEffect(() => {
        if (!userData?.user?._id) return;
        
        fetch(`${backendUrl}/taskcount/${userData.user._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setTaskCount(data.data);
            })
            .catch((error) => {
                console.error('Failed to fetch task counts:', error);
            });
    }, [userData?.user?._id, taskUpdate])

    return (
        <div className='p-2 flex mt-5 justify-between gap-5 screen'>

            <div className='rounded-xl w-[45%] py-6 px-7 bg-blue-400'>
                <h2 className='text-3xl font-bold'>{taskCount.newTask}</h2>
                <h3 className='text-xl mt-0.5 font-medium'>New Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-7 bg-green-400'>
                <h2 className='text-3xl font-bold'>{taskCount.completedTask}</h2>
                <h3 className='text-xl mt-0.5 font-medium'>Completed Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-7 bg-yellow-400 '>
                <h2 className='text-3xl font-bold'>{taskCount.activeTask}</h2>
                <h3 className='text-xl mt-0.5 font-medium'>Accepted Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-7 bg-red-500'>
                <h2 className='text-3xl font-bold'>{taskCount.failedTask}</h2>
                <h3 className='text-xl mt-0.5 font-medium'>Failed Task</h3>
            </div>
        </div>
    )
}

export default TaskListNumbers