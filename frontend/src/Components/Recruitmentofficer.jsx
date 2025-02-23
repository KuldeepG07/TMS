import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecruitmentOfficerSection = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);

        if (!token) {
            navigate('/manage/admin');
        } else {
            const username = localStorage.getItem('username');
            console.log(username);
        }
    }, [navigate]);
    return (
        <div>
            <h1>Hello from Recruitment Officer</h1>
        </div>
    );
};

export default RecruitmentOfficerSection;