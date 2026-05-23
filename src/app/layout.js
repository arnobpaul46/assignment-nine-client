
import Navbar from "@/components/Navbar";
import "./globals.css";
import Hero from "@/components/Hero";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "DocAppoint | Your Gateway to Medical Excellence",
  description: "Book appointments with top-rated medical professionals in seconds. Experience a futuristic approach to healthcare management.",
   icons: {
    icon: "activity.svg", 
  },
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en "
      className="hydrated"
    >
      <body className="min-h-full flex flex-col">
        
        <Navbar/>
         <ToastContainer />
        {children}



      </body>
    </html>
  );
}
