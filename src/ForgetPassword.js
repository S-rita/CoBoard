import React from 'react';
import Header from './components/ForgetPassword/Header';
import Body from './components/ForgetPassword/Body';

const ForgetPassword = () => {
  return (
    <div className="relative bg-basegreen min-h-screen flex flex-col">
      <Header />
      <Body />
    </div>
  );
};

export default ForgetPassword;
