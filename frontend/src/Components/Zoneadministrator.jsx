import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const ZoneAdministratorSection = () => {
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
        <h1>Hello from Zone Administrator</h1>
    );
};

export default ZoneAdministratorSection;
