import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

const Login = () => {
    const [block, setBlock] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigateTo = useNavigate();

    const handleBlockChange = (event) => {
        setBlock(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/v1/warden/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    block: block,
                    password: password,
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                // Handle successful login, e.g., store user data and token in state or localStorage
                console.log('User successfully obtained:', responseData.data);
                console.log('Token:', responseData.token);
                localStorage.setItem('authorizationKey', responseData.token);
                // Redirect to the info page
                // navigateTo('/Warden/info?authorizationKey=${responseData.token}');
                navigateTo('/Warden/info');
            } else if (response.status === 401) {
                setError('Unauthorized');
            } else if (response.status === 404) {
                setError('Not Found');
            } else {
                setError('Bad Request');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='container'>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <label>
                Block:
                <input type="text" value={block} onChange={handleBlockChange} />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
