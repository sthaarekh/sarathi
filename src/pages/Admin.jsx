import React, { useState, useEffect } from "react";
import { ArrowUpDown, Trash2, Check, X, Search } from "lucide-react";
import { toast } from "sonner";
import { getAllClubs } from '../utils/api';
import Loading from '../components/Loading';

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [clubs, setClubs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState({
    status: "asc",
    name: "asc",
    date: "asc",
  });
  const [expandedClub, setExpandedClub] = useState(null);

  // Fetch clubs data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllClubs();
        setClubs(response.data.data.clubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        toast.error("Failed to fetch clubs data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to change club status to 'Approved'
  const approveStatusChange = async (id) => {
    try {
      // Assuming you have an API endpoint to update status
      // await updateClubStatus(id, "Approved");
      const updatedClubs = clubs.map((club) =>
        club._id === id ? { ...club, adminVerified: true } : club
      );
      setClubs(updatedClubs);
      toast.success("The new club record is verified successfully.");
    } catch (error) {
      toast.error("Failed to approve club");
    }
  };

  // Function to change club status to 'Rejected'
  const rejectStatusChange = async (id) => {
    try {
      // await updateClubStatus(id, "Rejected");
      const updatedClubs = clubs.map((club) =>
        club._id === id ? { ...club, adminVerified: false } : club
      );
      setClubs(updatedClubs);
      toast.error("The club is rejected from verification.");
    } catch (error) {
      toast.error("Failed to reject club");
    }
  };

  // Function to delete club
  const deleteRequest = async (id) => {
    try {
      // await deleteClub(id);
      const updatedClubs = clubs.filter((club) => club._id !== id);
      setClubs(updatedClubs);
      toast.success("The club record has been deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete club");
    }
  };

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

  // Toggle questions visibility
  const toggleQuestions = (clubId) => {
    setExpandedClub(expandedClub === clubId ? null : clubId);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-center space-x-10 items-center mb-4">
        <button>Clubs</button>
        <button>Notices</button>
      </div>
      <div className="flex justify-end mb-6">
        <div className="flex justify-end px-4 py-6">
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
      </div>

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
                      className="px-3 py-1 rounded-full text-xs bg-blue-100 text-gray-800"
                      onClick={() => toggleQuestions(club._id)}
                    >
                      View
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
                          <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={() => rejectStatusChange(club._id)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
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
                      <div className="rounded-lg max-h-[150px] overflow-y-auto">
                        {club.questions && club.questions.length > 0 ? (
                          club.questions.map((question, index) => (
                            <div key={index} className="mb-2 px-20 font-sans text-left text-sm text-gray-700">
                              Q. {question}
                            </div>
                          ))
                        ) : (
                          <div className="mb-2 px-20 font-sans text-left text-sm text-gray-700">
                            No questions available.
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
    </div>
  );
};

export default Admin;