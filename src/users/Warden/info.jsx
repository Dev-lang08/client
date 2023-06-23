import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WardenInfo = () => {
    const [authorizationKey, setAuthorizationKey] = useState('');
    const [wardenData, setWardenData] = useState(null);
    const [error, setError] = useState('');
    const navigateTo = useNavigate();

    const handleClick = () => {
        // Redirect to a new page
        navigateTo('/Warden/leave');
    }

    const handleClick1 = () => {
        // Redirect to a new page
        navigateTo('/Warden/complaint');
    }

    // const navigateToLeavePage = navigateTo('/Warden/leave');
    // const navigateToComplaintPage = navigateTo('/Warden/complaint');

    const handleAuthorizationKeyChange = (event) => {
        setAuthorizationKey(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/v1/warden/me/', {
                headers: {
                    authorization: authorizationKey,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                setWardenData(responseData.data);
                setError('');
                console.log("success");
            } else if (response.status === 401) {
                setError('Unauthorized');
            } else if (response.status === 404) {
                setError('Not Found');
            } else {
                setError('Failed to fetch Warden data');
            }
        } catch (error) {
            console.error('Error fetching Warden data:', error);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='container'>
            <h2>Warden Info</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Authorization Key: (Enter authorization key below)
                    <input
                        type="text"
                        value={authorizationKey}
                        onChange={handleAuthorizationKeyChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>}
            {
                wardenData && (
                    <div>
                        <p>Warden ID: {wardenData.id}</p>
                        <p>Name: {wardenData.name}</p>
                        <p>Block: {wardenData.block}</p>
                        <h3>Complaints:</h3>
                        {wardenData.complaint.map((complaint) => (
                            <div key={complaint.id}>
                                <p>Complaint ID: {complaint.id}</p>
                                <p>Complaint Type: {complaint.complaintType}</p>
                                <p>Complaint Date: {complaint.complaintDate}</p>
                                <p>Complaint Description: {complaint.complaintDescription}</p>
                                <p>Complaint Severity: {complaint.complaintSeverity}</p>
                                <p>Is Resolved: {complaint.isResolved ? 'Yes' : 'No'}</p>
                                <p>Student ID: {complaint.studentId}</p>
                                <p>Warden ID: {complaint.wardenId}</p>
                            </div>
                        ))}
                        <h3>Leaves:</h3>
                        {wardenData.leave.map((leave) => (
                            <div key={leave.id}>
                                <p>Leave ID: {leave.id}</p>
                                <p>Leave Type: {leave.leaveType}</p>
                                <p>Leave Date: {leave.leaveDate}</p>
                                <p>Leave Time: {leave.leaveTime}</p>
                                <p>Leave Duration: {leave.LeaveDuration}</p>
                                <p>Is Approved: {leave.isApproved ? 'Yes' : 'No'}</p>
                                <p>Is Rejected: {leave.isRejected ? 'Yes' : 'No'}</p>
                                <p>Student ID: {leave.studentId}</p>
                                <p>Warden ID: {leave.wardenId}</p>
                            </div>
                        ))}
                    </div>
                )}
            <div>
                <h2>Warden Actions</h2>
                {/* Render wardenData here */}
                {/* {/* <button onClick={navigateTo('/Warden/leave')}>Go to Leave Page</button> */}
                <button onClick={handleClick}>Go to Leave Page</button>
                <button onClick={handleClick}>Go to Complaint Page</button>
            </div>
        </div>

    );
};
export default WardenInfo