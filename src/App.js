import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Board from './Board';
import Forum from './Forum';
import './index.css'; // Tailwind CSS


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:board" element={<Board />} />
        <Route path="/:board/:forum_name" element={<Forum />} />
      </Routes>
    </Router>
  );
};

export default App;
