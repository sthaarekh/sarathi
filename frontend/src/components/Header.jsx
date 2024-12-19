import React from "react";
import Searchbar from "./Searchbar";
import { MdOnlinePrediction, MdLogout } from "react-icons/md";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full pt-4 z-50 h-[75px] bg-gray-200">
      <div className="flex justify-evenly items-center ">
        <Searchbar />
        <div className="flex items-center gap-1 invisible sm:visible">
          <span>Admin</span>
          <MdOnlinePrediction
            style={{
              color: "green",
              transform: "scale(1.5)",
            }}
          />
        </div>
        <div className="pr-2">
          <MdLogout style={{ transform: "scale(1.5)", cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
};

export default Header;
