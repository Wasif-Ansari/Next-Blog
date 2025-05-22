import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";

export default function layout({children}){
    return(
        <>
        {children}
        <Footer/>
        </>
    )
}