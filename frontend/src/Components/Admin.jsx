import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '../CSS/Admin.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedAdminRole, setSelectedAdminRole] = useState('');
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("token");
        }
    }, [navigate]);
    const openModal = (role) => {
        setSelectedAdminRole(role);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setUsername('');
        setPassword('');
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    admin_role: selectedAdminRole,
                }),
            });

            const data = await response.json();
            if (data.status) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("name", data.name);
                localStorage.setItem("email", data.email);
                localStorage.setItem("adminid", data.adminid);
                localStorage.setItem("admin", data.admin);
                toast.success(`Welcome ${data.name} as ${selectedAdminRole}!`);
                closeModal();
                if (selectedAdminRole === 'Zone Administrator') {
                    setTimeout(() => {
                        navigate("/zoneadministratordashboard");
                    }, 2500);
                } else if (selectedAdminRole === 'Recruitment Officer') {
                    setTimeout(() => {
                        navigate("/recruitmentofficerdashboard");
                    }, 2500);
                } else if (selectedAdminRole === 'Training Officer') {
                    setTimeout(() => {
                        navigate("/trainingofficerdashboard");
                    }, 2500);
                }
            } else {
                toast.error('Invalid credentials or role!');
            }
        } catch (error) {
            toast.error('Error during login! ' + error.message);
        }
    };

    return (
        <div className="adminPageSection">
            <div className="adminPageContainer">
                <h1>Admin Dashboard</h1>
            </div>
            <div className="adminImageRow">
                <div className="adminImageCard" onClick={() => openModal('Zone Administrator')}>
                    <img src={`${process.env.PUBLIC_URL}/zone_administrator.png`} alt="Zone Administrator" />
                    <p>Zone Administrator</p>
                </div>
                <div className="adminImageCard" onClick={() => openModal('Recruitment Officer')}>
                    <img src={`${process.env.PUBLIC_URL}/recruitment_officer.png`} alt="Recruitment Officer" />
                    <p>Recruitment Officer</p>
                </div>
                <div className="adminImageCard" onClick={() => openModal('Training Officer')}>
                    <img src={`${process.env.PUBLIC_URL}/training_officer.png`} alt="Training Officer" />
                    <p>Training Officer</p>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="loginModal"
                overlayClassName="loginModalOverlay"
            >
                <div className="modalContainer">
                    <div className="modalLeft">
                        <h2>{selectedAdminRole}</h2>
                        <p>Please enter your credentials to log in as {selectedAdminRole}.</p>
                    </div>

                    <div className="modalRight">
                        <form onSubmit={handleLoginSubmit}>
                            <div className="formGroup">
                                <label>Username:</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="Enter username"
                                />
                            </div>

                            <div className="formGroup">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="modalActions">
                                <button type="submit" className="loginBtn">Submit</button>
                                <button onClick={closeModal} className="closeModalBtn">&times;</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminPage;
