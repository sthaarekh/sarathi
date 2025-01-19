import { Search } from 'lucide-react';
// import kuccLogo from '../assets/logos/lg-kucc.png';
// import eeeLogo from '../assets/logos/lg-eee.png';
// import amesLogo from '../assets/logos/lg-ames.png';
// import kucmLogo from '../assets/logos/lg-kucm.png';
// import fecamLogo from '../assets/logos/lg-fecam.png';
// import fopLogo from '../assets/logos/lg-fop.png';
// import geLogo from '../assets/logos/lg-ge.png';
// import kuarcLogo from '../assets/logos/lg-kuarc.png';
// import kubicLogo from '../assets/logos/lg-kubic.png';
// import kuconcLogo from '../assets/logos/lg-kuconc.png';
import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import SarathiContext from '../context/SarathiContext';
// import { getAllClubs, DeleteAClub } from '';
const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const context = useContext(SarathiContext);
  const {clubs, fetchClubs} = context;

  useEffect(() => {
    if (!clubs) {
      fetchClubs();
    }
    // eslint-disable-next-line
  }, [clubs]);

  // const clubs1 = [
  //   { name: 'Kathmandu University Computer Club(KUCC)', profilePicture: kuccLogo },
  //   { name: 'Society of Electrical and Electronic Engineering (SEEE)', profilePicture: eeeLogo },
  //   { name: 'Association of Mechanical Engineering Students (AMES)', profilePicture: amesLogo },
  //   { name: 'Computational Mathematics Club (KUCMC)', profilePicture: kucmLogo },
  //   { name: 'Forum for Environmental Conservation and Management (FECAM)', profilePicture: fecamLogo },
  //   { name: 'Forum for Pharmacy (FoP)', profilePicture: fopLogo },
  //   { name: 'Geomatics Engineering Society (GES)', profilePicture: geLogo },
  //   { name: 'Kathmandu University Architecture Students Club (KUARC)', profilePicture: kuarcLogo },
  //   { name: 'Kathmandu University Biotechnology Creatives (KUBiC)', profilePicture: kubicLogo },
  //   { name: 'Kathmandu University Circle of Noble Chemineers (KUCONC)', profilePicture: kuconcLogo },
  // ];

  const filteredClubs = clubs?.filter(club =>
    club.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:px-10 lg:px-24 bg-[#F5F7FA]">
      <div className="flex justify-end mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input type="text" placeholder="Search clubs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 w-96 border rounded-lg"/>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredClubs?.map((club, index) => (
          <div key={index} className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-white h-48 w-full">
            <div className="h-24 w-24 mb-2 rounded-full border flex items-center justify-center overflow-hidden">
              <img src={club?.profilePicture} alt={`${club?.name} logo`} className="h-full w-full object-cover"/>
            </div>
            <div className="text-center text-xs font-medium break-words leading-tight">
              {club?.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
