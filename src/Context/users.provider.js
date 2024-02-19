import { useEffect, useState } from "react";
import { UseContext } from "./users.context";
import { doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, isAdminUser, isLoggedIn } from "../auth/helper.auth";

const UserProvider = ({ children }) => {
  const [islogein, setIsLogein] = useState(false);
  const [userData, setUserData] = useState(null);
const [isAdmin,setIsAdmin] = useState(false)


   useEffect(()=>{
    setIsLogein(isLoggedIn());
    setIsAdmin(isAdminUser)
    setUserData(getDataFromLocalStorage());
  },[])

const isLogin=(data)=>{
  doLoginLocalStorage(data)
    setIsLogein(true)
    setIsAdmin(isAdminUser)
    // setUserData(getDataFromLocalStorage())
}

const LogOut=()=>{
     doLogoutFromLocalStorage()
     setIsLogein(false)
     setIsAdmin(isAdminUser)
     setUserData(null)
}


  return (
    <UseContext.Provider
      value={{
        islogein:islogein,
        isAdmin:isAdmin,
        // setIsLogein: setIsLogein,
        userData: userData,
        // setUserData: setUserData,
        login:isLogin,
        logout:LogOut
      }}
    >
      {children}
    </UseContext.Provider>
  );
};

export default UserProvider;
