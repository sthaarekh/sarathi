import React, { useState } from 'react';
import { ArrowUpDown, Trash2, Check, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const Admin = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Kathmandu University Computer Club', status: 'Approved', email: 'kucc@gmail.com', time: '06/18/2024', questions: 3 },
    { id: 2, name: 'Association of Mechanical Engineering Students', status: 'Approved', email: 'ames@gmail.com', time: '09/30/2023', questions: 1 },
    { id: 3, name: 'Kathmandu Universtiy Robotics Club', status: 'Rejected', email: 'kurc@gmail.com', time: '12/09/2021', questions: 0 },
    { id: 4, name: 'AIESEC', status: 'Rejected', email: 'aiesec@gmail.com', time: '03/22/2024', questions: 5 },
    { id: 5, name: 'Kathmandu University Youth Red Cross Society', status: 'Approved', email: 'kuyrc@gmail.com', time: '10/14/2025', questions: 2 },
    { id: 6, name: 'Geomatics Engineering Society', status: 'Pending', email: 'ges@gmail.com', time: '07/05/2025', questions: 4 },
    { id: 7, name: 'Youth For Change - Kathmandu University', status: 'Approved', email: 'yfcku@gmail.com', time: '05/26/2024', questions: 1 },
    { id: 8, name: 'Leo Club of Kathmandu University', status: 'Pending', email: 'leoclub@gmail.com', time: '02/11/2022', questions: 0 },
    { id: 9, name: 'Forum for Pharmacy', status: 'Pending', email: 'fop@gmail.com', time: '08/03/2024', questions: 2 },
    { id: 10, name: 'Computational Mathematics Club', status: 'Rejected', email: 'cmc@gmail.com', time: '11/28/2025', questions: 3 },
    { id: 11, name: 'KU Indoors', status: 'Approved', email: 'kuindoors@gmail.com', time: '01/05/2024', questions: 2 },
    { id: 12, name: 'Society of Electrical and Electronics Engineers', status: 'Pending', email: 'soee@gmail.com', time: '03/12/2024', questions: 1 },
    { id: 13, name: 'Natural and Social Concern Society', status: 'Approved', email: 'nscs@gmail.com', time: '07/09/2024', questions: 4 },
    { id: 14, name: 'Society of Business Information Students', status: 'Rejected', email: 'sobis@gmail.com', time: '12/11/2025', questions: 3 },
    { id: 15, name: 'Kathmandu University Civil Engineering Club', status: 'Pending', email: 'kucec@gmail.com', time: '04/14/2024', questions: 0 },
    { id: 16, name: 'Kathmandu University Architectures Club', status: 'Approved', email: 'kuac@gmail.com', time: '09/30/2024', questions: 1 },
    { id: 17, name: 'Kathmandu University Biotechnology Creatives', status: 'Rejected', email: 'kubc@gmail.com', time: '05/02/2025', questions: 5 },
    { id: 18, name: 'Rotary Club of Kathmandu University', status: 'Pending', email: 'rcku@gmail.com', time: '02/15/2024', questions: 2 },
    { id: 19, name: 'Green Club of Thoughts', status: 'Approved', email: 'roboticsclub@gmail.com', time: '11/15/2024', questions: 0 },
    { id: 20, name: 'Kathmandu University Circle of Noble Chemineers', status: 'Pending', email: 'kuconc@gmail.com', time: '10/10/2025', questions: 4 },
    { id: 21, name: 'Eastern Society of Kathmandu University', status: 'Pending', email: 'esku@gmail.com', time: '10/10/2025', questions: 4 }
  ]);

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

  // Function to update customer status to 'Approved'
  const approveStatusChange = (id) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === id ? { ...customer, status: 'Approved' } : customer
    );
    setCustomers(updatedCustomers);
    toast.success('The new club record is verified successfully.');
  };

  // Function to update customer status to 'Rejected'
  const rejectStatusChange = (id) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === id ? { ...customer, status: 'Rejected' } : customer
    );
    setCustomers(updatedCustomers);
    toast.error('The club is rejected from verification.');
  };

  const deleteRequest = (id) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(updatedCustomers);
    toast.success('The club record has been deleted successfully.');
  };

  const sortCustomers = (column) => {
    const sortedCustomers = [...customers];
    let sortDirection = sortOrder[column] === 'asc' ? 'desc' : 'asc';

    if (column === 'status') {
      sortedCustomers.sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (a.status !== 'Pending' && b.status === 'Pending') return 1;
        return a.status.localeCompare(b.status);
      });
    } else if (column === 'name') {
      sortedCustomers.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortDirection === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
    } else if (column === 'date') {
      sortedCustomers.sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    setSortOrder({ ...sortOrder, [column]: sortDirection });
    setCustomers(sortedCustomers);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => sortCustomers('name')}
              >
                <div className="flex items-center gap-2">
                  Full Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => sortCustomers('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">E-Mail</th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => sortCustomers('date')}
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
            {currentCustomers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{customer.id}</td>
                <td className="px-6 py-4 text-sm">{customer.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      customer.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : customer.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{customer.email}</td>
                <td className="px-6 py-4 text-sm">{customer.time}</td>
                <td className="px-6 py-4 text-sm">{customer.questions}</td>
                <td className="px-6 py-4">
                <div className="flex gap-2">
                {customer.status === 'Pending' && (
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => approveStatusChange(customer.id)}>
                      <Check className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => rejectStatusChange(customer.id)}>
                      <X className="h-4 w-4" />
                    </button>
                    </div>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => deleteRequest(customer.id)}>
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
