import React, { useState } from 'react';
import './style.css';
const FacultyRegister = () => {
    const [name, setName] = useState('');
    const [empId, setEmpId] = useState('');
    const [password, setPassword] = useState('');
    const [isHOD, setIsHOD] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/faculty/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, empId, password, isHOD }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Display the response message
                setIsRegistered(true);
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    if (isRegistered) {
        return (
            <div>
                <h1>Registration Successful!</h1>
                <p>Please proceed to login.</p>
                <a href="/Faculty/login">Go to Login</a>
            </div>
        );
    }

    return (
        <div className='container'>
            <h1>Faculty Registration Form</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Employee ID"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <label>
                    <input
                        type="checkbox"
                        checked={isHOD}
                        onChange={(e) => setIsHOD(e.target.checked)}
                    />
                    Is HOD
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/Faculty/login">Login</a></p>
        </div>
    );
};

export default FacultyRegister;
