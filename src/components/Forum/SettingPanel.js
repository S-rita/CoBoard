import React, { useEffect, useRef, useState } from 'react';
import HeadingSection from './HeadingSection';
import AppearanceSection from './AppearanceSection';
import AccessSection from './AccessSection';
import TagSection from './TagSection';

const SettingPanel = ({ isVisible, closeSettingPanel }) => {
  const [activeSection, setActiveSection] = useState('heading');
  
  // Create references for each section and buttons
  const panelRef = useRef(null);
  const headingRef = useRef(null);
  const appearanceRef = useRef(null);
  const accessRef = useRef(null);
  const tagsRef = useRef(null);
  const underlineRef = useRef(null);
  const buttonsRef = useRef([]);

  const scrollToSection = (sectionRef) => {
    const headerHeight = 176;
    const panelElement = document.getElementById('settingpanel');
    const sectionPosition = sectionRef.current.offsetTop;
    const offsetPosition = sectionPosition - headerHeight;

    panelElement.querySelector('.overflow-y-scroll').scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  const setUnderlinePosition = (index) => {
    const button = buttonsRef.current[index];
    if (button && underlineRef.current) {
      const buttonRect = button.getBoundingClientRect();
      underlineRef.current.style.width = `${buttonRect.width}px`;
      underlineRef.current.style.left = `${button.offsetLeft}px`;
    }
  };

  useEffect(() => {
    setUnderlinePosition(0); // Set underline for the first button on load
  }, []);

  if (!isVisible) return null;

  return (
    <div ref={panelRef} id="settingpanel" className="fixed inset-0 z-20 flex items-end justify-end bg-black bg-opacity-50">
      <div className="bg-darkorange w-panel h-screen rounded-2xl rounded-r-none shadow-lg relative overflow-y-scroll overflow-x-hidden">
        <div className="w-full h-44 shadow-lg p-7 rounded-bl-2xl sticky top-0 bg-darkorange z-10">
          <button onClick={closeSettingPanel} className="absolute top-0 left-0 w-12 h-12 m-7 text-4xl text-white font-extrabold">
            &times;
          </button>
          <h1 className="text-4xl text-center mt-2 text-white font-bold">Setting</h1>
          <div className="relative my-7 flex justify-center">
            <div ref={underlineRef} id="underline" className="absolute bottom-0 h-1 bg-white transition-all duration-300"></div>
            {['heading', 'appearance', 'access', 'tags'].map((section, index) => (
              <button
                key={section}
                ref={el => (buttonsRef.current[index] = el)}
                onClick={() => {
                  // Map section names directly to refs
                  const sectionRefs = { heading: headingRef, appearance: appearanceRef, access: accessRef, tags: tagsRef };
                  scrollToSection(sectionRefs[section]);
                  setActiveSection(section);
                  setUnderlinePosition(index);
                }}
                className={`flex-grow mx-1 py-3 text-xl font-semibold ${activeSection === section ? 'text-white' : 'text-black'}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Sections */}
        <div className="p-6">
          <div ref={headingRef}><HeadingSection /></div>
          <div ref={appearanceRef}><AppearanceSection handleSortBy={(sortOption) => console.log('Sort by:', sortOption)} /></div>
          <div ref={accessRef}>
            <AccessSection 
              forumSettingAccess={() => console.log('Access Settings')}
              forumSettingAccessPublic={() => console.log('Public Access')}
              forumSettingAccessPrivate={() => console.log('Private Access')}
            />
          </div>
          <div ref={tagsRef}><TagSection /></div>
        </div>
      </div>
    </div>
  );
};

export default SettingPanel;
