import React, { useState } from 'react';

const SetSchedule = ({ isVisible, closeSchedule }) => {
    const [scheduleDate, setScheduleDate] = useState('');

    const handleSetSchedule = () => {
        if (scheduleDate) {
            alert(`Schedule set for: ${scheduleDate}`);
            closeSchedule();  // Close the modal after setting the schedule
        } else {
            alert("Please select a date.");
        }
    };

    return (
        <>
            {isVisible && (
                <div id="schedule" className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-fit p-6 rounded-2xl shadow-lg relative">
                        <h1 className="text-center font-bold text-3xl m-2">Schedule Post</h1>
                        <h5 className="text-center text-sm m-2">Set a future publish date</h5>
                        <div className="flex justify-center m-4">
                            <input
                                type="date"
                                id="scheduleDate"
                                required
                                className="border-2 border-black p-2 rounded-md w-96 h-12"
                                value={scheduleDate}
                                onChange={(e) => setScheduleDate(e.target.value)}  // Update the date state
                            />
                        </div>
                        <div className="flex justify-around">
                            <div className="flex flex-col">
                                <button onClick={closeSchedule} className="w-44 h-12 bg-lightgray text-black rounded-xl font-semibold text-xl">Cancel</button>
                            </div>
                            <div className="flex flex-col">
                                <button onClick={handleSetSchedule} className="w-44 h-12 bg-basegreen text-white rounded-xl font-semibold text-xl">Set date</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SetSchedule;
