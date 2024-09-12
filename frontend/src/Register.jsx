import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // State to handle error messages
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                if (result.data.message === "User already registered") {
                    setError("User already registered. Please log in.");
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);  // Redirect to login after 2 seconds
                } else {
                    console.log(result);
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='container'>
            <div className='reg-container'>
                <h2>Register</h2>
                {error && <p className='error-message'>{error}</p>} {/* Display error message */}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            autoComplete='off'
                            name="name"
                            required
                            className='form-control'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            name="email"
                            required
                            className='form-control'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            name="password"
                            required
                            className='form-control'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>Register</button>
                </form>
                <p>Already Have an account
                <Link to='/login' className='link-btn'>
                    Login
                </Link></p>
            </div>
        </div>
    );
}

export default Register;
