import React from 'react';

const ProfileView = ({ userData, handleChangePassword, handleEditProfile, image, isPasswordVisible }) => {
  // Generate asterisks based on password length
  const generateAsterisks = (password) => {
    return password ? '*'.repeat(password.length) : '';
  };

  return (
    <div className="mt-6">
      <div className="flex-row flex items-center mb-4 ml-10">
        <div className={`bg-gray-300 rounded-full h-[234px] w-[234px] overflow-hidden relative`}>
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center h-full text-gray-500">
              No Image
            </span>
          )}
        </div>
        
        <div className="flex flex-row items-center">
          <div className="w-[700px] h-[3px] bg-gray-400 mb-[100px]"></div>
          <p className="text-gray-700 text-4xl ml-4 mb-[100px]">
            {userData.username ? userData.username : userData.studentId}
          </p>
        </div>
      </div>
      
      {/* User Information */}
      <div className="w-[900px] mt-[-150px] ml-[300px] bg-gray-200 rounded-lg shadow-md p-6">
        <p className="text-gray-700 mb-5 text-2xl">
          Student ID:<span className="ml-6">{userData.studentId}</span>
        </p>
        <p className="text-gray-700 mb-5 text-2xl">
          Username:
          <span className="ml-7">
            {userData.username ? userData.username : "-"}
          </span>
        </p>
        <p className="text-gray-700 text-2xl">
          Password:
          <span className="ml-8">
            {isPasswordVisible ? userData.password : generateAsterisks(userData.password)}
          </span>
        </p>
      </div>

      <div className="mt-4 ml-[900px] flex gap-4">
        <button
          onClick={handleEditProfile}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400"
        >
          Edit Profile
        </button>
        <button
          onClick={handleChangePassword}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
