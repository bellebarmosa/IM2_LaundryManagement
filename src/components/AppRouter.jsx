import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pos" element={<POS />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRouter;