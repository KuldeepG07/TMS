import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = ({ username, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/dashboard" className="logo">
                    Teacher Management
                </Link>
            </div>
            <div className="navbar-center">
                <Link to="/dashboard">Home</Link>
                <Link to="/all-job-postings">Jobs</Link>
                <Link to="/all-training-programs">Training Programs</Link>
                <Link to="#">Attendance</Link>
            </div>
            <div className="navbar-right">
                <Link to="/profile">
                    <i className="fas fa-user profile-icon"></i>
                </Link>
                <button className="logoutBtn" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
