import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";
import ChangePassword from "./ChangePassword";

const MainBody = () => {
  const { sid } = useParams(); // Fetch 'sid' from URL parameters
  const [userData, setUserData] = useState({
    studentId: "",
    username: "",
    password: "",
    profileImage: null, // Add profile image state
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${sid}`);
        setUserData({
          studentId: response.data.sid,
          username: response.data.sname || "",
          password: response.data.spw,
          profileImage: response.data.sprofile || null, // Fetch profile image data
        });
      } catch (err) {
        setError(err.response ? err.response.data.detail : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [sid]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editedUsername, setEditedUsername] = useState(userData.username);
  const [image, setImage] = useState(userData.profileImage);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedUsername(userData.username);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];
        setImage(reader.result); // Set preview image
  
        // Send image to the backend
        try {
          const response = await axios.put(`http://localhost:8000/user/${sid}/profile-image`, {
            image: base64Image,
          }, {
            headers: {
              'Content-Type': 'application/json', // Ensure the Content-Type is correct
            },
          });
          console.log("Profile image updated successfully", response.data);
        } catch (error) {
          console.error("Failed to update profile image.", error.response ? error.response.data : error.message);
          setError("Failed to update profile image.");
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle updating username and closing the edit view
  const handleUpdateUsername = () => {
    if (editedUsername.length > 10) {
      alert("Username cannot exceed 10 characters.");
      return;
    }

    // Update userData state with edited username
    setUserData((prevData) => ({
      ...prevData,
      username: editedUsername,
    }));
    
    // Close the edit view and return to profile view
    setIsEditing(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-6">
      {isChangingPassword ? (
        <ChangePassword
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handlePasswordUpdate={() => {}}
          error={error}
        />
      ) : isEditing ? (
        <ProfileEdit
          editedUsername={editedUsername}
          setEditedUsername={setEditedUsername}
          handleUpdateUsername={handleUpdateUsername} // Call the updated function
          error={error}
          image={image}
          setImage={setImage}
          handleImageUpload={handleImageUpload}
          userData={userData}
        />
      ) : (
        <ProfileView
          userData={userData}
          handleChangePassword={handleChangePassword}
          handleEditProfile={handleEditProfile}
          image={image}
        />
      )}
    </div>
  );
};

export default MainBody;
