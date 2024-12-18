import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../others/spinner.jsx';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserData, getUserData } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userData = getUserData();
        if (token && userData) {
            if (userData.user.role === "admin") navigate('/adminDashboard');
            if (userData.user.role === "employee") navigate('/employeeDashboard');
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`${backendUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        })
            .then((res) => res.json())
            .then((data) => {
                const token = data.token;
                if (token) {
                    localStorage.setItem('authToken', token);
                    const decoded = jwtDecode(token);
                    const userId = decoded.userId;
                    fetch(`${backendUrl}/userdetails/${userId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            setUserData(data);
                            if (data.user.role === "admin") navigate('/adminDashboard');
                            if (data.user.role === "employee") navigate('/employeeDashboard');
                        })
                        .catch((error) => {
                            console.error('Failed to fetch user details:', error);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
        setUsername("");
        setPassword("");
    }
    if(isLoading) return <Spinner />;
    else return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='border-2 rounded-xl border-emerald-600 p-20'>
                <form className='flex flex-col items-center justify-center'
                    onSubmit={(e) => { submitHandler(e) }}
                >
                    <input required
                        value={username}
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400'
                        type="string"
                        placeholder='Enter your username'
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <input required
                        value={password}
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400'
                        type="password"
                        placeholder='Enter password'
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white'>Log in</button>
                </form>
                <div className='mt-2 text-xl flex items-center justify-center'>
                    <p>or</p>
                </div>
                <Link to="/register"><button className='mt-4 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white'>Register</button>
                </Link>
            </div>
        </div>
    )
    
}

export default Login