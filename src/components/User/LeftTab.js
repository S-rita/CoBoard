import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const sidebars = [
    { label: "Profile", link: "/user/66011080/profile" },
    { label: "Your Board", link: "/user/66011080/yourboard" },
    { label: "Bookmarks", link: "/user/66011080/yourbookmark" },
    { label: "File Archive", link: "/user/66011080/filearchive" },
];

const LeftTab = () => {
    const { sid } = useParams(); // Fetch 'sid' from URL parameters
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation(); // Get the current location

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/${sid}`);
                setUserData(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.detail : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [sid]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const { bookmarked = [], created = [] } = userData || {};

    return (
        <div className="w-64 h-full bg-white shadow-md flex">
            <div className="flex-grow flex flex-col">
                {sidebars.map((part, index) => (
                    <div key={part.label}>
                        <Link 
                            to={part.link} 
                            className={`flex justify-between items-center p-6 text-gray-700 transition-colors duration-200 flex-1 ${
                                location.pathname === part.link ? 'bg-gray-200' : 'hover:bg-gray-100'
                            }`}
                        >
                            <span className="flex-grow text-lg font-semibold text-right">{part.label}</span>
                            <span className="text-gray-600 ml-1">
                                {part.label === "Your Board" && <span>({created.length})</span>}
                                {part.label === "Bookmarks" && <span>({bookmarked.length})</span>}
                            </span>
                        </Link>
                        {index < sidebars.length - 1 && <hr className="border-t border-gray-300 my-0" />}
                    </div>
                ))}
            </div>
            <div className="w-1 bg-green-500"></div> {/* Green vertical line */}
        </div>
    );
};

export default LeftTab;
