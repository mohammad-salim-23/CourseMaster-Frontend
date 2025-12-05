/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        const result = await res.json()

        if (result?.success) {
            (await cookies()).set("accessToken", result?.data?.token)
        }

        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        const result = await res.json()
       console.log("Login Result:", result);
        if (result?.success) {
            const accessToken = result?.data?.accessToken;
            (await cookies()).set("accessToken", result?.data?.accessToken)
             if (accessToken) {
                const decoded = jwtDecode<any>(accessToken);
                const userRole = decoded?.role; 

                if (userRole) {
                   
                    (await cookies()).set("role", userRole);
                }
            }
        }

        return result;
    } catch (error: any) {
        return Error(error)
    }
}
export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decodedData = null;
    console.log("Access Token:", accessToken);
     if (!accessToken) return null;
 
    try {
        const decoded = jwtDecode<any>(accessToken);
        return {
            email: decoded?.userEmail,
            role: decoded?.role,
            name: decoded?.name,
        };
    } catch (err) {
        console.error("Invalid token:", err);
        return null;
    }
}



export const getToken = async () => (await cookies()).get("accessToken")?.value || "";
export const logout = async () => {
    (await cookies()).delete("accessToken");
}


