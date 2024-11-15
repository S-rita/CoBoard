import React, { useState, useEffect } from "react";
import LoginPage from "./Login";
import SignupPage from "./Signup";

const MainBody = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clearInputs = () => {
    setEmail("");
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitForm = () => {
    if (!validateEmail(email) && !isLogin) {
      alert("Invalid email format! Please enter a valid email.");
      return;
    }
    alert("Form submitted!");
    window.location.href = "/";
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
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword} // Pass the function down
              />
            ) : (
              <SignupPage
                username={username}
                email={email}
                password={password}
                setUsername={setUsername}
                setEmail={setEmail}
                setPassword={setPassword}
                submitForm={submitForm}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword} // Pass the function down
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
