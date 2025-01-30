import React from 'react';
import { ArrowUpDown, MoreHorizontal, ArrowRight, Pencil, Trash2 } from 'lucide-react';

const CustomerManagement = () => {
  const customers = [
    { id: 1, name: ' Kathmandu University Computer Club', status: 'Approved', email: 'a.kelley@gmail.com', dob: '06/18/1978', questions: 3 },
    { id: 2, name: 'Jaiden Nixon', status: 'Approved', email: 'jaiden.n@gmail.com', dob: '09/30/1963', questions: 1 },
    { id: 3, name: 'Ace Foley', status: 'Blocked', email: 'ace.fo@yahoo.com', dob: '12/09/1985', questions: 0 },
    { id: 4, name: 'Nikolai Schmidt', status: 'Rejected', email: 'nikolai.schmidt1964@outlook.com', dob: '03/22/1956', questions: 5 },
    { id: 5, name: 'Clayton Charles', status: 'Approved', email: 'me@clayton.com', dob: '10/14/1971', questions: 2 },
    { id: 6, name: 'Prince Chen', status: 'Approved', email: 'prince.chen1997@gmail.com', dob: '07/05/1992', questions: 4 },
    { id: 7, name: 'Reece Duran', status: 'Approved', email: 'reece@yahoo.com', dob: '05/26/1980', questions: 1 },
    { id: 8, name: 'Anastasia Mcdaniel', status: 'Rejected', email: 'anastasia.spring@mcdaniel12.com', dob: '02/11/1968', questions: 0 },
    { id: 9, name: 'Melvin Boyle', status: 'Blocked', email: 'Me.boyle@gmail.com', dob: '08/03/1974', questions: 2 },
    { id: 10, name: 'Kailee Thomas', status: 'Blocked', email: 'Kailee.thomas@gmail.com', dob: '11/28/1954', questions: 3 }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        
        <div className="flex justify-end px-4 py-6">
          <input
            type="search"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  Full Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  E-Mail
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  Date of Birth
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  Questions
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{customer.id}</td>
                <td className="px-6 py-4 text-sm">{customer.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    customer.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    customer.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{customer.email}</td>
                <td className="px-6 py-4 text-sm">{customer.dob}</td>
                <td className="px-6 py-4 text-sm">{customer.questions}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Pencil className="h-4 w-4" />
                    </button>
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
              <button className="px-3 py-1 border rounded bg-gray-50 text-gray-400" disabled>1</button>
              <button className="px-3 py-1 hover:bg-gray-50 rounded">2</button>
              <button className="px-3 py-1 hover:bg-gray-50 rounded">3</button>
              <button className="px-3 py-1 hover:bg-gray-50 rounded">4</button>
              <button className="px-3 py-1 hover:bg-gray-50 rounded">10</button>
            </div>
            <div className="text-sm text-gray-500">
              /Page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;