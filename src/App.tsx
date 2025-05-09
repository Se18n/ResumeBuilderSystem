import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Home from './pages/Home';
import CreateResume from './pages/CreateResume';
import EditResume from './pages/EditResume';
import ViewResume from './pages/ViewResume';
import Templates from './pages/Templates';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateResume />} />
          <Route path="/edit/:id" element={<EditResume />} />
          <Route path="/view/:id" element={<ViewResume />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ResumeProvider>
  );
}

export default App;