import React from 'react'
import Header from '../others/Header'
import { CreateTask } from '../others/CreateTask'
import AllTask from '../others/AllTask'

const AdminDashboard = () => {
  return (
    <>
    <div className='h-[520px] w-full p-6 mb-3'>
        <Header />
        <CreateTask/>
    </div>
    <AllTask/>
    </>

  )
}

export default AdminDashboard