import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Board from './Board';
import Forum from './Forum';
import Preview from '../src/components/Forum/Preview'
import LoginSignup from './LoginSignup'
import ForgetPassword from './ForgetPassword'
import Test from './Test'
import Test2 from './Test2'
import UserProfile from './UserProfile'
import UserYourBoard from './UserYourBoard'
import UserBookmark from './UserBookmark'
import UserFileArchive from './UserFileArchive'
import './index.css'; // Tailwind CSS


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/index" element={<Main />} />
        <Route path="/" element={<LoginSignup />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/coboard/:board" element={<Board />} />
        <Route path="/coboard/:board/:forum_name" element={<Forum />} />
        <Route path="/coboard/:board/:forum_name/setting" element={<Forum />} />
        <Route path="/coboard/:board/:forum_name/topic" element={<Forum />} />
        <Route path="/coboard/:board/:forum_name/post" element={<Forum />} />
        <Route path="/preview/:board/:forum_name" element={<Preview />}/>
        <Route path="/file" element={<Test />} />
        <Route path="/file/:fileid" element={<Test2 />}/>
        <Route path="/user/:sid/profile" element={<UserProfile />} />
        <Route path="/user/:sid/yourboard" element={<UserYourBoard />} />
        <Route path="/user/:sid/yourbookmark" element={<UserBookmark />} />
        <Route path="/user/:sid/filearchive" element={<UserFileArchive />} />
      </Routes>
    </Router>
  );
};

export default App;
