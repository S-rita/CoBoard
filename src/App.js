import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Board from './Board';
import Forum from './Forum';
import LoginSignup from './LoginSignup'
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
      </Routes>
    </Router>
  );
};

export default App;
