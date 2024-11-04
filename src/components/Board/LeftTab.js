import React, { useState, useEffect, useContext } from 'react';
import { fetchForums } from '../../api';
import { UserContext } from '../../UserContext';

const LeftTab = ({ board, setTagFiltered }) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[new Date().getDay()];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [search, setSearch] = useState('');
    const { user, status } = useContext(UserContext);
    const name = status === "se" ? user.sid : user.aid;

    useEffect(() => {
        const loadTags = async () => {
            setLoading(true);
            try {
                const data = await fetchForums(board);
                if (!data || !data.tags || !Array.isArray(data.tags)) {
                    throw new Error("Invalid data format");
                }
                console.log("Fetched Tags:", data.tags);
                setTags(data.tags);
            } catch (error) {
                console.error("Failed to load forums", error);
                setError("Failed to load forums. " + (error.message || ''));
            } finally {
                setLoading(false);
            }
        };

        loadTags();
    }, [board]);

    const handleTagClick = (tagId) => {
        if (selectedTags.includes(tagId)) {
            const updatedTags = selectedTags.filter(id => id !== tagId);
            setSelectedTags(updatedTags);
            setTagFiltered(updatedTags);
        } else {
            const updatedTags = [...selectedTags, tagId];
            setSelectedTags(updatedTags);
            setTagFiltered(updatedTags);
        }
    };

    const clearFilters = () => {
        setSelectedTags([]);
        setTagFiltered([]);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredTags = tags.filter(tag => 
        tag.tag_text.toLowerCase().includes(search.toLowerCase())
    );

    const displayTags = () => {
        const unselectedTags = filteredTags.filter(tag => !selectedTags.includes(tag.tag_id));
        return [
            ...tags.filter(tag => selectedTags.includes(tag.tag_id)),
            ...unselectedTags.slice(0, 5)
        ];
    };

    const sendSelectedTags = (tags) => {
        console.log("Sending selected tags:", tags);
        alert(`Sending tags: ${tags.join(", ")}`);
    };

    return (
        <div className="w-96 h-full flex flex-col mt-6 items-center">
            <h2 className="text-3xl text-gray1 font-bold text-center mt-4">
                Hello, {name} <br /> Happy {currentDay}!
            </h2>
            <div className="bg-white rounded-full h-9 w-72 drop-shadow-md pt-1 px-4 mt-6">
                <input 
                    type="text" 
                    className="w-full bg-transparent text-gray-400 text-lg outline-none" 
                    placeholder={'\uD83D\uDD0D Search category...'} 
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="w-full flex flex-row justify-between">
                <h3 className="text-gray1 text-2xl font-bold self-start ml-16 mt-6 flex-col">Category</h3>
                <button 
                    type="button" 
                    onClick={() => clearFilters()}
                    className="mt-6 mr-12 text-blue-600 font-bold"
                >
                    clear filters
                </button>
            </div>
            <div className="w-full h-full flex flex-col items-center mt-4">
                <div className="flex flex-wrap justify-center px-6">
                    {displayTags().map(tag => (
                        <button 
                            key={tag.tag_id}
                            className={`m-1 px-3 py-2 rounded-md text-white ${selectedTags.includes(tag.tag_id) ? 'bg-basegreen' : 'bg-graygreen'}`}
                            onClick={() => handleTagClick(tag.tag_id)}
                        >
                            {tag.tag_text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeftTab;
