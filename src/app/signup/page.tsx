"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
export default function SignupPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const [loading,setLoading]=React.useState(false);   

const onSignup=async()=>{
    try {
        setLoading(true);
        const response=await axios.post("/api/users/signup",user);
        console.log("Signup successful",response);  //console log in frontend /console
        router.push("/login")
    } catch (error:any) {
        console.log(error.message);
        //toast
    }finally{
        setLoading(false);
    }
}
useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 &&user.username.length>0)
    {
        setButtonDisabled(false);
    }
    else{
        setButtonDisabled(true);
    }
},[user]);
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"Processing...":"Signup"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="bg-red-900"
                    value={user.username}
                    onChange={(event)=>setUser({...user,username:event.target.value})}
                    placeholder="usernanme"
            />
            {/* ...user means keep everything same only set user name as e.target.value */}
        <hr />
            <label htmlFor="email">Email</label>
            <input type="text" id="email" className="bg-red-900" 
                    value={user.email}
                    onChange={(event)=>setUser({...user,email:event.target.value})}
                    placeholder="email"
            />
            <hr />
            <label htmlFor="password">Password</label>
            <input type="password" id="password"  className="bg-red-900"
                    value={user.password}
                    onChange={(event)=>setUser({...user,password:event.target.value})}
                    placeholder="password"
            />

            <button onClick={onSignup}
            className="p-2 bg-orange-200 m-3 text-black">
               {buttonDisabled?"NoSignup":"SignUp"}
            </button>

            <Link href="/login">Existing user?</Link>
        </div>
    )
}