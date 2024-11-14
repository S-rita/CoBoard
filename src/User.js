import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { deleteForum } from './api';

const User = () => {
    const { sid } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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


    const handleDeleteForum = async (forum_id, sid) => {
        try {
            await deleteForum(forum_id);
            setUserData((prevData) => ({
                ...prevData,
                created: prevData.created.filter(forum => forum.forum_id !== forum_id)
            }));
        } catch (err) {
            setError("Failed to delete forum.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const { sid: userId, spw, sprofile, bookmarked = [], created = [], files = [] } = userData || {};

    return (
        <div>
            <h1>User Profile</h1>
            <h2>ID: {userId}</h2>
            <p>Password: {spw}</p>
            {sprofile && (
                <img src={`data:image/png;base64,${sprofile}`} alt="User Icon" />
            )}

            <h3>Bookmarked Forums</h3>
            <ul>
                {bookmarked.map((forum) => (
                    <li key={forum.forum_id}>
                        {forum.forum_name}
                    </li>
                ))}
            </ul>

            <h3>Created Forums</h3>
            <ul>
                {created.map((forum) => (
                    <li key={forum.forum_id}>
                        {forum.forum_name}
                        <button onClick={() => handleDeleteForum(forum.forum_id, sid)}>X</button>
                    </li>
                ))}
            </ul>

            <h3>Files</h3>
            <ul>
                {files.map((file) => (
                    <li key={file.file_id}>{file.filename}</li>
                ))}
            </ul>
        </div>
    );
};

export default User;
