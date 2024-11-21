import React from 'react'
import Header from '../others/Header.jsx'
import TaskListNumbers from '../others/TaskListNumbers.jsx'
import TaskList from '../TaskList/TaskList.jsx'


const EmployeeDashboard = () => {

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        
        <Header/>
        <TaskListNumbers/>
        <TaskList/>
    </div>
  )
}

export default EmployeeDashboard;