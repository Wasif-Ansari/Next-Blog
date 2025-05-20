import Sidebar from "@/components/AdminComponents/Sidebar";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function layout({children}){
    return(
        <>
        <div className="ml-64 w-full p-6 flex">
            <ToastContainer theme="dark"/>
            <Sidebar/>
        </div>
        {children}
        </>
    )
}