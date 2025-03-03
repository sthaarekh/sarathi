import React, { useState, useEffect } from "react";
import { ArrowUpDown, Trash2, Check, Search, Pause, ChevronDown, ChevronUp, AlertCircle, Eye, X } from "lucide-react";
import { toast } from "sonner";
import { getAllClubs, verifyClub, getAllQuestions, deleteClub, holdClub, getAllReportedNotices, deleteReportedNotice} from '../utils/api';
import Loading from '../components/Loading';

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [clubs, setClubs] = useState([]);
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('reportCount');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [expandedClub, setExpandedClub] = useState(null);
  const [clubQuestions, setClubQuestions] = useState({});
  const [loadingQuestions, setLoadingQuestions] = useState({});
  const [error, setError] = useState(null);
  const [page, setPage] = useState('clubs');
  const [sortOrder, setSortOrder] = useState({
    status: "asc",
    name: "asc",
    date: "asc",
  });

  // Fetch clubs data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllClubs();
        setClubs(response.data.data.clubs);
        const noticesR = await getAllReportedNotices();
        setNotices(noticesR.data.data.notices)
        console.log()
      } catch (error) {
        console.error("Error fetching clubs:", error);
        toast.error("Failed to fetch clubs data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to fetch questions for a specific club
  const fetchClubQuestions = async (clubId) => {
    setLoadingQuestions(prev => ({ ...prev, [clubId]: true }));
    try {
      const data = await getAllQuestions(clubId);
      if (data.data.status === "Success" && data.data.data.allQuestions.length > 0) {
        setClubQuestions(prev => ({
          ...prev,
          [clubId]: data.data.data.allQuestions[0]
        }));
        setError(null);
      }
    } catch (error) {
      // toast.error("Failed to fetch club questions");
    } finally {
      setLoadingQuestions(prev => ({ ...prev, [clubId]: false }));
    }
  };

  const approveStatusChange = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to verify this club?");
  
    if (isConfirmed) {
      try {
        await verifyClub(id);
        const updatedClubs = clubs.map((club) =>
          club._id === id ? { ...club, adminVerified: true } : club
        );
        setClubs(updatedClubs);
        toast.success("Club verified successfully.")
      } catch (error) {
        toast.error("Failed to verify club.");
      }
    }
  };

  // Function to reject club
  const handelHoldClub = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to put the club on hold?");
    if (isConfirmed) {
      try {
        await holdClub(id);
        const updatedClubs = clubs.map((club) =>
          club._id === id ? { ...club, adminVerified: false } : club
        );
        setClubs(updatedClubs);
        toast.success("Club on hold successfully.");
      } catch (error) {
        toast.error("Failed to hold the club");
      }
    }
  };

  // Function to delete club
  const deleteRequest = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this club?");
  
    if (isConfirmed) {
      try {
        await deleteClub(id);
        const updatedClubs = clubs.filter((club) => club._id !== id);
        setClubs(updatedClubs);
        setError(null);
        toast.success("Clubs deleted successfully.")
      } catch (error) {
        toast.error("Failed to delete club");
      }
    }
  };

  // Toggle questions visibility with data fetching
  const toggleQuestions = async (clubId) => {
    if (expandedClub === clubId) {
      setExpandedClub(null);
    } else {
      setExpandedClub(clubId);
      if (!clubQuestions[clubId]) {
        await fetchClubQuestions(clubId);
      }
    }
  };

  // Filter clubs based on search query
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastClub = currentPage * itemsPerPage;
  const indexOfFirstClub = indexOfLastClub - itemsPerPage;
  const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);
  const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);

  const renderQuestionAnswer = (question, answer) => (
    <div className="mb-4 border-b border-gray-200 pb-4">
      <div className="font-medium text-gray-700 mb-2">{question}</div>
      <div className="text-gray-600 pl-4">{answer}</div>
    </div>
  );



  // Sorting function
  const sortClubs = (column) => {
    const sortedClubs = [...clubs];
    const newSortOrder = sortOrder[column] === "asc" ? "desc" : "asc";

    sortedClubs.sort((a, b) => {
      if (column === "status") {
        const aValue = a.adminVerified ? 1 : 0;
        const bValue = b.adminVerified ? 1 : 0;
        return newSortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else if (column === "name") {
        return newSortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (column === "date") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

    setSortOrder({ ...sortOrder, [column]: newSortOrder });
    setClubs(sortedClubs);
  };

  const sortNotices = (field) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  // Filter notices by search query
  const filteredNotices = notices.filter(notice => 
    notice.club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    notice.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort notices
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (sortField === 'reportCount') {
      return sortDirection === 'asc' ? a.reportCount - b.reportCount : b.reportCount - a.reportCount;
    } else if (sortField === 'clubName') {
      return sortDirection === 'asc' 
        ? a.club.name.localeCompare(b.club.name) 
        : b.club.name.localeCompare(a.club.name);
    } else if (sortField === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.createdAt) - new Date(b.createdAt) 
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  // Pagination
  const totalPages1 = Math.ceil(sortedNotices.length / itemsPerPage);
  
  const currentNotices = sortedNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Truncate long text
  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Delete a notice (placeholder function)
  const deleteNotice = async(id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this notice?");
    
    if (isConfirmed) {
      try {
        await deleteReportedNotice(id);
        const updatedNotice = notices.filter(notice => notice._id !== id);
        setNotices(updatedNotice);
        setError(null);
        toast.success("Notice deleted successfully.")
      } catch (error) {
        toast.error("Failed to delete club");
      }
    }
  };


  if (loading) return <Loading/>;

  return (
    <div className="max-w-6xl mx-auto px-0 py-6">
      <div className="flex justify-center space-x-10 items-center mb-4">
        <button className={`px-4 py-2 rounded-lg ${ page === "clubs" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
          onClick={() => setPage("clubs")}>Clubs</button>
        <button className={`px-4 py-2 rounded-lg ${page === "notices" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
          onClick={() => setPage("notices")}>Notices</button>
      </div>
      <div className="flex justify-end mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search clubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-96 border rounded-lg"
          />
        </div>
      </div>
     
    {page === 'clubs' &&
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                #
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => sortClubs("name")}
              >
                <div className="flex items-center gap-2">
                  Full Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => sortClubs("status")}
              >
                <div className="flex items-center gap-2">
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                E-Mail
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => sortClubs("date")}
              >
                <div className="flex items-center gap-2">
                  Created At
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Questions
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentClubs.map((club) => (
              <React.Fragment key={club._id}>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{club._id}</td>
                  <td className="px-6 py-4 text-sm">{club.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        club.adminVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {club.adminVerified ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{club.contact.email}</td>
                  <td className="px-6 py-4 text-sm">{new Date(club.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blue-100 text-gray-800"
                      onClick={() => toggleQuestions(club._id)}
                    >
                      View
                      {expandedClub === club._id ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {!club.adminVerified && (
                        <div className="flex gap-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={() => approveStatusChange(club._id)}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full"
                        onClick={() => handelHoldClub(club._id)}
                      >
                        <Pause className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full"
                        onClick={() => deleteRequest(club._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedClub === club._id && (
                  <tr className="bg-gray-50">
                    <td colSpan={7} className="p-4">
                      <div className="rounded-lg max-h-[400px] overflow-y-auto px-6">
                        {loadingQuestions[club._id] ? (
                          <Loading />
                        ) : clubQuestions[club._id] ? (
                          <div className="space-y-4">
                            {renderQuestionAnswer(clubQuestions[club._id].FirstQuestion, clubQuestions[club._id].FirstAnswer)}
                            {renderQuestionAnswer(clubQuestions[club._id].SecondQuestion, clubQuestions[club._id].SecondAnswer)}
                            {renderQuestionAnswer(clubQuestions[club._id].ThirdQuestion, clubQuestions[club._id].ThirdAnswer)}
                            {renderQuestionAnswer(clubQuestions[club._id].FourthQuestion, clubQuestions[club._id].FourthAnswer)}
                            {renderQuestionAnswer(clubQuestions[club._id].FifthQuestion, clubQuestions[club._id].FifthAnswer)}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            No questions available for this club.
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500">/Page</div>
          </div>
        </div>
      </div>
    }

    {page === 'notices' &&
    <div className="max-w-6xl mx-auto px-0 py-6">

    {/* Notices table */}
    <div className="bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              #
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
              onClick={() => sortNotices("clubName")}
            >
              <div className="flex items-center gap-2">
                Club Name
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Description
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
              onClick={() => sortNotices("reportCount")}
            >
              <div className="flex items-center gap-2">
                Report Count
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
              onClick={() => sortNotices("date")}
            >
              <div className="flex items-center gap-2">
                Created At
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.map((notice) => (
            <tr key={notice._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm">{notice._id.slice(-6)}</td>
              <td className="px-6 py-4 text-sm">
                <div className="flex items-center gap-2">
                  <img 
                    src={notice.club.profilePicture} 
                    alt={notice.club.name} 
                    className="w-6 h-6 rounded-full"
                    onError={(e) => e.target.src = "/api/placeholder/30/30"} 
                  />
                  {notice.club.name}
                </div>
              </td>
              <td className="px-6 py-4 text-sm">{truncateText(notice.description)}</td>
              <td className="px-6 py-4 text-sm">
                <span className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  {notice.reportCount}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">{formatDate(notice.createdAt)}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => setSelectedNotice(notice)}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => deleteNotice(notice._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="px-6 py-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {[...Array(totalPages1)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500">{currentNotices.length} / {filteredNotices.length} Notices</div>
        </div>
      </div>
    </div>

    {/* Notice detail modal */}
    {selectedNotice && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
          <button
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setSelectedNotice(null)}
          >
            <X className="h-5 w-5" />
          </button>
          
          <h2 className="text-xl font-semibold mb-4">Notice Details</h2>
          
          <div className="flex items-center gap-3 mb-4">
            <img
              src={selectedNotice.club.profilePicture}
              alt={selectedNotice.club.name}
              className="w-10 h-10 rounded-full"
              onError={(e) => e.target.src = "/api/placeholder/40/40"}
            />
            <div>
              <p className="font-medium">{selectedNotice.club.name}</p>
              <p className="text-sm text-gray-500">{formatDate(selectedNotice.createdAt)}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="whitespace-pre-line">{selectedNotice.description}</p>
          </div>
          
          {selectedNotice.image.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Attached Images:</h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedNotice.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Notice image ${index + 1}`}
                    className="rounded-lg w-full h-auto"
                    onError={(e) => e.target.src = "/api/placeholder/300/200"}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">Reported {selectedNotice.reportCount} times</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
              onClick={() => deleteNotice(selectedNotice._id)}
            >
              <Trash2 className="h-4 w-4" />
              Delete Notice
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
    }

    </div>
  );
};

export default Admin;