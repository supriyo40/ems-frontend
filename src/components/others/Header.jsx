import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const {user} = useContext(AuthContext);
  console.log(user);
  
  const navigate = useNavigate();

  const logoutUser = ()=>{
    localStorage.removeItem('authToken');
    navigate('/');
  }
  
  return (
    <div className='p-2 pb-3 mt-1 mb-5 flex items-end justify-between'>
        <h1 className='text-2xl font-medium'>Hello <br /> <span className='text-3xl font-semibold'>{user?.user.firstName || "Guest"} 👋</span></h1>
        <button onClick={logoutUser} className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm'>Log Out</button>
    </div>
  )
}

export default Header