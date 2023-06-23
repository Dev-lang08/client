import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Login = () => {
    const [regNo, setRegNo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/student/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ regNo, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Display the response message
                console.log(data.data);

                // Redirect to the Student Info page with the student data and token
                navigate('/Student/info', { state: { studentData: data.data, token: data.token } });
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Registration Number"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/Student/register">Register</a>
            </p>
        </div>
    );
};

export default Login;
