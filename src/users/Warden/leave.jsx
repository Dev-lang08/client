import React, { useState } from 'react';

const WardenLeave = () => {
    const [authorizationKey, setAuthorizationKey] = useState('');
    const [leaveData, setLeaveData] = useState(null);
    const [error, setError] = useState('');

    const handleAuthorizationKeyChange = (event) => {
        setAuthorizationKey(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/v1/warden/leave', {
                method: 'GET',
                headers: {
                    Authorization: `Token ${authorizationKey}`,
                },
            });

            const responseData = await response.json();

            if (response.ok) {
                setLeaveData(responseData.data);
            } else {
                setError('Error: ' + responseData.message);
            }
        } catch (error) {
            console.error('Error during leave request:', error);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='container'>
            <h2>Leave Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Authorization Key:
                    <input type="text" value={authorizationKey} onChange={handleAuthorizationKeyChange} />
                </label>
                <button type="submit">Submit</button>
            </form>

            {error && <p>{error}</p>}

            {leaveData && (
                <div>
                    <h3>Leave Details</h3>
                    <p>Leave ID: {leaveData.id}</p>
                    <p>Leave Type: {leaveData.leaveType}</p>
                    <p>Leave Date: {leaveData.leaveDate}</p>
                    <p>Leave Time: {leaveData.leaveTime}</p>
                    <p>Leave Duration: {leaveData.LeaveDuration}</p>
                    <p>Is Approved: {leaveData.isApproved ? 'Yes' : 'No'}</p>
                    <p>Is Rejected: {leaveData.isRejected ? 'Yes' : 'No'}</p>
                    <p>Student ID: {leaveData.studentId}</p>
                    <p>Warden ID: {leaveData.wardenId}</p>
                    {leaveData.Student && (
                        <div>
                            <h4>Student Details</h4>
                            <p>Student ID: {leaveData.Student.id}</p>
                            <p>Student Name: {leaveData.Student.name}</p>
                            <p>Registration Number: {leaveData.Student.regNo}</p>
                            <p>Room Number: {leaveData.Student.roomNo}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WardenLeave;
