"use client"
import { createContext, useState } from "react";

export const AuthContext = createContext(); // => DEPO OLUŞTUR

// Provide => Dışarıya sağlamamız (sağlayıcı)

// RFC => React Functional component
export const AuthProvider = (props) => {

    const getInitialAuthState = () => {
        if(localStorage.getItem('token') != null)
            return true;
        
        return false;
    }
    
    const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState());

   

    return <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
        {props.children}
    </AuthContext.Provider>
}
