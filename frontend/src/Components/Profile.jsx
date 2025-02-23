import React, { useEffect, useState } from 'react';
import '../CSS/Profile.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        personal_details: {
            name: '',
            email: '',
            contactNumber: '',
            dob: '',
        },
        role: '',
    });

    const [teacherData, setTeacherData] = useState({
        personalInfo: {
            address: '',
            profile_picture: null,
        },
        professionalInfo: {
            qualifications: [],
            experience: 0,
        },
        employmentHistory: [],
        currentSchool: '',
        achievements: [],
        passedExam: false,
    });

    const userId = localStorage.getItem('userid');
    const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
    const [isEditingProfessionalInfo, setIsEditingProfessionalInfo] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/getmergeduser/${userId}`);
                const data = await response.json();
                if (data.status) {
                    setUserData(data.user);
                    setTeacherData(data.teacher);
                } else {
                    toast.error('Failed to fetch profile data');
                }
            } catch (error) {
                toast.error('Error fetching profile data: ' + error.message);
            }
        };

        fetchProfileData();
    }, [userId]);

    const handleEditToggleBasicInfo = () => {
        setIsEditingBasicInfo(!isEditingBasicInfo);
    };

    const handleEditToggleProfessionalInfo = () => {
        setIsEditingProfessionalInfo(!isEditingProfessionalInfo);
    };

    const validateBasicInfo = () => {
        const { name, email, contactNumber, dob } = userData.personal_details;
        if (!name || !email || !contactNumber || !dob) {
            toast.error('All basic information fields are required');
            return false;
        }
        return true;
    };

    const validateProfessionalInfo = () => {
        const { address } = teacherData.personalInfo;
        const { achievements } = teacherData.achievements;

        if (!address || achievements.length === 0) {
            toast.error('All professional information fields are required');
            return false;
        }
        return true;
    };

    const handleSaveProfile = async () => {
        if (isEditingBasicInfo) {
            if (!validateBasicInfo()) {
                return;
            }
        }

        if (isEditingProfessionalInfo) {
            if (!validateProfessionalInfo()) {
                return; 
            }
        }

        try {
            const userDetails = {
                "name": userData.personal_details.name,
                "email": userData.personal_details.email,
                "contactNumber": userData.personal_details.contactNumber,
                "dob": userData.personal_details.dob
            };

            const teacherDetails = {
                "address": teacherData.personalInfo.address,
                "profile_picture": teacherData.personalInfo.profile_picture,
                "achievements": teacherData.achievements
            };
            const response = await fetch(`http://localhost:5000/api/users/updateprofile/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userDetails,
                    teacherDetails,
                }),
            });
            const data = await response.json();
            if (data.status) {
                toast.success(data.message);
                setIsEditingBasicInfo(false);
                setIsEditingProfessionalInfo(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error updating profile: ' + error.message);
        }
    };

    const handleCancelEdit = () => {
        setIsEditingBasicInfo(false);
        setIsEditingProfessionalInfo(false);
    };

    const handleFileChange = (e) => {
        // Handle profile picture upload
    };

    return (
        <div className="profilePageSection">
            <h1 className="profilePageContainer">Profile</h1>
            <div className="profileContent">
                <div className="basicInfoSection">
                    <h2>Basic Information</h2>
                    <div>
                        <label>Username:</label>
                        <span>{userData.username}</span>
                    </div>
                    <div>
                        <label>Name:</label>
                        {isEditingBasicInfo ? (
                            <input
                                type="text"
                                value={userData.personal_details.name}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    personal_details: { ...userData.personal_details, name: e.target.value },
                                })}
                            />
                        ) : (
                            <span>{userData.personal_details.name}</span>
                        )}
                    </div>
                    <div>
                        <label>Email:</label>
                        {isEditingBasicInfo ? (
                            <input
                                type="email"
                                value={userData.personal_details.email}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    personal_details: { ...userData.personal_details, email: e.target.value },
                                })}
                            />
                        ) : (
                            <span>{userData.personal_details.email}</span>
                        )}
                    </div>
                    <div>
                        <label>Contact Number:</label>
                        {isEditingBasicInfo ? (
                            <input
                                type="text"
                                value={userData.personal_details.contactNumber}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    personal_details: { ...userData.personal_details, contactNumber: e.target.value },
                                })}
                            />
                        ) : (
                            <span>{userData.personal_details.contactNumber}</span>
                        )}
                    </div>
                    <div>
                        <label>Date of Birth:</label>
                        {isEditingBasicInfo ? (
                            <input
                                type="date"
                                value={userData.personal_details.dob}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    personal_details: { ...userData.personal_details, dob: e.target.value },
                                })}
                            />
                        ) : (
                            <span>{new Date(userData.personal_details.dob).toLocaleDateString()}</span>
                        )}
                    </div>

                    <div className="profileActions">
                        {isEditingBasicInfo ? (
                            <>
                                <button className="saveBtn" onClick={handleSaveProfile}>Save</button>
                                <button className="cancelBtn" onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <button className="editBtn" onClick={handleEditToggleBasicInfo}>Edit</button>
                        )}
                    </div>
                </div>

                <div className="teacherInfoSection">
                    <h2>Professional Information</h2>

                    <div className="profilePicture">
                        <img
                            src={`http://localhost:5000/uploads/${teacherData.personalInfo.profile_picture || 'default.png'}`}
                            alt="Profile"
                        />
                        {isEditingProfessionalInfo && <input type="file" onChange={handleFileChange} />}
                    </div>

                    <div>
                        <label>Address:</label>
                        {isEditingProfessionalInfo ? (
                            <input
                                type="text"
                                value={teacherData.personalInfo.address}
                                onChange={(e) =>
                                    setTeacherData({
                                        ...teacherData,
                                        personalInfo: { ...teacherData.personalInfo, address: e.target.value },
                                    })
                                }
                            />
                        ) : (
                            <span>{teacherData.personalInfo.address}</span>
                        )}
                    </div>

                    <div>
                        <label>Qualifications:</label>
                        <ul>
                            {teacherData.professionalInfo.qualifications.map((qual, index) => (
                                <li key={index}>{qual}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <label>Experience (Years):</label>
                        <span>{teacherData.professionalInfo.experience || '0'}</span>
                    </div>

                    <div>
                        <label>Current School:</label>
                        <span>{teacherData.currentSchool || 'None'}</span>
                    </div>

                    <div>
                        <label>Achievements:</label>
                        {isEditingProfessionalInfo ? (
                            <textarea
                                value={teacherData.achievements.join(', ')}
                                onChange={(e) =>
                                    setTeacherData({
                                        ...teacherData,
                                        achievements: e.target.value.split(',').map((ach) => ach.trim()),
                                    })
                                }
                            />
                        ) : (
                            <ul>
                                {teacherData.achievements.map((achievement, index) => (
                                    <li key={index}>{achievement}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="employmentHistorySection">
                        <h3>Employment History</h3>
                        <ul>
                            {teacherData.employmentHistory.map((history, index) => (
                                <li key={index}>
                                    <p>School: {history.schoolName}</p>
                                    <p>Position: {history.position}</p>
                                    <p>
                                        Period: {new Date(history.startDate).toLocaleDateString()} -{' '}
                                        {history.endDate ? new Date(history.endDate).toLocaleDateString() : 'Present'}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Edit Button for Professional Information */}
                    <div className="profileActions">
                        {isEditingProfessionalInfo ? (
                            <>
                                <button className="saveBtn" onClick={handleSaveProfile}>Save</button>
                                <button className="cancelBtn" onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <button className="editBtn" onClick={handleEditToggleProfessionalInfo}>Edit</button>
                        )}
                    </div>
                </div>
            </div>
            <div className="backButtonContainer">
                <button className="backButton" onClick={() => navigate('/dashboard')}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
