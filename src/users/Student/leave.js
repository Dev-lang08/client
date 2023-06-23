import React, { useState, useEffect } from 'react';

const LeaveRequests = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [newLeave, setNewLeave] = useState({
        leaveID: '',
        leaveType: '',
        leaveDate: '',
        leaveTime: '',
        leaveDuration: ''
    });

    useEffect(() => {
        fetchLeaveData();
    }, []);

    const fetchLeaveData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/student/leave/');
            const data = await response.json();
            setLeaveData(data.data.leave);
        } catch (error) {
            console.error('Error fetching leave data:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
    };

    const handleCreateLeave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/v1/student/leave/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLeave)
            });
            const data = await response.json();
            setLeaveData([...leaveData, data]);
            setNewLeave({
                leaveID: '',
                leaveType: '',
                leaveDate: '',
                leaveTime: '',
                leaveDuration: ''
            });
        } catch (error) {
            console.error('Error creating leave request:', error);
        }
    };

    const handleUpdateLeave = async (leaveId, updatedLeave) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/student/leave/${leaveId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedLeave)
            });
            const data = await response.json();
            const updatedLeaveData = leaveData.map((leave) => (leave.leaveID === leaveId ? data : leave));
            setLeaveData(updatedLeaveData);
        } catch (error) {
            console.error('Error updating leave request:', error);
        }
    };

    const handleDeleteLeave = async (leaveId) => {
        try {
            await fetch(`http://localhost:8000/api/v1/student/leave/${leaveId}`, {
                method: 'DELETE'
            });
            const updatedLeaveData = leaveData.filter((leave) => leave.leaveID !== leaveId);
            setLeaveData(updatedLeaveData);
        } catch (error) {
            console.error('Error deleting leave request:', error);
        }
    };

    return (
        <div>
            <h1>Leave Requests</h1>

            <h2>Create Leave Request</h2>
            <form onSubmit={handleCreateLeave}>
                <label>
                    Leave ID:
                    <input
                        type="text"
                        name="leaveID"
                        value={newLeave.leaveID}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Leave Type:
                    <input
                        type="text"
                        name="leaveType"
                        value={newLeave.leaveType}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Leave Date:
                    <input
                        type="text"
                        name="leaveDate"
                        value={newLeave.leaveDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Leave Time:
                    <input
                        type="text"
                        name="leaveTime"
                        value={newLeave.leaveTime}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Leave Duration:
                    <input
                        type="text"
                        name="leaveDuration"
                        value={newLeave.leaveDuration}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>

            <h2>Existing Leave Requests</h2>
            {leaveData.length > 0 ? (
                <ul>
                    {leaveData.map((leave) => (
                        <li key={leave.leaveID}>
                            Leave ID: {leave.leaveID}
                            <br />
                            Leave Type: {leave.leaveType}
                            <br />
                            Leave Date: {leave.leaveDate}
                            <br />
                            Leave Time: {leave.leaveTime}
                            <br />
                            Leave Duration: {leave.leaveDuration}
                            <br />
                            <button onClick={() => handleUpdateLeave(leave.leaveID, { ...leave, leaveType: 'Updated Type' })}>
                                Update
                            </button>
                            <button onClick={() => handleDeleteLeave(leave.leaveID)}>Delete</button>
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No leave requests found.</p>
            )}
        </div>
    );
};

export default LeaveRequests;
