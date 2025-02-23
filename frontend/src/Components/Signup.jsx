import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/Signup.css";
import axios from 'axios';

const schoolOptions = [
    { value: "School1", label: "School 1" },
    { value: "School2", label: "School 2" },
    { value: "School3", label: "School 3" },
];

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isExperienced, setIsExperienced] = useState(false);
    const [isCurrentlyServing, setIsCurrentlyServing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        dob: "",
        address: "",
        profilePicture: "",
        qualifications: "",
        experience: "",
        employmentHistory: [{ schoolName: "", position: "", startDate: "", endDate: "" }],
        currentSchool: "",
        achievements: [""],
        passedExam: true,
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file" && files[0]) {
            const file = URL.createObjectURL(files[0]);
            setFormData({ ...formData, profilePicture: file });
        } else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleEmploymentChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEmploymentHistory = [...formData.employmentHistory];
        updatedEmploymentHistory[index][name] = value;
        setFormData({ ...formData, employmentHistory: updatedEmploymentHistory });
    };

    const addEmploymentHistory = () => {
        setFormData({
            ...formData,
            employmentHistory: [...formData.employmentHistory, { schoolName: "", position: "", startDate: "", endDate: "" }],
        });
    };

    const handleAchievementsChange = (index, e) => {
        const updatedAchievements = [...formData.achievements];
        updatedAchievements[index] = e.target.value;
        setFormData({ ...formData, achievements: updatedAchievements });
    };

    const addAchievement = () => {
        if (formData.achievements.some((achievement, index) => achievement.trim() === "" && index !== 0)) {
            toast.error("Please fill all achievement fields before adding a new one.");
            return;
        }
        setFormData({
            ...formData,
            achievements: [...formData.achievements, ""],
        });
    };

    const removeAchievement = (index) => {
        const updatedAchievements = [...formData.achievements];
        updatedAchievements.splice(index, 1);
        setFormData({ ...formData, achievements: updatedAchievements });
    };

    const isNextDisabled = () => {
        return formData.achievements.some((achievement) => achievement.trim() === "");
    }; 

    const nextStep = () => {
        if(step === 1){
            const { name, email, contactNumber, dob, address } = formData;
            if (!name.trim() || !email.trim() || !contactNumber.trim() || !dob.trim() || !address.trim()) {
                toast.error("All personal details are required.");
                return false;
            }
        }
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const validateUsername = (username) => {
        const hasNumber = /\d/;
        return username.length >= 6 && hasNumber.test(username);
    };

    const validatePassword = (password) => {
        const hasNumber = /\d/;
        return password.length >= 6 && hasNumber.test(password);
    };

    const validateForm = () => {
        const { name, email, contactNumber, dob, address, qualifications, experience, employmentHistory, username, password } = formData;

        if (!name.trim() || !email.trim() || !contactNumber.trim() || !dob.trim() || !address.trim()) {
            toast.error("All personal details are required.");
            return false;
        }
        if (!qualifications.trim()) {
            toast.error("Qualifications are required.");
            return false;
        }

        if (isExperienced) {
            if (!experience || isNaN(experience) || experience <= 0) {
                toast.error("Experience should be a positive number.");
                return false;
            }

            const hasEmploymentHistory = employmentHistory.some(
                (job) => job.schoolName.trim() !== "" && job.position.trim() !== ""
            );

            if (!hasEmploymentHistory) {
                toast.error("At least one employment history is required.");
                return false;
            }

            if (isCurrentlyServing && !formData.currentSchool) {
                toast.error("Current school is required if you are currently serving.");
                return false;
            }
        }

        if (!validateUsername(username)) {
            toast.error("Username must be at least 6 characters and contain at least one digit.");
            return false;
        }

        if (!validatePassword(password)) {
            toast.error("Password must be at least 6 characters and contain at least one digit.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Form is invalid!");
            return;
        }

        const updatedFormData = {
            ...formData,
            experience: isExperienced ? formData.experience : null,
            employmentHistory: isExperienced ? formData.employmentHistory : [],
            currentSchool: isCurrentlyServing ? formData.currentSchool : null,
            qualifications: formData.qualifications.split(",").map((q) => q.trim()),
        };

        console.log("Form Data Submitted:", updatedFormData);
        try {
            var jsonResponseSignup = await axios.post("http://localhost:5000/api/users/signup", updatedFormData, {
                headers: { "Content-Type": "application/json" },
            });
            var { status } = jsonResponseSignup.data;
            if (status) {
                toast.success("Account created successfully!");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                toast.error("Failed to create account. Please try again!");
            }
        } catch (error) {
            console.error("Error submitting form:", error.response.data);
            toast.error("Error creating account. Please try again.");
        }
    };

    return (
        <div className="signupform">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="step-indicator">
                    <div className={step >= 1 ? "active" : ""}></div>
                    <div className={step >= 2 ? "active" : ""}></div>
                    <div className={step >= 3 ? "active" : ""}></div>
                    <div className={step >= 4 ? "active" : ""}></div>
                </div>

                {step === 1 && (
                    <div className="signupLabel">
                        <h2>Personal Details</h2>
                        <br />
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Contact Number:
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Date of Birth:
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Address:
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </label>
                        <br />
                        <label>
                            Profile Picture (Optional):
                            <input type="file" name="profilePicture" onChange={handleChange} />
                        </label>
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="signupLabel">
                        <h2>Professional Details</h2>
                        <br />
                        <label>
                            Qualifications (Comma Separated)*:
                            <input
                                type="text"
                                name="qualifications"
                                value={formData.qualifications}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Are you experienced?
                            <input
                                type="checkbox"
                                checked={isExperienced}
                                onChange={(e) => {
                                    setIsExperienced(e.target.checked);
                                    if (!e.target.checked) {
                                        setIsCurrentlyServing(false);
                                    }
                                }}
                            />
                        </label>
                        {isExperienced && (
                            <>
                                <label>
                                    Experience (in years):
                                    <input
                                        type="number"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                    />
                                </label>

                                <h3>Employment History</h3>
                                {formData.employmentHistory.map((job, index) => (
                                    <div key={index} className="employment-history">
                                        <Select
                                            options={schoolOptions}
                                            name="schoolName"
                                            value={schoolOptions.find((option) => option.value === job.schoolName)}
                                            onChange={(selectedOption) =>
                                                handleEmploymentChange(index, {
                                                    target: { name: "schoolName", value: selectedOption.value },
                                                })
                                            }
                                        />
                                        <label>
                                            Position:
                                            <input
                                                type="text"
                                                name="position"
                                                value={job.position}
                                                onChange={(e) => handleEmploymentChange(index, e)}
                                            />
                                        </label>
                                        <label>
                                            Start Date:
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={job.startDate}
                                                onChange={(e) => handleEmploymentChange(index, e)}
                                            />
                                        </label>
                                        <label>
                                            End Date:
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={job.endDate}
                                                onChange={(e) => handleEmploymentChange(index, e)}
                                            />
                                        </label>
                                    </div>
                                ))}
                                <button type="button" onClick={addEmploymentHistory}>
                                    Add Another Employment
                                </button>
                                <label>
                                    Are you currently serving?
                                    <input
                                        type="checkbox"
                                        checked={isCurrentlyServing}
                                        onChange={(e) => setIsCurrentlyServing(e.target.checked)}
                                    />
                                </label>

                                {isCurrentlyServing && (
                                    <label>
                                        Current School:
                                        <Select
                                            options={schoolOptions}
                                            name="currentSchool"
                                            value={schoolOptions.find((option) => option.value === formData.currentSchool)}
                                            onChange={(selectedOption) =>
                                                setFormData({ ...formData, currentSchool: selectedOption.value })
                                            }
                                        />
                                    </label>
                                )}
                            </>
                        )}
                        <br />
                        <button type="button" onClick={prevStep}>
                            Previous
                        </button>
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="signupLabel">
                        <h2>Achievements</h2>
                        {formData.achievements.map((achievement, index) => (
                            <div key={index} className="achievementRow">
                                <input
                                    type="text"
                                    name="achievement"
                                    value={achievement}
                                    onChange={(e) => handleAchievementsChange(index, e)}
                                    placeholder="Enter achievement"
                                    required
                                    style={{marginBottom: 0}}
                                />
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="removeAchievementBtn"
                                        onClick={() => removeAchievement(index)}
                                        style={{margin:0}}
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addAchievement}
                            disabled={!formData.achievements[0].trim()} 
                        >
                            Add Another Achievement
                        </button>
                        <br />
                        <br />
                        <label>
                            Passed the Exam?
                            <input
                                type="checkbox"
                                name="passedExam"
                                checked={formData.passedExam}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <button type="button" onClick={prevStep}>Previous</button>
                        <button type="button" onClick={nextStep} disabled={isNextDisabled()}>
                            Next
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div className="signupLabel">
                        <h2>Account Details</h2>
                        <label>
                            Username (at least 6 characters, 1 digit):
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Password (at least 6 characters, 1 digit):
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <button type="button" onClick={prevStep}>
                            Previous
                        </button>
                        <button type="submit">Signup</button>
                    </div>
                )}
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;