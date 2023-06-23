import React from 'react';
import { useLocation } from 'react-router-dom';
import './infostyle.css';

const FacultyInfo = () => {
    const location = useLocation();
    const facultyData = location.state.facultyData;

    return (
        <div className='container'>
            <h1>Faculty Info</h1>
            {facultyData ? (
                <div>
                    <p>id: {facultyData.id}</p>
                    <p>Name: {facultyData.name}</p>
                    <p>Employee ID: {facultyData.empId}</p>
                    {/* Display other faculty details here */}
                </div>
            ) : (
                <p>No faculty data available</p>
            )}
        </div>
    );
};

export default FacultyInfo;
