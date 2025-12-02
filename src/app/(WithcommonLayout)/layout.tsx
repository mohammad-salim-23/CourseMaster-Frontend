import Navbar from "@/src/components/Navbar/Navbar";
import React from "react";
const CommonLayout = ({children}:{children: React.ReactNode})=>{
    return(
        <>
        <Navbar/>
        <main className="min-h-screen">{children}</main>
        </>
    )
}
export default CommonLayout;