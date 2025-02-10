"use client"
import { IUserSession } from "@/interfaces"
import {useState, useEffect, createContext, useContext} from "react"


export interface AuthContextProps {
    userData: IUserSession | null;
    setUserData: (userData: IUserSession | null) => void;
    logout: () => void; //porque es una funcion
} 

export const AuthContext = createContext<AuthContextProps> ({
userData : null,
setUserData: () => {},
logout: () => {}
})

export interface AuthProviderProps {
children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
const [userData, setUserData] = useState<IUserSession | null>(null)


useEffect(() => {
    if(userData){
        localStorage.setItem("userSession", JSON.stringify({token: userData.token, user: userData.user}))
    }

}, [userData])

    useEffect(() => {
        const userData = JSON.parse( localStorage.getItem("userSession")!)
        setUserData(userData)

    }, [])
    
    const logout = () => {
        setUserData(null)
        localStorage.removeItem("userSession") //limpia el localstorage
    }
return (
    <AuthContext.Provider value={{userData, setUserData, logout}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)