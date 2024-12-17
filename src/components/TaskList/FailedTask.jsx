import React from 'react'
import { useTaskUpdate } from '../../context/TaskContext';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const FailedTask = ({task}) => {
  const { triggerTaskUpdate } = useTaskUpdate();
  const dateString = task.taskDate;
  const date = new Date(dateString);
  const taskId = task._id;

  const statusChangeToCompleted = () => {
    fetch(`${backendUrl}/completedtask/${taskId}`, {
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
    .catch((error) => {
      console.error('Failed to update task:', error);
    });
  }

  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-500 rounded-xl'>
        <div className='flex justify-between items-center'>
            <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{task.taskCategory}</h3>
            <h4 className='text-sm'>{date.toLocaleDateString()}</h4>
        </div>
        <h2 className='mt-5 text-2xl font-semibold'>{task.taskTitle}</h2>
        <p className='text-sm mt-2'>{task.taskDescription}</p>
        <div className='mt-2'>
          <button onClick={statusChangeToCompleted} className='bg-green-500 w-full'>Mark as Complete</button>
        </div>
    </div>
  )
}

export default FailedTask