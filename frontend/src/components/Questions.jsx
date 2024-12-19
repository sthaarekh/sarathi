import React, { useEffect, useState } from "react";
import { FaComputer } from "react-icons/fa6";
import { GiBulletBill } from "react-icons/gi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdSaveAlt } from "react-icons/md";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "./Popup/Popup";
import { DeleteAClub, deleteQuestionsForAClub, getllAllQuestions, verifyClub } from "../utils/api";

const Questions = ({ id }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await getllAllQuestions(id);
        console.log(data); 
        setQuestionData(Array.isArray(data.data.AllQuestions) ? data.data.AllQuestions : []);
      } catch (error) {
        console.error("Error fetching the questions", error);
      }
    };
    fetchQuestions();
  }, [id]);
  

  const openPopup = (type) => {
    setPopupType(type);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setPopupType("");
  };

  const onConfirm =async () => {
    const action = popupType === "verify" ? "approved" : "deleted";
    console.log("Frontend end point")
    if(popupType ==="verify"){
      console.log("Inside function ")
      console.log
      try{
        await verifyClub(id);
      }catch(error){
        console.error(error)
      }
      
    }
    else if(popupType ==="decline"){
      try{
        console.log(id)
        await DeleteAClub(id);

        await deleteQuestionsForAClub(id);
      }catch(error){
        console.error(error)
      }
    }
    toast.success(`Club has been ${action} successfully`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    closePopup();
  };

  const club = Array.isArray(questionData) ? questionData.find((club) => club.clubId === id) : null;
  const clubQuestions = club ? club.questions : [];

  if (clubQuestions.length === 0) {
    return (
      <>
        <div className="flex justify-evenly items-center">
          <div
            className="flex items-center border-[2px] border-red-600 bg-red-200 rounded-md p-1"
            style={{ cursor: "pointer" }}
            onClick={() => openPopup("decline")}
          >
            <RiDeleteBinLine style={{ scale: "1.1" }} />
            <span>Delete this club</span>
          </div>
        </div>

        <Popup
          header="Are you sure?"
          content="Everything related to this club will be deleted. This action cannot be undone."
          onConfirm={onConfirm}
          onDecline={closePopup}
          isOpen={isPopupOpen}
          closePopup={closePopup}
        />
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <div
        className="max-h-[120px] overflow-y-auto overflow-x-hidden p-2"
        style={{
          maxHeight: "120px",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
        }}
      >
        {clubQuestions.map((q, index) => (
          <div key={index} className="mb-2 border-b pb-2">
            <div className="flex items-center space-x-2 w-full">
              <FaComputer style={{ color: "green" }} />
              <span className="font-bold text-sm break-words w-full">{q.question}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1 w-full">
              <GiBulletBill />
              <span className="text-sm text-gray-600 break-words w-full">{q.answer}</span>
            </div>
          </div>
        ))}
        <div className="flex justify-evenly items-center">
          <div
            className="flex items-center border-[2px] border-green-600 bg-green-200 rounded-md p-1"
            style={{ cursor: "pointer" }}
            onClick={() => openPopup("verify")}
          >
            <MdSaveAlt style={{ scale: "1.1" }} />
            <span>Verify</span>
          </div>
          <div
            className="flex items-center border-[2px] border-red-600 bg-red-200 rounded-md p-1"
            style={{ cursor: "pointer" }}
            onClick={() => openPopup("decline")}
          >
            <RiDeleteBinLine style={{ scale: "1.1" }} />
            <span>Discard</span>
          </div>
        </div>
      </div>

      <Popup
        header="Are you sure?"
        content={`Are you sure you want to ${popupType === "verify" ? "verify" : "discard"} this club?`}
        onConfirm={onConfirm}
        onDecline={closePopup}
        isOpen={isPopupOpen}
        closePopup={closePopup}
        id={id}
      />
      <ToastContainer />
    </>
  );
};

export default Questions;
