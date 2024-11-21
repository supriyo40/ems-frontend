import React from 'react'

const CompleteTask = ({task}) => {
  const dateString = task.taskDate;
  const date = new Date(dateString);
  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-green-500 rounded-xl'>
        <div className='flex justify-between items-center'>
            <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{task.taskCategory}</h3>
            <h4 className='text-sm'>{date.toLocaleDateString()}</h4>
        </div>
        <h2 className='mt-5 text-2xl font-semibold'>{task.taskTitle}</h2>
        <p className='text-sm mt-2'>{task.taskDescription}</p>
    </div>
  )
}

export default CompleteTask