import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaQuestionCircle, FaClock } from 'react-icons/fa';
import { FaBagShopping } from 'react-icons/fa6';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    // Don't show the header if the current path is "/"
    if (location.pathname === '/') return null;

    // Static content for navigation
    const navItems = [
        {
            label: ' My Classes',
            icon: <FaClock className="text-lg md:text-2xl" />,
            path: '/submit-availability',
        },
        {
            label: 'Membership Details',
            icon: <FaBagShopping className="text-lg md:text-2xl" />,
            path: '/assign-work',
        },
        {
            label: 'Profile',
            icon: <FaUser className="text-lg md:text-2xl" />,
            path: '/profile',
        },
    ];

    return (
        <div className="flex items-center justify-between p-3 bg-gradient-to-r bg-primary shadow-md">
            {/* Logo and Title */}
            <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate('/home')}
            >
                <img
                    src={'/main_logo.png'}
                    alt="Logo"
                    className="w-10 bg-white rounded-full h-10 mr-2 object-contain"
                />
                <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-white">
                FitTrack Hub
                </h1>
            </div>

            {/* Navigation links */}
            <div className="flex space-x-8 md:space-x-8 pr-4">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className="cursor-pointer text-white hover:text-gray-200 transition-colors duration-300 flex flex-col items-center"
                        title={item.label}
                    >
                        {item.icon}
                        <span className="text-xs md:text-sm mt-1">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Header;
