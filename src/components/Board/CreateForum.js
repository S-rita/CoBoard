import React, { useEffect, useRef, useState } from 'react';
import HeadingSection from './HeadingSection';
import AppearanceSection from './AppearanceSection';
import AccessSection from './AccessSection';
import TagSection from './TagSection';
import { createForum } from '../../api'; // Ensure you're only importing createForum

const CreateForum = ({ isVisible, closeCreateForum, board, onForumCreated }) => {
  const [activeSection, setActiveSection] = useState('heading');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const panelRef = useRef(null);
  const headingRef = useRef(null);
  const appearanceRef = useRef(null);
  const accessRef = useRef(null);
  const tagsRef = useRef(null);
  const underlineRef = useRef(null);
  const buttonsRef = useRef([]);

  const scrollToSection = (sectionRef) => {
    const headerHeight = 176;
    const panelElement = document.getElementById('createforum');
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

  const handleCreate = async () => {
    if (title.trim() === '') {
      alert("Title cannot be empty!");
      return;
    }

    const forumData = {
      forum_name: title,
      description: description,
      creator_id: '12345678', // Replace with the actual creator ID
      board: board // Include the board
      // slug should NOT be included
    };

    try {
      const createdForum = await createForum(board, forumData); // Create forum
      console.log('Created forum:', createdForum);
      onForumCreated(createdForum); // Pass the newly created forum
      
      setTitle('');
      setDescription('');

      closeCreateForum(); // Close the modal after successful creation
    } catch (error) {
      if (error.response) {
        console.error('Error creating forum:', error.response.data); // Log full error response
      } else {
        console.error('Error creating forum:', error.message);
      }
      alert('Error creating forum. Please try again.');
    }
  };  

  if (!isVisible) return null;

  return (
    <div ref={panelRef} id="createforum" className="fixed inset-0 z-20 flex items-end justify-center bg-black bg-opacity-50">
      <div className="bg-white w-panel h-630 rounded-2xl shadow-lg relative overflow-y-scroll overflow-x-hidden">
        <div className="w-full h-44 shadow-lg p-7 rounded-t-2xl sticky top-0 bg-white z-10">
          <button onClick={closeCreateForum} className="absolute top-0 left-0 w-12 h-12 m-7 bg-graybg rounded-xl text-3xl text-white font-extrabold">
            &times;
          </button>
          <h1 className="text-4xl text-center mt-2 text-black font-bold">Create Forum</h1>
          <div className="relative my-7 flex justify-center">
            <div ref={underlineRef} id="underline" className="absolute bottom-0 h-1 bg-basegreen transition-all duration-300"></div>
            {['heading', 'appearance', 'access', 'tags'].map((section, index) => (
              <button
                key={section}
                ref={el => (buttonsRef.current[index] = el)}
                onClick={() => {
                  const sectionRefs = { heading: headingRef, appearance: appearanceRef, access: accessRef, tags: tagsRef };
                  scrollToSection(sectionRefs[section]);
                  setActiveSection(section);
                  setUnderlinePosition(index);
                }}
                className={`flex-grow mx-1 py-3 text-xl font-semibold ${activeSection === section ? 'text-basegreen' : 'text-black'}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          <button 
            onClick={handleCreate} 
            className={`absolute top-0 right-0 w-20 h-12 m-7 bg-basegreen text-white rounded px-4 py-2 ${title.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={title.trim() === ''}
          >
            Create
          </button>
        </div>
        
        {/* Sections */}
        <div className="p-6">
          <div ref={headingRef}>
            <HeadingSection 
              setTitle={setTitle} 
              setDescription={setDescription}
              title={title} 
              description={description}
            />
          </div>
          <div ref={appearanceRef}>
            <AppearanceSection handleSortBy={(sortOption) => console.log('Sort by:', sortOption)} />
          </div>
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

export default CreateForum;