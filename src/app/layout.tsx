import Navbar from "@/src/components/modules/Home/Navbar/Navbar";
import { UserProvider } from "@/src/UserContext";
import React from "react";
const CommonLayout = ({children}:{children: React.ReactNode})=>{
    return(
        <>
        <UserProvider>
       <Navbar/>
        <main className="min-h-screen">{children}</main>
        </UserProvider>
        </>
    )
}
export default CommonLayout;