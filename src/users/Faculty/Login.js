import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [empId, setEmpId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/faculty/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ empId, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Display the response message
                console.log(data.data);

                // Redirect to the Faculty Info page with the faculty data
                navigate('/Faculty/info', { state: { facultyData: data.data } });
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
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/Faculty/register">Register</a>
            </p>
        </div>
    );
};

export default Login;
