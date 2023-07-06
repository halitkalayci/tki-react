"use client"
import { createContext } from "react";

export const AuthContext = createContext(); // => DEPO OLUŞTUR

// Provide => Dışarıya sağlamamız (sağlayıcı)

// RFC => React Functional component
export const AuthProvider = (props) => {
    return <AuthContext.Provider value={{id:1}}>
        {props.children}
    </AuthContext.Provider>
}
