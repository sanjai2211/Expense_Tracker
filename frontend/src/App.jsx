import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Tracker from './Tracker'; // Assuming you have a Tracker component for after login

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Tracker" element={<Tracker />} />
                {/* <Route path="/EditTransaction" element={<EditTransaction />} /> */}

            </Routes>
        </BrowserRouter>
    );
}

export default App;
