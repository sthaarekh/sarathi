import React, { useState } from 'react';
import { ArrowUpDown, Trash2, Check } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Kathmandu University Computer Club', status: 'Approved', email: 'a.kelley@gmail.com', time: '06/18/1978', questions: 3 },
    { id: 2, name: 'Jaiden Nixon', status: 'Approved', email: 'jaiden.n@gmail.com', time: '09/30/1963', questions: 1 },
    { id: 3, name: 'Ace Foley', status: 'Rejected', email: 'ace.fo@yahoo.com', time: '12/09/1985', questions: 0 },
    { id: 4, name: 'Nikolai Schmidt', status: 'Rejected', email: 'nikolai.schmidt1964@outlook.com', time: '03/22/1956', questions: 5 },
    { id: 5, name: 'Clayton Charles', status: 'Approved', email: 'me@clayton.com', time: '10/14/1971', questions: 2 },
    { id: 6, name: 'Prince Chen', status: 'Pending', email: 'prince.chen1997@gmail.com', time: '07/05/1992', questions: 4 },
    { id: 7, name: 'Reece Duran', status: 'Approved', email: 'reece@yahoo.com', time: '05/26/1980', questions: 1 },
    { id: 8, name: 'Anastasia Mcdaniel', status: 'Pending', email: 'anastasia.spring@mcdaniel12.com', time: '02/11/1968', questions: 0 },
    { id: 9, name: 'Melvin Boyle', status: 'Pending', email: 'Me.boyle@gmail.com', time: '08/03/1974', questions: 2 },
    { id: 10, name: 'Kailee Thomas', status: 'Rejected', email: 'Kailee.thomas@gmail.com', time: '11/28/1954', questions: 3 }
  ]);

  const [sortOrder, setSortOrder] = useState({
    status: 'asc',
    name: 'asc',
    date: 'asc'
  });

  const handleSuccess = () => toast.success('Well Done! The new club record is verified successfully.');
  const handleError = () => toast.error('Something went wrong!! Please try again.');

  // Function to update customer status to 'Approved'
  const handleStatusChange = (id) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === id ? { ...customer, status: 'Approved' } : customer
    );
    setCustomers(updatedCustomers);
    toast.success('Well Done! The new club record is verified successfully.');
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handleError}>Error</button>
        <button onClick={handleSuccess}>Success</button>
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
            {customers.map((customer) => (
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
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full"
                        onClick={() => handleStatusChange(customer.id)}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-full">
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
              <button className="px-3 py-1 border rounded bg-gray-50 text-gray-400" disabled>
                1
              </button>
              <button className="px-3 py-1 hover:bg-gray-50 rounded">2</button>
              <button className="px-3 py-1 hover:bg-gray-50 rounded">3</button>
              <button className="px-3 py-1 hover:bg-gray-50 rounded">4</button>
              <button className="px-3 py-1 hover:bg-gray-50 rounded">10</button>
            </div>
            <div className="text-sm text-gray-500">/Page</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
