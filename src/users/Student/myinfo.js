import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MyInfo = () => {
    const [myInfoData, setMyInfoData] = useState(null);
    const [wardenData, setWardenData] = useState(null);
    const location = useLocation();
    const token = location.state.token;

    useEffect(() => {
        const fetchMyInfoData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/student/me/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setMyInfoData(data.data);
            } catch (error) {
                console.error('Error fetching my info data:', error);
            }
        };

        const fetchWardenData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/student/me/my-warden', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setWardenData(data.data);
            } catch (error) {
                console.error('Error fetching warden data:', error);
            }
        };

        fetchMyInfoData();
        fetchWardenData();
    }, [token]);

    return (
        <div className='container'>
            <h1>My Info</h1>
            {myInfoData ? (
                <div className=''>
                    <p>Name: {myInfoData.name}</p>
                    <p>Email: {myInfoData.email}</p>
                    <p>Phone Number: {myInfoData.phone_number}</p>
                    <p>Block: {myInfoData.block}</p>
                    <p>Registration Number: {myInfoData.regNo}</p>
                    <p>Room Number: {myInfoData.Room ? myInfoData.Room.roomNo : null}</p>

                    <h2>Complaints:</h2>
                    {myInfoData.complaint.length > 0 ? (
                        <ul>
                            {myInfoData.complaint.map((complaint) => (
                                <li key={complaint.id}>
                                    <p>Type: {complaint.complaintType}</p>
                                    <p>Date: {complaint.complaintDate}</p>
                                    <p>Description: {complaint.complaintDescription}</p>
                                    <p>Severity: {complaint.complaintSeverity}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No complaints found.</p>
                    )}

                    <h2>Leaves:</h2>
                    {myInfoData.leave.length > 0 ? (
                        <ul>
                            {myInfoData.leave.map((leave) => (
                                <li key={leave.id}>
                                    <p>Type: {leave.leaveType}</p>
                                    <p>Date: {leave.leaveDate}</p>
                                    <p>Time: {leave.leaveTime}</p>
                                    <p>Duration: {leave.LeaveDuration}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No leaves found.</p>
                    )}

                    {wardenData && (
                        <div>
                            <h2>Warden Details:</h2>
                            <p>Warden Name: {wardenData.name}</p>
                            <p>Warden Block: {wardenData.block}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading my info data...</p>
            )}
        </div>
    );
};

export default MyInfo;
