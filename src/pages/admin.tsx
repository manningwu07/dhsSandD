"use client";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdminAuth from '~/admin/adminAuth';
import AdminInterface from '~/admin/adminInterface';

function AdminPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/admin"
          element={
            <AdminAuth>
              <AdminInterface />
            </AdminAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default AdminPage;
