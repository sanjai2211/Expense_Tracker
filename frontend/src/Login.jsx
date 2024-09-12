import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';// Import the CSS file

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password }).then(
            result => {
                console.log(result);
                toast(result.data);
                if (result.data === "success") {
                    navigate('/tracker');
                }
            }
        ).catch(
            err => console.log(err)
        );
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='on'
                            name="email"
                            className='form-control'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='on'
                            name="password"
                            className='form-control'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>
                        Login
                    </button>
                </form>
                <p>Don't Have an account?</p>
                <Link to='/' className='link-btn'>
                    Register
                </Link>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
