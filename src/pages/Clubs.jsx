import { Search } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllClubs } from '../utils/api';
import Loading from '../components/Loading';
import { motion } from 'framer-motion';

const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await getAllClubs();
        setClubs(response.data.data.clubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  if (loading) return <Loading />;

  const filteredClubs = clubs.filter(club =>
    club.adminVerified && club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClubClick = (club) => {
    navigate('/clubs/club-page', { state: { clubData: club } });
  };

  return (
    <div className="p-4 sm:px-10 lg:px-24 bg-[#F5F7FA]">
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

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredClubs.map((club, index) => (
          <motion.div 
            key={index} 
            onClick={() => handleClubClick(club)} 
            className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-white h-48 w-full cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="h-24 w-24 mb-2 rounded-full border flex items-center justify-center overflow-hidden">
              <img
                src={club.profilePicture}
                alt={`${club.name} logo`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-center text-xs font-medium break-words leading-tight">
              {club.name}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Clubs;