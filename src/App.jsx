// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import Upload from './components/Upload';
import Processing from './components/Processing';
import ChartPage from './components/ChartPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/processing" element={<Processing />} />
      <Route path="/chart" element={<ChartPage />} />
    </Routes>
  );
};

export default App;
