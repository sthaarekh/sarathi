
import React, { useState ,useEffect} from "react";

import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import Questions from "../components/Questions";
import { getAllClubs } from "../utils/api";

const Admin = () => {
  const [clubData,setClubData]=useState([])
  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const rawData = await getAllClubs();
        setClubData(rawData.data.data.clubs)
      } catch (error) {
        console.error("Error Fetching Club data", error);
      }
    };
    fetchClubData();
  }, []); 
  const [Active, setActive] = useState("clubs");
  const [currentPage, setCurrentPage] = useState(1);

  const [toggler, setToggler] = useState({});

  const handleToggler = (id) => {
    setToggler((prev) => ({
      ...prev,
      [id]: prev[id] === "on" ? "off" : "on",
    }));
  };

  const notices = 10;

  const ClubWithEmailVerified = clubData
    .filter((club) => club.emailVerified === true)
    .sort((a, b) => {
      return a.adminVerified === b.adminVerified
        ? 0
        : a.adminVerified
        ? 94827597234857
        : -9472979;
    });

  const clubsPending = ClubWithEmailVerified.filter(
    (el) => el.adminVerified === false
  ).length;

  const ClubsNumberInApage = 10;
  const TotalPages = Math.ceil(
    ClubWithEmailVerified.length / ClubsNumberInApage
  );

  const startIndex = (currentPage - 1) * ClubsNumberInApage + 1;
  const endIndex = Math.min(
    currentPage * ClubsNumberInApage,
    ClubWithEmailVerified.length
  );

  const ClubsToShowInOnePage = ClubWithEmailVerified.slice(
    startIndex - 1,
    endIndex
  );

  const handleNextPage = () => {
    if (currentPage < TotalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={`pt-[80px] flex justify-center `}>
      <div className="flex flex-col items-center gap-10">
        <div className="flex gap-10">
          <div
            className="flex gap-1"
            style={{
              cursor: "pointer",
            }}
            onClick={() => setActive("clubs")}
          >
            <span
              className={`${
                Active === "clubs" ? "border-b-2 border-b-green-700" : ""
              }`}
            >
              clubs
            </span>
            {clubsPending > 0 && (
              <div className="text-white h-[22px] w-[25px] bg-orange-500 text-center items-center rounded-md">
                {clubsPending}
              </div>
            )}
          </div>
          <div
            className="flex gap-1"
            style={{ cursor: "pointer" }}
            onClick={() => setActive("notices")}
          >
            <span
              className={`${
                Active === "notices" ? "border-b-2 border-b-green-700" : ""
              }`}
            >
              notices
            </span>
            {notices > 0 && (
              <div className="text-white h-[22px] w-[25px] bg-orange-500 text-center items-center rounded-md">
                {notices}
              </div>
            )}
          </div>
        </div>

        {Active === "clubs" && (
          <>
            <div className="text-gray-700 mb-4">
              Showing {startIndex} to {endIndex} of{" "}
              {ClubWithEmailVerified.length} results
            </div>

            <table className="min-w-full border-collapse bg-[#f2f2f2]">
              <thead>
                <tr>
                  <th className="border px-6 py-3 border-gray-300 text-left">
                    id
                  </th>
                  <th className="border px-6 py-3 border-gray-300 text-left">
                    Name
                  </th>
                  <th className="border px-6 py-3 border-gray-300 text-left">
                    Department
                  </th>
                  <th className="border px-6 py-3 border-gray-300 text-left">
                    Status
                  </th>
                  <th className="border px-6 py-3 border-gray-300 text-left">
                    Created At
                  </th>
                  <th className="border px-6 py-3 border-gray-300 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {ClubsToShowInOnePage.map((el) => (
                  <React.Fragment key={el._id}>
                    <tr>
                      <td className="px-6 py-3">{el._id}</td>
                      <td className="px-6 py-3">{el.name}</td>
                      <td className="px-6 py-3">{el.section}</td>
                      <td className="px-6 py-3">
                        {el.adminVerified ? (
                          <div className="h-[28px] w-[75px] border-2 border-blue-600 bg-blue-200 text-center rounded-lg">
                            verified
                          </div>
                        ) : (
                          <div className="h-[28px] w-[75px] border-2 border-orange-600 bg-orange-200 text-center rounded-lg">
                            Pending
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-3">{el.createdAt}</td>
                      <td className="px-6 py-3 flex justify-center scale-[1.7]">
                        {toggler[el._id] === "on" ? (
                          <CiCircleChevUp
                            style={{ cursor: "pointer" }}
                            onClick={() => handleToggler(el._id)}
                          />
                        ) : (
                          <CiCircleChevDown
                            style={{ cursor: "pointer" }}
                            onClick={() => handleToggler(el._id)}
                          />
                        )}
                      </td>
                    </tr>
                    {toggler[el._id] === "on" && (
                      <tr>
                        <td colSpan={6} className="p-4">
                          <div
                            className="rounded-md max-h-[150px] overflow-y-auto w-full border-t border-gray-300"
                            style={{
                              maxHeight: "150px",
                              overflowY: "auto", 
                              padding: "10px", 
                              backgroundColor: "#f9f9f9", 
                              minWidth: "100%",
                            }}
                          >
                           
                            <Questions id={el._id} />
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between w-full mt-4">
              <button
                className={`px-4 py-2 border rounded-md ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 border rounded-md ${
                  currentPage === TotalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleNextPage}
                disabled={currentPage === TotalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;