import React, { useRef, useState } from 'react';
import { X, Upload } from 'lucide-react';

const Edit = ({ id, onClose }) => {
  const [formData, setFormData] = useState({
    clubName: '',
    department: '',
    email: '',
    contactNo: '',
    description: '',
    memberFormLink: '',
    presidentName: '',
    presidentDescription: '',
    vicePresidentName: '',
    vicePresidentDescription: '',
    secretaryName: '',
    secretaryDescription: ''
  });

  const fileInputRefs = {
    President: useRef(null),
    'Vice-President': useRef(null),
    Secretary: useRef(null)
  };

  const handleFileSelect = (role, e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(`${role} photo selected:`, file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[90vh] relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={24} />
        </button>
        
        <div className="h-full overflow-y-auto scrollbar-hide">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-6">Club Details</h2>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Club Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.clubName}
                onChange={(e) => setFormData({...formData, clubName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contact No.</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md"
                value={formData.contactNo}
                onChange={(e) => setFormData({...formData, contactNo: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={4}
                className="w-full p-2 border rounded-md"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Member Form Link</label>
              <input
                type="url"
                className="w-full p-2 border rounded-md"
                value={formData.memberFormLink}
                onChange={(e) => setFormData({...formData, memberFormLink: e.target.value})}
              />
            </div>
            
            {['President', 'Vice-President', 'Secretary'].map((role) => (
              <div key={role} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{role} Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={formData[`${role.toLowerCase().replace('-', '')}Name`]}
                    onChange={(e) => setFormData({
                      ...formData,
                      [`${role.toLowerCase().replace('-', '')}Name`]: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{role} Description</label>
                  <textarea
                    rows={3}
                    className="w-full p-2 border rounded-md"
                    value={formData[`${role.toLowerCase().replace('-', '')}Description`]}
                    onChange={(e) => setFormData({
                      ...formData,
                      [`${role.toLowerCase().replace('-', '')}Description`]: e.target.value
                    })}
                  />
                </div>
              </div>
            ))}
            
            <div className="grid grid-cols-3 gap-4">
              {['President', 'Vice-President', 'Secretary'].map((role) => (
                <div key={role} className="border-2 border-dashed rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{role} Photo</label>
                  <input
                    type="file"
                    ref={fileInputRefs[role]}
                    onChange={(e) => handleFileSelect(role, e)}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRefs[role].current?.click()}
                    className="w-full h-20 bg-gray-50 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload Photo</span>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;