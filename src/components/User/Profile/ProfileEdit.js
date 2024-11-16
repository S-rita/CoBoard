import React from 'react';

const ProfileEdit = ({ editedUsername, setEditedUsername, handleUpdateUsername, error, image, setImage, handleImageUpload, userData }) => {
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
          ) : userData.sprofile ? (
            <img
              src={`data:image/png;base64,${userData.sprofile}`}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center h-full text-gray-500">
              No Image
            </span>
          )}
        </div>
        
        {/* Image Upload Input */}
        <div className="mb-[150px] ml-[-50px] z-40">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleImageUpload(e); // Call the handler to upload image
              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setImage(event.target.result); // Update the image preview
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="cursor-pointer">
            <div className="bg-white rounded-full h-14 w-14 flex items-center justify-center shadow-md hover:border-2 hover:border-gray-300 hover:bg-gray-200 transition duration-200">
              <img
                src="/asset/pencil.svg"
                alt="Upload"
                className="h-6 w-6"
              />
            </div>
          </label>
        </div>
        
        <div className="flex flex-row items-center">
          <div className="w-[650px] h-[3px] bg-gray-400 mb-[100px]"></div>
          <p className="text-black text-4xl ml-4 mb-[100px]">Editing Profile</p>
        </div>
      </div>

      <div className="w-[900px] mt-[-150px] ml-[300px] bg-gray-200 rounded-lg shadow-md p-6">
        <p className="text-gray-700 mb-5 text-2xl">
          Student ID:<span className="ml-[20px]">{userData.studentId}</span>
        </p>
        <p className="text-gray-700 mb-5 text-2xl">
          Username:
          <span className="ml-2"></span>
          <input
            type="text"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
            className="ml-4 p-1 border border-gray-300 rounded"
          />
        </p>
        {error && <p className="ml-[130px] text-red-500">{error}</p>}
        <p className="text-gray-700 text-2xl">
          Password:
          <span className="ml-[32px]"></span>
          {generateAsterisks(userData.password)}
          </p>
      </div>

      <div className="mt-4 ml-[900px] flex gap-4">
        <button
          onClick={handleUpdateUsername}
          className="bg-gray-300 text-gray-700 py-2 px-10 rounded-xl hover:bg-gray-400 ml-[120px]"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
