import React from 'react'
import { useTaskUpdate } from '../../context/TaskContext';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AcceptTask = ({ task }) => {
    const { triggerTaskUpdate } = useTaskUpdate();
    const dateString = task.taskDate;
    const date = new Date(dateString);

    const taskId = task._id;
    const statusChangeToFailed = () => {
        fetch(`${backendUrl}/failedtask/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message);
                triggerTaskUpdate();
            })
    }
  const statusChangeToCompleted = ()=>{
    fetch(`${backendUrl}/completedtask/${taskId}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data.message);
      triggerTaskUpdate();
    })
  }
    return (

        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-yellow-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{task.taskCategory}</h3>
                <h4 className='text-sm'>{date.toLocaleDateString()}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{task.taskTitle}</h2>
            <p className='text-sm mt-2'>{task.taskDescription}</p>
            <div className='flex justify-between mt-4'>
                <button onClick={statusChangeToCompleted} className='bg-green-500 py-1 px-2 text-sm rounded-sm'>Mark as Complete</button>
                <button onClick={statusChangeToFailed} className='bg-red-500 py-1 px-2 text-sm rounded-sm'>Mark as Failed</button>
            </div>
        </div>

    )
}

export default AcceptTask