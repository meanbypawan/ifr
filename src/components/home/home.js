import { useState } from 'react';
import './home1.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux-data/UserSlice';
import Api from '../../api/Api';

export default function Home() {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signIn = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(Api.USER_SIGN_IN, { mobile, password });
            dispatch(
                saveUser({
                    secretKey: response.data.token,
                    name: response.data.user.Name,
                    userId: response.data.user._id
                })
            );
            navigate("/exam-dashboard");
        } catch (err) {
            toast.error(err?.response?.data?.error || "Login failed");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="login-wrapper">
                <div className="login-card">
                    
                    {/* Left Section */}
                    <div className="login-banner">
                        <h2>Our Mission</h2>
                        <p>उन्नत राष्ट्र की कल्पना<br />कम्प्यूटर साक्षरता घर घर पहुँचाना</p>
                    </div>

                    {/* Right Section */}
                    <div className="login-form">
                        <img src="logo.png" alt="logo" className="logo" />

                        <h3>Welcome Back 👋</h3>
                        <p className="subtitle">Sign in to continue</p>

                        <form onSubmit={signIn}>
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button type="submit">Get Started</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}
