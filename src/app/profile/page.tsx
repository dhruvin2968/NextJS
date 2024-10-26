"use client";
import axios from "axios"
import Link from "next/link"
import {useRouter} from "next/navigation"
import { useState } from "react";
export default function Profilepage(){
    const router=useRouter();
    const [data,setData]=useState("noUser");
    const logout=async()=>{
        try {
            //get request //asynchronous hai isliye await
            const rep=await axios.get('/api/users/logout');
            console.log("LogOut successful",rep);
            router.push('/login');
        }// eslint-disable-next-line @typescript-eslint/no-explicit-any 
        catch (error:any) {
            console.log(error.message)
            
        }
    }
    const getUserDetails=async()=>{
        const res=await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <h2>{data==='noUser'?"No User":
                        <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <button onClick={logout} className="py-2 px-4 bg-red-500 m-4">LogOut</button>
<hr />
<button onClick={getUserDetails} className="py-2 px-4 bg-red-400 m-4">GetUser Details</button>

        </div>
    )
}