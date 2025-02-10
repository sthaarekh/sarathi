import React, { useState, useContext, useEffect } from 'react';
import { ArrowUpDown, Trash2, Check, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import SarathiContext from '../context/SarathiContext';
import {getAllClubs, getAllNotices} from '../utils/api'
import Loading from '../components/Loading';

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubs = await getAllClubs();
        setClubs(clubs.data.data.clubs);

      } catch (error) {
        console.error("Error fetching clubs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  });

  console.log(clubs)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [sortOrder, setSortOrder] = useState({
    status: 'asc',
    name: 'asc',
    date: 'asc'
  });

  //TOast code
  const handleSuccess = () => toast.success('Well Done! The new club record is verified successfully.');
  const handleError = () => toast.error('Something went wrong!! Please try again.');

  // Function to update club status to 'Approved'
  const approveStatusChange = (id) => {
    const updatedclubs = clubs.map((club) =>
      club._id === id ? { ...club, status: 'Approved' } : club
    );
    setclubs(updatedclubs);
    toast.success('The new club record is verified successfully.');
  };

  // Function to update club status to 'Rejected'
  const rejectStatusChange = (id) => {
    const updatedclubs = clubs.map((club) =>
      club.id === id ? { ...club, status: 'Rejected' } : club
    );
    setclubs(updatedclubs);
    toast.error('The club is rejected from verification.');
  };

  const deleteRequest = (id) => {
    const updatedclubs = clubs.filter((club) => club.id !== id);
    setclubs(updatedclubs);
    toast.success('The club record has been deleted successfully.');
  };

  const sortClubs = (column) => {
    let sortedClubs = [...clubs];
    let sortDirection = sortOrder[column] === 'asc' ? 'desc' : 'asc';
  
    sortedClubs.sort((a, b) => {
      if (column === 'status') {
        return sortDirection === 'asc'
          ? (a.adminVerified ? 1 : -1)
          : (a.adminVerified ? -1 : 1);
      } else if (column === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (column === 'date') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDirection === 'asc'
          ? dateA - dateB
          : dateB - dateA;
      }
      return 0;
    });
  
    setSortOrder((prev) => ({ ...prev, [column]: sortDirection }));
    setClubs(sortedClubs);
  };
  
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const indexOfLastclub = currentPage * itemsPerPage;
  const indexOfFirstclub = indexOfLastclub - itemsPerPage;
  const currentclubs = clubs.slice(indexOfFirstclub, indexOfLastclub);

  const totalPages = Math.ceil(clubs.length / itemsPerPage);

  if (loading) return <Loading />;
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-center space-x-10 items-center mb-4">
        <button>Clubs</button>
        <button>Notices</button>
      </div>
      <div className="flex justify-end mb-6">
        <div className="flex justify-end px-4 py-6">
          <input type="search" placeholder="Search..." className="px-4 py-2 border rounded-lg" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#id</th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => sortClubs('name')}
              >
                <div className="flex items-center gap-2">
                  Full Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => sortClubs('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">E-Mail</th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => sortClubs('date')}
              >
                <div className="flex items-center gap-2">
                  Created At
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Questions</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{club._id}</td>
                <td className="px-6 py-4 text-sm">{club.name}</td>
                <td className="px-6 py-4">
                  <span  className={`px-3 py-1 rounded-full text-xs ${
                      club.adminVerified
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                    {club.adminVerified ? 'Approved' : 'Rejected'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{club.contact.email}</td>
                <td className="px-6 py-4 text-sm">{club.createdAt}</td>
                <td className="px-6 py-4 text-sm">{club.questions}</td>
                <td className="px-6 py-4">
                <div className="flex gap-2">
                {club.status === 'Pending' && (
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => approveStatusChange(club.id)}>
                      <Check className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => rejectStatusChange(club.id)}>
                      <X className="h-4 w-4" />
                    </button>
                    </div>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => deleteRequest(club.id)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'}`}
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
