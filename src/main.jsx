import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AuthProvider from './context/AuthProvider.jsx';
import React from 'react';
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from './components/Auth/Login.jsx';
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx';
import { Registration } from './components/Auth/Registration.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
