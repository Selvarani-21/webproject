import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../api/Constants';

const Profile = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({ username: '', email: '' });
    const [users, setUsers] = useState([]); // State to store the list of users

    // Random color generator for avatar background
    const getRandomColor = () => {
        const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const avatarBgColor = getRandomColor();

    // Fetch current user data from localStorage
    useEffect(() => {
        const username = localStorage.getItem('username') || 'User';
        const email = localStorage.getItem('email') || 'user@example.com';
        setCurrentUser({ username, email });
    }, []);

    // Fetch list of all users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/auth/users`);
                const result = await response.json();
                if (response.ok) {
                    setUsers(result.data.users);
                } else {
                    throw new Error(result.message || 'Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                Swal.fire('Error', error.message, 'error');
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: 'You have successfully logged out.',
            confirmButtonColor: '#1D4ED8',
        });
        navigate('/');
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center bg-gray-100 p-6"
            style={{
                backgroundImage: `url('/main_bg_3.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full mb-6">
                <div
                    className={`mx-auto w-28 h-28 flex items-center justify-center rounded-full mb-6 ${avatarBgColor} text-white text-4xl font-bold shadow-lg`}
                >
                    {currentUser && currentUser.username.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">{currentUser.username}</h2>
                <p className="text-lg text-gray-600 text-center mb-4">{currentUser.email}</p>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Logout
                </button>
            </div>

            {/* List of all users */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">All Members</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Member Id</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.uid} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center py-4 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;
