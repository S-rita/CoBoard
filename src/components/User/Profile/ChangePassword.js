import React, { useState } from "react";

const ChangePassword = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handlePasswordUpdate,
  error,
}) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="mt-6 ml-4">
      <div className="flex flex-row gap-5 ml-10 items-center">
        <div className="flex-auto text-black text-4xl font-bold ">
          Change my password
        </div>
        <div className="bg-gray-400 mr-[150px] h-[3px] w-[660px]" />
      </div>
      {/* Password Form */}

      <div className="w-[1120px] mt-7 ml-10 bg-gray-200 rounded-lg shadow-md p-6">
        <div>
          <p className="text-gray-700 text-xl">Current password</p>
          <input
            type="text"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="text-gray-700 mb-5 text-2xl w-[500px] border border-gray-300 rounded p-2"
          />
          <p className="relative text-blue-600 text-[10px] ml-[415px] -mt-5 cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-[80px]">
            Forget password?
          </p>
        </div>
        <div>
          <p className="text-gray-700 text-xl">New password</p>
          <div className="relative w-[500px]">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="text-gray-700 mb-5 text-2xl w-full border border-gray-300 rounded p-2"
            />
            <button
              onClick={toggleShowNewPassword}
              className="absolute right-4 top-1/3 transform -translate-y-1/2"
              type="button"
            >
              <img
                src={showNewPassword ? '/asset/opened_eye.svg' : '/asset/closed_eye.svg'}
                alt={showNewPassword ? "Hide Password" : "Show Password"}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
        <div>
          <p className="text-gray-700 text-xl">Confirm new password</p>
          <div className="relative w-[500px]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-gray-700 mb-5 text-2xl w-full border border-gray-300 rounded p-2"
            />
            <button
              onClick={toggleShowConfirmPassword}
              className="absolute right-4 top-1/3 transform -translate-y-1/2"
              type="button"
            >
              <img
                src={showConfirmPassword ? '/asset/opened_eye.svg' : '/asset/closed_eye.svg'}
                alt={showConfirmPassword ? "Hide Password" : "Show Password"}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message */}
      </div>
      <div className="mt-4 ml-[900px] flex gap-4">
        <button
          onClick={handlePasswordUpdate}
          className="bg-gray-300 text-gray-700 py-2 px-10 rounded-xl hover:bg-gray-400 ml-[120px]"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
