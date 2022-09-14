import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [AuthIsReady,setAuthIsReady] = useState(false);
    return <AuthContext.Provider value={{user,setUser,AuthIsReady,setAuthIsReady}}>
        {children}
    </AuthContext.Provider>
}