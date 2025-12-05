
import type { Metadata } from "next";
import "./globals.css"; 
import { UserProvider } from "../UserContext";
import Navbar from "../components/modules/Home/Navbar/Navbar";


export const metadata: Metadata = {
  title: "CourseMaster Frontend",
  description: "..."
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body>
        
        <UserProvider>
          <Navbar/>
          <main className="min-h-screen">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}