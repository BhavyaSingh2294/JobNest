import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import CompaniesPage from './pages/CompaniesPage';
import SalaryGuidePage from './pages/SalaryGuidePage';
import CareerAdvicePage from './pages/CareerAdvicePage';
import JobDetailsPage from './pages/JobDetailsPage';
import CompanyDetailsPage from './pages/CompanyDetailsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:id" element={<CompanyDetailsPage />} />
          <Route path="/salary-guide" element={<SalaryGuidePage />} />
          <Route path="/career-advice" element={<CareerAdvicePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;