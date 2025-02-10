import { ILoginProps, IRegister } from "@/interfaces"
import Swal from "sweetalert2"

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function register(userData: IRegister) {
    try {
        const response = await fetch(`${APIURL}/users/register`, 
            {
                method: "POST",
                headers: { 
                    "Content-type": "application/json"
            },
             body: JSON.stringify(userData)
    })
    if(response.ok){
        return response.json()
    } else {
        Swal.fire("Fail in the register of new user")
    }
        
    } catch (error: any) {
        alert ("Fail in the register of new user2")
        throw new Error(error)
    }
}

export async function login(userData: ILoginProps) {
    try {
        const response = await fetch(`${APIURL}/users/login`, 
            {
                method: "POST",
                headers: { 
                    "Content-type": "application/json"
            },
             body: JSON.stringify(userData)
    })
    if(response.ok){
        return response.json()
    } else {
        Swal.fire("Fail in login ")
    }
        
    } catch (error: any) {
        alert ("Fail in login 2")
        throw new Error(error)
    }
}