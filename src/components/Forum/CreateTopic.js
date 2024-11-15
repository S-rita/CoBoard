import React, { useState } from 'react';
import SetSchedule from './SetSchedule'; 
import { AddTopic } from '../../api'

const CreateTopic = ({ isVisible, closeCreateTopic, onCreateTopic, board, forum_name }) => {
    const [topicText, setTopicText] = useState('');
    const [publishDate, setPublish] = useState(null);
    const [expiredDate, setExpired] = useState(null);
    const [isScheduleVisible, setScheduleVisible] = useState(false);  
    const [errorMessage, setErrorMessage] = useState('');  

    const handlePublish = async () => {
        if (topicText.trim()) {
            try {
                const topicData = {
                    text: topicText,
                    publish: publishDate,
                    expired: expiredDate
                }
                const response = await AddTopic(board, forum_name, topicData);

                // Call parent function to update the topics list
                onCreateTopic(response);
                closeCreateTopic();
                setTopicText(''); // Reset the input field
            } catch (error) {
                console.error('Error creating topic:', error.response);
                setErrorMessage('Failed to create topic. Please try again later.');
            }
        } else {
            alert("Topic text can't be empty");
        }
    };

    const openScheduleModal = () => {
        setScheduleVisible(true);
    };

    const closeScheduleModal = () => {
        setScheduleVisible(false);
    };

    return (
        <>
            {isVisible && (
                <div id="createtopic" className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-400 p-6 rounded-2xl shadow-lg relative">
                        <div className="flex justify-between items-center mb-4">
                            <button type="button" onClick={closeCreateTopic} className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 text-gray-600 text-xl font-bold">
                                &times;
                            </button>
                            <div className="flex items-center space-x-4">
                                <button onClick={openScheduleModal} className="w-14 h-14">
                                    <img src="/asset/scheduleButton.svg" alt="scheduleButton"/>
                                </button>
                                <button onClick={handlePublish} className="w-28 h-10 rounded-md bg-basegreen text-white text-lg font-semibold">
                                    Publish
                                </button>
                            </div>
                        </div>                       
                        <input
                            type="text"
                            placeholder="Topic Title"
                            value={topicText} // Change value to topicText
                            onChange={(e) => setTopicText(e.target.value)} // Update on change
                            className="w-full p-2 mb-4 rounded-md text-gray1 font-semibold text-3xl"
                        />
                        <div className="w-full h-56 bg-white flex items-center justify-center mb-4 border-4 border-gray1 rounded-xl border-dashed">
                            <span className="text-xl font-bold text-gray-500">Add a picture</span>
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                </div>
            )}
            {/* SetSchedule modal */}
            <SetSchedule 
                isVisible={isScheduleVisible} 
                closeSchedule={closeScheduleModal} 
                publishDate={publishDate}
                setPublish={setPublish}
                expiredDate={expiredDate}
                setExpired={setExpired}
            />
        </>
    );
};

export default CreateTopic;
