import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homestyle.css';

const HomePage = () => {
    const [isStudentOpen, setIsStudentOpen] = useState(false);
    const [isFacultyOpen, setIsFacultyOpen] = useState(false);
    const [isWardenOpen, setIsWardenOpen] = useState(false);

    const navigate = useNavigate();

    const toggleStudentDropdown = () => {
        setIsStudentOpen(!isStudentOpen);
    };

    const toggleFacultyDropdown = () => {
        setIsFacultyOpen(!isFacultyOpen);
    };

    const toggleWardenDropdown = () => {
        setIsWardenOpen(!isWardenOpen);
    };

    const handleStudentLogin = () => {
        navigate('/Student/Login');
    };

    const handleStudentRegister = () => {
        navigate('/Student/Register');
    };

    const handleFacultyLogin = () => {
        navigate('/Faculty/Login');
    };

    const handleFacultyRegister = () => {
        navigate('/Faculty/Register');
    };

    const handleWardenLogin = () => {
        navigate('/Warden/Login');
    };


    return (
        <div>
            <h1>Hostel Managment System</h1>
            <div className='home'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='student'>
                        <button onClick={toggleStudentDropdown}>Student</button>
                        {isStudentOpen && (
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={handleStudentLogin}>Login</button>
                                <button onClick={handleStudentRegister}>Register</button>
                            </div>
                        )}
                    </div>
                    <div className='faculty'>
                        <button onClick={toggleFacultyDropdown}>Faculty</button>
                        {isFacultyOpen && (
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={handleFacultyLogin}>Login</button>
                                <button onClick={handleFacultyRegister}>Register</button>
                            </div>
                        )}
                    </div>
                    <div className='warden'>
                        <button onClick={toggleWardenDropdown}>Warden</button>
                        {isWardenOpen && (
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={handleWardenLogin}>Login</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;