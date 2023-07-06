"use client"
import { createContext, useState } from "react";

export const AuthContext = createContext(); // => DEPO OLUŞTUR

// Provide => Dışarıya sağlamamız (sağlayıcı)

// RFC => React Functional component
export const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    return <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
        {props.children}
    </AuthContext.Provider>
}
