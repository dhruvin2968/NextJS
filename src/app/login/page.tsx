"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        password: "",
        email: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login successful:", response.data);
            router.push("/profile");
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            console.log("Login failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing..." : "Login"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                className="text-black"
                value={user.email}
                onChange={(event) => setUser({ ...user, email: event.target.value })}
                placeholder="email"  //...user means keep everything same only change email
            />
            <hr />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                className="text-black"
                value={user.password}
                onChange={(event) => setUser({ ...user, password: event.target.value })}
                placeholder="password"
            />

            <button
                onClick={onLogin}
                disabled={buttonDisabled}
                className={`p-2 m-3 text-black ${buttonDisabled ? "bg-gray-400" : "bg-orange-200"}`}
            >
                LogIn
            </button>

            <Link href="/signup">New user?</Link>
        </div>
    );
}
