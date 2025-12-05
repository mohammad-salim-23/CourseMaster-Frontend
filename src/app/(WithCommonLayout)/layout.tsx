

import { UserProvider } from "@/src/UserContext";
import Navbar from "@/src/components/modules/Home/Navbar/Navbar";
import React from "react"; 


const CommonLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    
    <UserProvider>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </UserProvider>
    
  );
};


export default CommonLayout;