import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/Constants';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email, password });
            setMessage("Login successful!");
            const user = response.data.data.user;
            localStorage.setItem('uid', user.uid);
            localStorage.setItem('username', user.username);
            localStorage.setItem('email', user.email);
            localStorage.setItem('createdAt', user.createdAt);
            navigate('/home');
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            await axios.post(`${BASE_URL}/api/v2/auth/signup`, { email, password });
            setMessage("Signup successful!");
            localStorage.setItem('username', name);
            localStorage.setItem('email', email);
            setIsLogin(true);
        } catch (err) {
            setError("Signup failed. Please try again.");
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setError('');
        setMessage('');
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen p-4 bg-cover bg-center"
            style={{ backgroundImage: "url('/main_bg_2.jpg')" }} // Outer container background
        >
            <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-lg bg-white rounded-lg overflow-hidden">
                {/* Left Panel */}
                <div
                    className="hidden md:block w-1/2 bg-primary-dark p-10 text-white flex flex-col justify-center bg-cover bg-center"
                    style={{ backgroundImage: "url('/left-panel-image.jpg')" }}
                >
                    <h1 className="text-4xl font-bold mb-4">Welcome Back, Fitness Enthusiast!</h1>
                    <p className="text-lg mb-6">
                        {!isLogin
                            ? "Already have an account? Log in and explore your dashboard!"
                            : "Don't have an account yet? Sign up and join our community!"}
                    </p>

                    <ul className="list-disc ml-5 space-y-2 text-md">
                        <li>💪 Access exclusive workout plans and nutrition guides designed for your goals.</li>
                        <li>🔐 Easily and securely manage your membership and progress.</li>
                        <li>🎯 Get personalized training tips and class recommendations.</li>
                        <li>🧘‍♂️ Enjoy priority support from our expert fitness team.</li>
                        <li>📲 Stay in the loop with the latest gym events, offers, and health tips.</li>
                    </ul>

                    <p className="mt-6 text-sm text-gray-200">
                        Sign up now to unlock all these benefits and take full advantage of everything we have to offer!
                    </p>
                </div>


                {/* Right Panel - Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        {isLogin ? 'Login to Your Account' : 'Create an Account'}
                    </h2>

                    {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                    <form
                        onSubmit={isLogin ? handleLogin : handleSignup}
                        className="space-y-4"
                    >
                        {!isLogin && (
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition-all transform hover:scale-105"

                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        {isLogin ? (
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <span
                                    className="text-primary font-semibold cursor-pointer hover:underline"
                                    onClick={() => {
                                        setIsLogin(false);
                                        resetForm();
                                    }}
                                >
                                    Sign up
                                </span>
                            </p>
                        ) : (
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <span
                                    className="text-primary font-semibold cursor-pointer hover:underline"
                                    onClick={() => {
                                        setIsLogin(true);
                                        resetForm();
                                    }}
                                >
                                    Log in
                                </span>
                            </p>
                        )}
                    </div>

                    <div
                        className="mt-6 text-center text-sm text-gray-500 cursor-pointer hover:font-bold"
                        onClick={() => navigate('/home')}
                    >
                        Admin Access
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
