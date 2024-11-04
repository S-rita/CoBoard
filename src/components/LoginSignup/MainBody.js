import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import LoginPage from "./Login";
import SignupPage from "./Signup";
import { fetchUsers } from "../../api";
import { UserContext } from '../../UserContext';

const MainBody = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [se, setSE] = useState([]);
  const [anonymous, setAnonymous] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser, setStatus } = useContext(UserContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchUsers();
        if (!response || typeof response !== 'object') {
          throw new Error("Invalid response from server");
        }
        console.log(response);
        setSE(response.se);
        setAnonymous(response.anonymous);
      } catch (error) {
        console.error("Failed to load users", error);
        setError("Failed to load users. " + (error.message || ''));
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  const setSignup = () => {
    setIsLogin(false);
    clearInputs();
  };

  const setLogin = () => {
    setIsLogin(true);
    clearInputs();
  };

  const validateUser = (username, password, users, type) => {
    if (!users || !Array.isArray(users)) {
      return null; // Return null if users array is not available or not an array
    }

    const user = users.find((user) =>
      (type === "se" && user.sid === username) ||
      (type === "anonymous" && user.aid === username)
    );

    if (user && ((type === "se" && user.spw === password) || (type === "anonymous" && user.apw === password))) {
      setUser(user);
      setStatus(type === "se" ? "se" : "a");
      return type === "se" ? user.sid : "a";
    }

    return null;
  };

  const validateSignUp = (username, password, users) => {
    if (!username || !password) {
      setError('Username and password cannot be empty.');
      return false;
    }

    const userExists = users.some(user => user.aid === username);
    if (userExists) {
      setError('Username already exists.');
      return false;
    }

    return true; // This is where you would add logic to save the new user
  };

  const submitForm = () => {
    let loginStatus = null;

    if (isLogin) {
      // Check if username is in se or anonymous and verify password
      loginStatus = validateUser(username, password, se, "se") || validateUser(username, password, anonymous, "anonymous");
    } else {
      // For signup, validate input and prevent duplicate usernames
      if (validateSignUp(username, password, anonymous)) {
        // Simulate user signup logic here
        alert("Signup successful!");
        navigate(`/index`);
        return;
      }
    }

    if (loginStatus) {
      alert("Login successful!");
      navigate(`/index`);
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div>
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
      <div className="overflow-hidden m-0 bg-[#006b62] h-screen relative">
        <div className="flex justify-center items-center flex-col w-full h-screen">
          <div className="w-[440px] h-[495px] bg-white rounded-[20px] shadow-lg flex flex-col justify-center items-center p-[20px] mb-[150px]">
            <div className="font-['Istok Web'] text-[50px] font-bold mb-[90px] tracking-[6px] text-black">
              {isLogin ? "LOGIN" : "SIGNUP"}
            </div>
            <div className="relative w-[350px] h-[48px] bg-white border border-[#E3E8EC] rounded-[18px] overflow-hidden mt-[-50px]">
              <div
                className={`absolute w-[50%] h-full bg-gradient-to-r from-[#487262] via-[#679f8a] to-[#89d2b6] rounded-[18px] transition-transform ease-out duration-300 ${
                  isLogin ? "translate-x-0" : "translate-x-full"
                }`}
              ></div>
              <div
                className="absolute left-0 top-0 w-[50%] h-full flex justify-center items-center pointer-events-auto select-none cursor-pointer"
                onClick={setLogin}
              >
                <span
                  className={`font-['Istok Web'] text-[26px] font-bold tracking-[1px] ${
                    isLogin ? "text-white" : "text-[#7F93A8]"
                  }`}
                >
                  {" "}
                  Login
                </span>
              </div>
              <div
                className="absolute right-0 top-0 w-[50%] h-full flex justify-center items-center pointer-events-auto select-none cursor-pointer"
                onClick={setSignup}
              >
                <span
                  className={`font-['Istok Web'] text-[26px] font-bold tracking-[1px] ${
                    !isLogin ? "text-white" : "text-[#7F93A8]"
                  }`}
                >
                  {" "}
                  Signup
                </span>
              </div>
            </div>

            {/* Render the LoginPage or SignupPage based on the isLogin state */}
            {isLogin ? (
              <LoginPage
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                submitForm={submitForm}
              />
            ) : (
              <SignupPage
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                submitForm={submitForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
