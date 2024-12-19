import React, { useEffect } from "react";
import Club from "./Pages/Clubs";
import Header from "./components/header";
import { ToastContainer} from 'react-toastify';


const App = () => {
  useEffect(() => {
    // Add 'overflow-y-scroll' to the body element to always show the vertical scrollbar
    document.body.classList.add('overflow-y-scroll');
    
    // Clean up by removing the class when the component is unmounted (optional)
    return () => {
      document.body.classList.remove('overflow-y-scroll');
    };
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-200 p-[10px] md:p-[20px]">
        <ToastContainer/>
        <Header />
        <Club />
      </div>
    </>
  );
};

export default App;
