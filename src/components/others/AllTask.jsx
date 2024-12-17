import React, { useEffect, useState } from 'react'
import { useTaskUpdate } from '../../context/TaskContext';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AllTask = () => {
  const [taskData, setTaskData] = useState([]);
  const { taskUpdate } = useTaskUpdate();

  useEffect(() => {
    fetch(`${backendUrl}/alltasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskData(data.data);
      })
      .catch((error) => {
        console.error('Failed to fetch all tasks:', error);
      });
  }, [taskUpdate])



  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-6 mb-8'>
      <div className='bg-red-500 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
        <h3 className='text-lg font-medium w-1/5'>New Task</h3>
        <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
        <h5 className='text-lg font-medium w-1/5'>Completed</h5>
        <h5 className='text-lg font-medium w-1/5'>Failed</h5>
      </div>
      <div className='max-h-52 overflow-auto'>
        {taskData.map(function (elem, idx) {
          return <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
            <h2 className='text-lg font-medium  w-1/5'>{elem.username}</h2>
            <h3 className='text-lg font-medium w-1/5 text-blue-400'>{elem.taskCounts.newTask}</h3>
            <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.taskCounts.activeTask}</h5>
            <h5 className='text-lg font-medium w-1/5 text-white'>{elem.taskCounts.completedTask}</h5>
            <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.taskCounts.failedTask}</h5>
          </div>
        })}

      </div>


    </div>
  )
}

export default AllTask