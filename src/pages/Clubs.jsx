import { useState } from 'react';
import { Search } from 'lucide-react';
import kuccLogo from '../assets/logos/lg-kucc.png';
import eeeLogo from '../assets/logos/lg-eee.png';
import amesLogo from '../assets/logos/lg-ames.png';
import kucmLogo from '../assets/logos/lg-kucm.png';
import fecamLogo from '../assets/logos/lg-fecam.png';
import fopLogo from '../assets/logos/lg-fop.png';
import geLogo from '../assets/logos/lg-ge.png';
import kuarcLogo from '../assets/logos/lg-kuarc.png';
import kubicLogo from '../assets/logos/lg-kubic.png';
import kuconcLogo from '../assets/logos/lg-kuconc.png';

const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const clubs = [
    { name: 'Kathmandu University Computer Club(KUCC)', logo: kuccLogo },
    { name: 'Society of Electrical and Electronic Engineering (SEEE)', logo: eeeLogo },
    { name: 'Association of Mechanical Engineering Students (AMES)', logo: amesLogo },
    { name: 'Computational Mathematics Club (KUCMC)', logo: kucmLogo },
    { name: 'Forum for Environmental Conservation and Management (FECAM)', logo: fecamLogo },
    { name: 'Forum for Pharmacy (FoP)', logo: fopLogo },
    { name: 'Geomatics Engineering Society (GES)', logo: geLogo },
    { name: 'Kathmandu University Architecture Students Club (KUARC)', logo: kuarcLogo },
    { name: 'Kathmandu University Biotechnology Creatives (KUBiC)', logo: kubicLogo },
    { name: 'Kathmandu University Circle of Noble Chemineers (KUCONC)', logo: kuconcLogo },
  ];

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 ">
      <div className="flex md:justify-end mb-6">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {filteredClubs.map((club, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-white h-48 w-full"
          >
            <div className="h-24 w-24 mb-2 rounded-full border flex items-center justify-center overflow-hidden">
              <img
                src={club.logo}
                alt={`${club.name} logo`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-center text-xs font-medium break-words leading-tight">
              {club.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
