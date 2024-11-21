// import { useContext, useEffect, useState } from 'react'
// import './App.css'
// import Login from './components/Auth/Login'
// import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
// import AdminDashboard from './components/Dashboard/AdminDashboard'
// import { AuthContext } from './context/AuthProvider'

// function App() {
//   const [user, setUser] = useState(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     return loggedInUser ? loggedInUser.role : null;
//   });

//   const [loggedInUserData, setLoggedInUserData] = useState(() => {
//     const data = JSON.parse(localStorage.getItem('loggedInUserData'));
//     return data ? data.data : null;
//   });

//   const [userData, setUserData] = useContext(AuthContext);
//   const authData = userData;

//   const handleLogin = (email, password) => {
//     if (!authData || (!authData.employees && !authData.admin)) {
//       alert("authenticating data is missing");
//     }

//     const admin = authData.admin?.find((user) => user.email == email && user.password == password);
//     if (admin) {
//       localStorage.setItem('loggedInUserData', JSON.stringify({ data: admin }));
//       localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
//       setLoggedInUserData(admin);
//       setUser('admin');
//       return;
//     }

//     const employee = authData.employees?.find((user) => user.email == email && user.password == password);
//     if (employee) {
//       console.log(employee);
//       localStorage.setItem('loggedInUserData', JSON.stringify({ data: employee }));
//       localStorage.setItem('loggedInUser', JSON.stringify({ role: "employee" }));
//       setLoggedInUserData(employee);
//       setUser('employee');
//       return;
//     } else {
//       alert('invalid user credentials');
//     }
//   }

//   return (
//     <div className=''>
//       {!user ? <Login handleLogin={handleLogin} /> : null}
//       {user == 'admin' && loggedInUserData ? <AdminDashboard changeUser={setUser} data={loggedInUserData} /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null)}

//     </div>
//     // <Registration/>
//   )
// }

// export default App
