import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './infostyle.css'

const StudentInfo = () => {
    const location = useLocation();
    const studentData = location.state.studentData;
    const token = location.state.token;
    const navigate = useNavigate();

    const handleMyInfoClick = () => {
        navigate('/Student/myinfo', { state: { token: token } });
    };

    return (
        <div className='container'>

            {studentData ? (
                <div>
                    <div className=''>
                        <h1>Student Info</h1>
                        <p>Id: {studentData.id}</p>
                        <p>Name: {studentData.name}</p>
                        <p>Registration Number: {studentData.regNo}</p>
                        {/* Display other student details here */}

                        <p>Token: {token}</p>
                    </div>
                    <div className='functions'>
                        <h2>Applications:</h2>

                        <button onClick={handleMyInfoClick}>My Info</button>
                        <ul>
                            <li>
                                <Link to="/leave">Leave</Link>
                            </li>
                            <li>
                                <Link to="/complain">Complain</Link>
                            </li>
                            <li>
                                <Link to="/hosteldetail">Hostel Detail</Link>
                            </li>
                            <li>
                                <Link to="/courses">Course</Link>
                            </li>
                            <li>
                                <Link to="/event">Event</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p>No student data available</p>
            )}
        </div>
    );
};

export default StudentInfo;
