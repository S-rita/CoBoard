import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Board from './Board';
import Forum from './Forum';
import Preview from '../src/components/Forum/Preview'
import LoginSignup from './LoginSignup'
import ForgetPassword from './ForgetPassword';
import UserYourBoard from './UserYourboard';
import Test from './Test'
import Test2 from './Test2'
import User from './User'
import './index.css'; // Tailwind CSS


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/index" element={<Main />} />
        <Route path="/" element={<LoginSignup />} />
        <Route path="/coboard/:board" element={<Board />} />
        <Route path="/coboard/:board/:forum_name" element={<Forum />} />
        <Route path="/coboard/:board/:forum_name/setting" element={<Forum />} />
        <Route path="/coboard/:board/:forum_name/topic" element={<Forum />} />
        <Route path="/coboard/:board/:forum_name/post" element={<Forum />} />
        <Route path="/preview/:board/:forum_name" element={<Preview />}/>
        <Route path="/forget_password" element={<ForgetPassword />}/>
        <Route path="/user" element={<UserYourBoard />}/>
        <Route path="/file" element={<Test />} />
        <Route path="/file/:fileid" element={<Test2 />}/>
        <Route path="/user/:sid" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
