import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const sections = [
    { title: "Admission", img: "/asset/admission.jpg", link: "/admission" },
    { title: "Class Work", img: "/asset/classwork.jpg", link: "/classwork" },
    { title: "Student Discussion", img: "/asset/discussion.jpg", link: "/discussion" },
    { title: "Education", img: "/asset/Education.jpg", link: "/education" },
    { title: "Alumni", img: "/asset/alumni.jpg", link: "/alumni" },
];

const ScrollBackground = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = scrollY / documentHeight;
            setScrollPercentage(scrollPercentage);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const backgroundStyle = scrollPercentage < 0.3 
        ? { background: '#006b62' } 
        : { background: `linear-gradient(to bottom, #006b62 ${100 - scrollPercentage * 100}%, #FFFFFF)` };

    return (
        <div style={backgroundStyle} className="scroll-background w-full">
            <div className="flex flex-col justify-center items-center h-fit">
                <p className="text-white text-8xl text-center pt-12">Welcome to CoBoard</p>
                <p className="text-white text-3xl text-center pt-8">What Would you like to talk about?</p>
                <div className="flex justify-between flex-wrap px-5 w-full">
                    {sections.map((section, index) => (
                        <div key={index} className="w-72 h-630 flex justify-center items-center my-10 relative group">
                            <img
                                src={section.img}
                                className="h-5/6 w-5/6 object-cover group-hover:w-fit group-hover:h-full"
                                alt={section.title}
                            />
                            <div className="overlay-content absolute bottom-0 w-full p-4 flex flex-col items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30">
                                <h3 className="text-white text-2xl mb-2 font-bold">{section.title}</h3>
                                <Link to={section.link}>
                                    <button className="w-64 h-16 text-white py-2 px-4 rounded-full border-2 border-white">
                                        <div className="flex flex-row items-center justify-center">
                                            <p className="flex flex-col mr-1 hover:mr-3 duration-400">Explore {section.title}</p>
                                            <p className="text-lg flex flex-col">&#8594;</p>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row mt-10">
                    <div className="w-500 h-500 ml-20 mb-10">
                        <img src="/asset/CoBoard logo.svg" className="w-full h-full" alt="CoBoard Logo" />
                    </div>
                    <div className="ml-28">
                        <p className="text-white text-4xl">What is</p>
                        <p className="text-white text-9xl italic">CoBoard?</p>
                        <p className="text-basegreen text-4xl">CoBoard is a arai dee na.</p>
                        <p className="text-basegreen text-4xl">CoBoard is a arai kor mai ru ar.</p>
                        <p className="text-basegreen text-4xl">CoBoard is like a shenzhen padlet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrollBackground;
