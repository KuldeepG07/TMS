import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBox from "./Searchbox";
import RecentJobPostings from "./Recentjobpostings";
import TrainingProgram from "./Trainingprograms";

const Home = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        
        if (!token) {
            navigate('/login');
        } else {
            const username = localStorage.getItem('username');
            const name = localStorage.getItem('name');
            console.log(username);
            setUsername(username || 'User');
            setName(name);
        }
    }, [navigate]);

    return (
        <div className="home">
            <Navbar username={username} onLogout={handleLogout} />
            <div className="welcome-message">
                <h2>Welcome, {name}</h2>
            </div>
            <SearchBox />
            <RecentJobPostings />
            <TrainingProgram />
            <Footer />
        </div>
    );
};

export default Home;
