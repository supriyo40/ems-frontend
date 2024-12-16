import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { getUserData, clearUserData } = useAuth();
  const userData = getUserData();
  const navigate = useNavigate();

  const logoutUser = () => {
    clearUserData(); // This will clear both authToken and userData
    navigate('/');
  }
  
  return (
    <div className='p-2 pb-3 mt-1 mb-5 flex items-end justify-between'>
        <h1 className='text-2xl font-medium'>Hello <br /> 
          <span className='text-3xl font-semibold'>
            {userData?.user.firstName || "Guest"} 👋
          </span>
        </h1>
        <button 
          onClick={logoutUser} 
          className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm'
        >
          Log Out
        </button>
    </div>
  )
}

export default Header