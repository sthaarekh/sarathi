import React from 'react'
import img from '../assets/Illustration.svg'
import kucc from '../assets/logos/lg-kucc.png';
import kucec from '../assets/logos/lg-kucec.png';
import kurc from '../assets/logos/lg-kurc.png';
import kuleo from '../assets/logos/lg-kuleo.png';
import kuyrcc from '../assets/logos/lg-kuyrcc.png';
import icon1 from '../assets/icons/icon1.png';
import icon2 from '../assets/icons/icon2.png';
import icon3 from '../assets/icons/icon3.png';
import icon4 from '../assets/icons/icon4.png';
import icon5 from '../assets/icons/icon5.png';
import icon6 from '../assets/icons/icon6.png';
import icon7 from '../assets/icons/icon7.png';
const Home = () => {
    const clubLogos = [
      { id: 1, src: kucc, alt: "Club 1" },
      { id: 2, src: kuleo, alt: "Club 2" },
      { id: 3, src: kurc, alt: "Club 3" },
      { id: 4, src: kucec, alt: "Club 4" },
      { id: 5, src: kuyrcc, alt: "Club 5" },
    ];  
    const cardData = [
      {
        id: 1,
        icon: icon1,
        alt: "Individuals",
        title: "Individuals",
        description:
          "Explore and discover university clubs based on your interests, activities, and events.",
      },
      {
        id: 2,
        icon: icon2,
        alt: "University Authority",
        title: "University Authority",
        description:
          "Manage club registrations, approve new clubs, and monitor club activities.",
      },
      {
        id: 3,
        icon: icon3,
        alt: "Clubs And Groups",
        title: "Clubs And Groups",
        description:
          "Post updates, events, and announcements, manage the club page, and engage with members.",
      },
    ];
    const stats = [
      {
        icon: icon5,
        number: "400+",
        label: "Members"
      },
      {
        icon: icon6,
        number: "26",
        label: "Clubs"
      },
      {
        icon: icon7,
        number: "1,000+",
        label: "Event Bookings"
      },
    ]
  return (
    <div className='showarea'>
      <div className=" bg-[#F5F7FA] pt-[50px] flex items-center justify-center lg:px-16">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          {/* Text Section */}
          <div className="text-center md:text-left md:w-1/2 mx-4 md:mx-[50px]">
            <h1 className="text-[32px] md:text-[30px] lg:text-[48px] md:w-auto font-semibold text-[#4D4D4D]">
              Manage your entire club in a single system
            </h1>
            <p className="text-gray-500 mb-6 text-sm md:text-base">
              A one stop platform for all your club needs.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
              Register
            </button>
          </div>
    
          {/* Image Section */}
          <div className="flex justify-center md:w-1/2 mt-8 md:mt-0">
            <img
              src={img}
              alt="Club Management Illustration"
              className="w-full max-w-[300px] md:max-w-[200px] lg:max-w-[350px]"
            />
          </div>
        </div>
      </div>  

      <div className="bg-white px-3 py-6 lg:px-6 ;g:py-12">
          {/* Our Clubs Section */}
          <section className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl text-[#4D4D4D] font-semibold">Our Clubs</h2>
            <p className="text-[#717171] text-sm mt-2">We have been working with the popular clubs</p>
            <div className="flex flex-wrap justify-center px-10 mt-8 gap-6 sm:px-0 sm:gap-10 md:gap-20">
              {clubLogos.map((logo) => (
                <img key={logo.id} src={logo.src} alt={logo.alt} className="h-14 sm:h-20 md:h-24" />
              ))}
            </div>
          </section>
    
    
          {/* Who is Sarathi Section */}
          <section className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl text-[#4D4D4D] font-semibold">Who is Sarathi suitable for?</h2>
            <p className="text-gray-500 text-sm mt-2">People who are trying to achieve the following</p>
    
            <div className="mt-8 px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-6">
              {cardData.map((card) => (
                <div key={card.id} className="bg-white md:mx-4 lg:mx-6 shadow-md rounded-lg p-6">
                  <div className="flex justify-center mb-4">
                    <img src={card.icon} alt={card.alt} className="h-10 md:h-12" />
                  </div>
                  <h3 className="text-2xl xl:text-3xl text-[#4D4D4D] font-medium">{card.title}</h3>
                  <p className="text-gray-500 text-sm mt-2">{card.description}</p>
                </div>
              ))}
            </div>
          </section>
    
          <section className="flex flex-col-reverse px-6 sm:px-12 lg:px-16 lg:flex-row items-center gap-8 lg:pb-8">
            {/* Text Section */}
            <div className="lg:w-1/2 flex justify-center">
              <img src={icon4} alt="Sarathi Illustration" className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[450px] h-auto"/>
            </div>
            <div className="lg:w-1/2 lg:mx-6">
              <h2 className="text-xl md:text-3xl text-[#4D4D4D] font-semibold mb-4">What is Sarathi?</h2>
              <p className="text-gray-500 text-sm md:text-md lg:pr-16">
                Sarathi is a centralized platform that allows students to easily discover, explore, and
                connect with various university clubs based on their interests, activities, and events.
                It simplifies the process of finding and joining clubs, all in one place. It serves as a
                one-stop platform for all club activities and makes the process seamless for club
                seekers, club managers, and university administration.
              </p>
            </div>
            {/* Illustration */}
            
          </section>
      </div>
      
      <div className="bg-gray-50 py-16 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#4D4D4D] mb-4">
              Helping people out
            </h2>
            <p className="text-gray-500 text-sm">
              We reached here with our hard work and dedication
            </p>
          </div>
          
          <div className="grid grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center space-x-4">
                <img src={stat.icon} alt="" className="w-8 h-auto lg:w-12 text-green-500"/>
                <div className="text-left">
                  <p className="text-2xl lg:text-3xl font-bold text-gray-800">
                    {stat.number}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default Home
