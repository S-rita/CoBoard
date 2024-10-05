import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-basegreen w-full flex flex-col py-8">
      <div className="w-full flex flex-col lg:flex-row mt-4 px-8">
        <div className="lg:w-4/6 flex flex-col lg:flex-row border-r-4 border-white py-4">
          <div className="lg:w-1/3 flex flex-col px-6 mb-6 lg:mb-0">
            <p className="text-white text-2xl font-bold">About Us</p>
            <a href="https://www.se.kmitl.ac.th/about" target="_blank" rel="noopener noreferrer" className="text-white text-lg">About</a>
            <a href="https://www.se.kmitl.ac.th/lecturers" target="_blank" rel="noopener noreferrer" className="text-white text-lg">Lecturers</a>
          </div>
          <div className="lg:w-1/3 flex flex-col px-6 mb-6 lg:mb-0">
            <p className="text-white text-2xl font-bold">Program</p>
            <a href="https://www.se.kmitl.ac.th/program/6" target="_blank" rel="noopener noreferrer" className="text-white text-lg">Software Engineering 2024</a>
            <a href="https://www.se.kmitl.ac.th/program/3" target="_blank" rel="noopener noreferrer" className="text-white text-lg">KMILT x Glasgow</a>
            <a href="https://www.se.kmitl.ac.th/program/7" target="_blank" rel="noopener noreferrer" className="text-white text-lg">KMITL x Queensland</a>
            <a href="https://www.se.kmitl.ac.th/program/4" target="_blank" rel="noopener noreferrer" className="text-white text-lg">Exchange Study</a>
            <a href="https://www.se.kmitl.ac.th/program/5" target="_blank" rel="noopener noreferrer" className="text-white text-lg">Internships</a>
          </div>
          <div className="lg:w-1/3 flex flex-col px-6">
            <a href="https://www.se.kmitl.ac.th/admissions" target="_blank" rel="noopener noreferrer" className="text-white text-2xl font-bold">Admission</a>
            <a href="https://www.se.kmitl.ac.th/research" target="_blank" rel="noopener noreferrer" className="text-white text-2xl font-bold">Research</a>
            <a href="https://www.se.kmitl.ac.th/news" target="_blank" rel="noopener noreferrer" className="text-white text-2xl font-bold">News</a>
            <a href="https://www.se.kmitl.ac.th/event" target="_blank" rel="noopener noreferrer" className="text-white text-2xl font-bold">Event</a>
            <div className="flex flex-row space-x-4 mt-4">
              <span className="text-white">📘</span>
              <span className="text-white">📺</span>
              <span className="text-white">💼</span>
              <span className="text-white">📸</span>
            </div>
          </div>
        </div>
        <div className="lg:w-2/6 flex flex-col px-6 py-4">
          <p className="text-white">Some text blah blah blah</p>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between items-center px-8 mt-4">
        <div className="flex flex-col text-center lg:text-left">
          <p className="text-white">Privacy Policy | Policies</p>
          <p className="text-white">{'\u00A9'} 2024 Software Engineering, King Mongkut's Institute of Technology Ladkrabang</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
