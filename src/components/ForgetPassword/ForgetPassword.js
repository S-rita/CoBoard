import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    setError(""); // Clear error when typing
    setSuccessMessage(""); // Clear success message when typing
  };

  const handleSendResetEmail = async () => {
    if (!username) {
      setError("Please enter a username.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/forget-password`, { username });
      setSuccessMessage(`Password sent to the email linked with ${username}.`);
      setError(""); // Clear any previous error message
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Username not found.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleBackToLogin = () => {
    navigate('/'); 
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="absolute top-[-140px] right-[-180px]">
        <img
          src="/asset/CoBoard logo.svg"
          className="w-[562px] h-[553px]"
          alt="Logo"
        />
      </div>
      <div className="absolute top-[450px] left-[-170px]">
        <img
          src="/asset/CoBoard logo.svg"
          className="w-[562px] h-[553px]"
          alt="Logo"
        />
      </div>
      <div id="usernameInput" className="flex flex-col items-center mt-[130px]">
        <div className="w-[440px] h-[400px] bg-white rounded-[20px] shadow-lg flex flex-col justify-center items-center mb-[150px] relative">
          <div className="absolute top-[-110px]">
            <img
              src="/asset/keylock.png"
              alt="KeyLock"
              className="h-[210px] w-[390px]" 
            />
          </div>
          <div className="font-['Istok Web'] text-[30px] mt-[0px] mb-[5px] font-bold text-black">
            Forget Password
          </div>
          <div className="font-['Istok Web'] text-[15px] mb-[20px] font-normal text-black text-center">
            Enter your username, and we'll send<br />
            the password to your registered email.
          </div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            className="w-[320px] h-[45px] p-[10px] mb-2 border-2 border-[#a2a4a7] font-bold text-[18px] placeholder-[#acaeb1]"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

          <button
            className="w-[320px] h-[48px] mt-[20px] p-[10px] rounded-[15px] flex items-center justify-center bg-[#003F6B] text-white font-bold text-[25px] tracking-[1px] hover:bg-[#005D9E]"
            onClick={handleSendResetEmail}
          >
            Submit
          </button>
          <button
            className="mt-[20px] flex items-center justify-center text-gray-700 text-[15px] tracking-[1px] hover:text-gray-900 transition-all group"
            onClick={handleBackToLogin}
          >
            <span className="mr-2 transform transition-transform duration-300 ease-in-out group-hover:-translate-x-2">
              {"<"}
            </span>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
