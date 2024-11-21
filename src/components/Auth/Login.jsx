import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from '../../context/AuthProvider';

const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Login = () => {

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decode = jwtDecode(token);
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
                    if (data.user.role == "admin") navigate('/adminDashboard');
                    if (data.user.role == "employee") navigate('/employeeDashboard');
                })
        }
    }, [])

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setUserData } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
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
                    localStorage.setItem('authToken', data.token)
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
                            if (data.user.role == "admin") navigate('/adminDashboard');
                            if (data.user.role == "employee") navigate('/employeeDashboard');
                        })
                }
            });
        setUsername("");
        setPassword("");
    }
    return (
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