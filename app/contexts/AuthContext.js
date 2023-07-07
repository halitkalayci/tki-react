"use client"
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext(); // => DEPO OLUŞTUR

// Provide => Dışarıya sağlamamız (sağlayıcı)

// RFC => React Functional component
export const AuthProvider = (props) => {

    const getInitialAuthState = () => {
        if(typeof window !== 'undefined' && localStorage.getItem('token') != null)
            return true;
        
        return false;
    }

    const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState());

    const getDecodedToken = () => {
        if (getInitialAuthState() == false)
                return {};
        return jwt_decode(localStorage.getItem('token'));
    }

    return <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,getDecodedToken}}>
        {props.children}
    </AuthContext.Provider>
}
// Geolocation
// Global Error Handler
// navigator.geolocation.getCurrentPosition((position) => { console.log(position) })
