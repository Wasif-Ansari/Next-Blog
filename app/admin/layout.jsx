import Sidebar from "@/components/AdminComponents/Sidebar";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function layout({children}){
    return(
        <>
        <div className="flex">
            <ToastContainer theme="dark"/>
            <Sidebar/>
            {/* Adjust main content to take remaining width and apply left margin */}
            <main className="flex-1 ml-64"/>
        </div>
        {children}
        </>
    )
}