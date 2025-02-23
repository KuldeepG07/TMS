import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import AdminPage from './Components/Admin';
import ApplyJobPage from './Components/Applyjob';
import AllTrainingPrograms from './Components/Alltrainingprograms';
import AllJobs from './Components/Alljobpostings';
import ProfilePage from './Components/Profile';
import ZoneAdministratorSection from './Components/Zoneadministrator';
import RecruitmentOfficerSection from './Components/Recruitmentofficer';
import TrainingOfficerSection from './Components/Trainingofficer';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/manage/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/applyjob/:jobId" element={<ApplyJobPage />} />
        <Route path="/all-training-programs" element={<AllTrainingPrograms />} />
        <Route path="/all-job-postings" element={<AllJobs />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="zoneadministratordashboard" element={<ZoneAdministratorSection />}/>
        <Route path="recruitmentofficerdashboard" element={<RecruitmentOfficerSection />}/>
        <Route path="trainingofficerdashboard" element={<TrainingOfficerSection />}/>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
