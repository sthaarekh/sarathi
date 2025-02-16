import React, { useEffect, useRef, useState } from 'react';
import { X, Upload } from 'lucide-react';
import { getAllClubs, updateClubDetails } from "../utils/api";

const Edit = ({ id, onClose }) => {
  const [club, setClub] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    description: '',
    phone: '',
    email: '',
    facebook: '',
    twitter: '',
    insta: '',
    presidentName: '',
    vicePresidentName: '',
    secretaryName: '',
    presidentDescription: '',
    vicePresidentDescription: '',
    secretaryDescription: '',
    formLink: '',
    profilePic: null,
    coverPic: null,
    presidentPic: null,
    vicePresidentPic: null,
    secretaryPic: null
  });
  
  const roles = [
    { key: 'president', label: 'President' },
    { key: 'vicePresident', label: 'Vice-President' },
    { key: 'secretary', label: 'Secretary' }
  ];
  
  const contact = [
    { key: 'phone', label: 'Contact No', type: 'tel' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'facebook', label: 'Facebook', type: 'text' },
    { key: 'twitter', label: 'Twitter', type: 'text' },
    { key: 'insta', label: 'Instagram', type: 'text' },
  ];

  const fileInputRefs = {
    Profile: useRef(null),
    Cover: useRef(null),
    President: useRef(null),
    'Vice-President': useRef(null),
    Secretary: useRef(null)
  };

  const [imagePreviews, setImagePreviews] = useState({
    Profile: '',
    Cover: '',
    President: '',
    'Vice-President': '',
    Secretary: ''
  });
  
  const handleFileSelect = (role, e) => {
    const file = e.target.files[0];
    if (file) {
      // Create object URL for preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews(prevState => ({
        ...prevState,
        [role]: previewUrl
      }));
      
      // Map role to formData key
      const formDataKey = {
        'Profile': 'profilePic',
        'Cover': 'coverPic',
        'President': 'presidentPic',
        'Vice-President': 'vicePresidentPic',
        'Secretary': 'secretaryPic'
      }[role];
      
      // Log the file being set
      console.log(`Setting ${formDataKey}:`, file);
      
      setFormData(prevFormData => ({
        ...prevFormData,
        [formDataKey]: file
      }));
    }
  };
 // Modified handleSubmit function
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    const submitData = new FormData();

    // Basic club information
    submitData.append('name', formData.clubName || '');
    submitData.append('department', formData.department || '');
    submitData.append('description', formData.description || '');
    submitData.append('formLink', formData.memberFormLink || '');

  
    // Append contact information as individual fields
    submitData.append('phone', formData.phone || '');
    submitData.append('email', formData.email || '');
    submitData.append('facebook', formData.facebook || '');
    submitData.append('twitter', formData.twitter || '');
    submitData.append('insta', formData.insta || '');

    // Team information
    const ourTeam = {
      firstPerson: {
        name: formData.presidentName || '',
        post: 'President',
        description: formData.presidentDescription || '',
        image: formData.presidentPic instanceof File ? '' : club.ourTeam?.firstPerson?.image || ''
      },
      secondPerson: {
        name: formData.vicePresidentName || '',
        post: 'Vice President',
        description: formData.vicePresidentDescription || '',
        image: formData.vicePresidentPic instanceof File ? '' : club.ourTeam?.secondPerson?.image || ''
      },
      thirdPerson: {
        name: formData.secretaryName || '',
        post: 'Secretary',
        description: formData.secretaryDescription || '',
        image: formData.secretaryPic instanceof File ? '' : club.ourTeam?.thirdPerson?.image || ''
      }
    };
    submitData.append('ourTeam', JSON.stringify(ourTeam));

    // Images - with validation and logging
    const imageFields = [
      { key: 'profilePicture', data: formData.profilePic, existing: club.profilePicture },
      { key: 'coverPicture', data: formData.coverPic, existing: club.coverPicture },
      { key: 'firstPersonImage', data: formData.presidentPic, existing: club.ourTeam?.firstPerson?.image },
      { key: 'secondPersonImage', data: formData.vicePresidentPic, existing: club.ourTeam?.secondPerson?.image },
      { key: 'thirdPersonImage', data: formData.secretaryPic, existing: club.ourTeam?.thirdPerson?.image }
    ];

    imageFields.forEach(({ key, data, existing }) => {
      if (data && data instanceof File) {
        console.log(`Appending ${key}:`, data);
        submitData.append(key, data);
      } else {
        console.log(`Using existing image for ${key}`);
        submitData.append(key, existing);
      }
    });

    const response = await updateClubDetails(id, submitData);
    if (response.data) {
     console.log(response.data)
     window.location.reload();
    }
  } catch (error) {
    console.error('Error updating club details:', error);
    setError('Failed to update club details. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubs = await getAllClubs();
        const myClub = clubs.data.data.clubs.find(
          (club) => String(club._id) === String(id)
        );
        setClub(myClub);

        if (myClub) {
          setTeamMembers(myClub.ourTeam);
          // Set form data
          setFormData(prevState => ({
            ...prevState,
            clubName: myClub.name || '',
            department: myClub.department || '',
            email: myClub.contact?.email || '',
            phone: myClub.contact?.phone || '',
            facebook: myClub.contact?.facebook || '',
            twitter: myClub.contact?.twitter || '',
            insta: myClub.contact?.insta || '',
            description: myClub.description || '',
            memberFormLink: myClub.formLink || '',
            presidentName: myClub.ourTeam?.firstPerson?.name || '',
            presidentDescription: myClub.ourTeam?.firstPerson?.description || '',
            vicePresidentName: myClub.ourTeam?.secondPerson?.name || '',
            vicePresidentDescription: myClub.ourTeam?.secondPerson?.description || '',
            secretaryName: myClub.ourTeam?.thirdPerson?.name || '',
            secretaryDescription: myClub.ourTeam?.thirdPerson?.description || '',
          }));

          // Set image previews for existing images
          setImagePreviews(prevState => ({
            ...prevState,
            Profile: myClub.profilePicture || '',
            Cover: myClub.coverPicture || '',
            President: myClub.ourTeam?.firstPerson?.image || '',
            'Vice-President': myClub.ourTeam?.secondPerson?.image || '',
            Secretary: myClub.ourTeam?.thirdPerson?.image || ''
          }));
        }
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchData();
  }, [id]);

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
            
            {/* Club Profile and Cover Photos */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {['Profile', 'Cover'].map((type) => (
                <div key={type} className="border-2 border-dashed rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{type} Photo</label>
                  <input
                    type="file"
                    ref={fileInputRefs[type]}
                    onChange={(e) => handleFileSelect(type, e)}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRefs[type].current?.click()}
                    className="w-full h-20 bg-gray-50 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload {type} Photo</span>
                  </button>
                  
                  {imagePreviews[type] && (
                    <div className="mt-2">
                      <img
                        src={imagePreviews[type]}
                        alt={`${type} preview`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Rest of the form fields */}
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
            
            {contact.map(({ key, label, type }) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  className="w-full p-2 border rounded-md"
                  value={formData[key] || ''}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              </div>
            ))}
            
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
            
            {roles.map(({ key, label }) => (
              <div key={key} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{label} Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={formData[`${key}Name`]}
                    onChange={(e) => setFormData({
                      ...formData,
                      [`${key}Name`]: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{label} Description</label>
                  <textarea
                    rows={3}
                    className="w-full p-2 border rounded-md"
                    value={formData[`${key}Description`]}
                    onChange={(e) => setFormData({
                      ...formData,
                      [`${key}Description`]: e.target.value
                    })}
                  />
                </div>
              </div>
            ))}
            
            {/* Team Member Photos */}
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

                  {imagePreviews[role] && (
                    <div className="mt-2">
                      <img
                        src={imagePreviews[role]}
                        alt={`${role} preview`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>
                  )}
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