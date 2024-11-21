import React, { createContext, useState } from 'react'


export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  
  const setUserData = (data) =>{
    setUser(data);
  }

// const [userData, setUserData] = useState(()=>{
//   const {employees, admin} = getLocalStorage();
//   return {employees, admin} ? {employees, admin} : null;
// });

// useEffect(()=>{
// const {employees, admin} = getLocalStorage();
// setUserData({employees, admin});
// },[]);

// useEffect(()=>{
//   console.log(userData);
  
// },[userData])


  return (
    <AuthContext.Provider value={{user, setUserData}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;