import React, { useEffect, useState } from 'react'
import { useTaskUpdate } from '../../context/TaskContext';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const CreateTask = () => {
    const { triggerTaskUpdate } = useTaskUpdate();

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [allEmployee, setAllEmployee] = useState([]);

    // const data = userData;

    const submitHandler = (e) => {
        const task = {
            taskCategory, taskDate, taskDescription, taskTitle, assignedTo
        }
        e.preventDefault();

        fetch(`${backendUrl}/createTask`, {
            method: "POST",

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then((res) => res.json())
            .then((data) => {
                // Handle successful task creation
                console.log('Task created successfully:', data);
                triggerTaskUpdate();
            })


        setAssignedTo('');
        setTaskCategory('');
        setTaskDate('');
        setTaskTitle('');
        setTaskDescription('');
    }

    const handleSelection = (e) => {
        setAssignedTo(e.target.value);
    }

    useEffect(() => {
        fetch(`${backendUrl}/allemployee`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("all employees", data);
                setAllEmployee(data.users);
            })
            .catch((error) => {
                console.error('error while fetching employee:', error);
            })
    }, [])


    return (
        <div className='p-5 bg-[#1c1c1c] mt-1 rounded'>
            <form
                onSubmit={(e) => submitHandler(e)}
                className=' h-80 flex flex-wrap w-full items-start p-5 justify-between'>
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value);
                            }}
                            className='text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='' />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5' >Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => {
                                setTaskDate(e.target.value);
                            }}
                            className='text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="date" />
                    </div>
                    <div className="mb-4">
                        <h3 className='text-sm text-gray-300 mb-0.5'>Assign To</h3>
                        <select 
                            value={assignedTo}
                            onChange={handleSelection}
                            className="text-sm py-2 px-3 w-4/5 rounded outline-none bg-[#2c2c2c] border-[1px] border-gray-400 
                            focus:border-emerald-500 cursor-pointer"
                        >
                            <option value="" disabled selected>employees</option>
                            {allEmployee && allEmployee.map((employee, index) => (
                                <option 
                                    key={index} 
                                    value={employee.username}
                                    className="bg-[#2c2c2c] hover:bg-[#3c3c3c] py-2"
                                >
                                    {employee.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input

                            value={taskCategory}
                            onChange={(e) => {
                                setTaskCategory(e.target.value);
                            }}
                            className='text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='design, dev, etc.' />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value);
                        }}
                        className='w-full h-52 text-sm py-2 px-4 rounded ouline-none bg-transparent border-[1px] border-gray-400' name="" id=""></textarea>
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-base mt-6 w-full'>Create Task</button>
                </div>
            </form>
        </div>
    )
}
