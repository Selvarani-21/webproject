import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '../../api/Constants';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SubmitAvailabilityForm = () => {
    const [availability, setAvailability] = useState({
        date: '',
        hours: '',
    });
    const [availabilityList, setAvailabilityList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingAvailability, setEditingAvailability] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/employee-availability`, {
                params: { uid: localStorage.getItem('uid') },
            });
            setAvailabilityList(response.data.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch availability data.',
                confirmButtonColor: '#1D4ED8',
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAvailability((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingAvailability((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!availability.date || !availability.hours) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Fields',
                text: 'Please fill in all the fields.',
                confirmButtonColor: '#1D4ED8',
            });
            return;
        }

        const data = {
            date: new Date(availability.date).getTime(),
            numberOfHours: parseInt(availability.hours, 10),
            uid: localStorage.getItem('uid'),
        };

        try {
            const response = await axios.post(`${BASE_URL}/api/v1/employee-availability`, data);
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'scheduled',
                    text: 'Your schedule has been submitted.',
                    confirmButtonColor: '#1D4ED8',
                });
                setAvailability({ date: '', hours: '' });
                fetchAvailability();
            } else {
                throw new Error('Unexpected response');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: error.response?.data?.message || 'Something went wrong. Please try again later.',
                confirmButtonColor: '#1D4ED8',
            });
        }
    };

    const handleDelete = async (_id) => {
        try {
            await axios.delete(`${BASE_URL}/api/v1/employee-availability/${_id}`);
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Schedule deleted successfully.',
                confirmButtonColor: '#1D4ED8',
            });
            fetchAvailability();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Deletion Failed',
                text: 'Failed to delete availability.',
                confirmButtonColor: '#1D4ED8',
            });
        }
    };

    const openEditModal = (item) => {
        console.log('item : ', item)
        setEditingAvailability({
            ...item,
            hours: item.numberOfHours,
            date: new Date(item.date).toISOString().split('T')[0],
        });
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditingAvailability(null);
        setEditModalOpen(false);
    };

    const handleUpdate = async () => {
        if (!editingAvailability.date || !editingAvailability.hours) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Fields',
                text: 'Please fill in all the fields.',
                confirmButtonColor: '#1D4ED8',
            });
            return;
        }

        const data = {
            date: new Date(editingAvailability.date).getTime(),
            numberOfHours: parseInt(editingAvailability.hours, 10),
        };

        try {
            const response = await axios.put(
                `${BASE_URL}/api/v1/employee-availability/${editingAvailability._id}`,
                data
            );
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Availability updated successfully.',
                    confirmButtonColor: '#1D4ED8',
                });
                closeEditModal();
                fetchAvailability();
            } else {
                throw new Error('Unexpected response');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.response?.data?.message || 'Failed to update availability.',
                confirmButtonColor: '#1D4ED8',
            });
        }
    };

    const filteredAvailability = availabilityList.filter((item) =>
        item.assignedBy.includes(searchQuery) ||
            item.user ? item.user.username.includes(searchQuery) : ''
    );

    return (
        <div
            className="flex flex-col items-center min-h-screen bg-gray-100 pt-16"
            style={{
                backgroundImage: `url('/main_bg_1.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                filter: 'brightness(95%)',
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mb-8"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">
                Explore and reserve your next workout session
                </h2>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={availability.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="hours" className="block text-gray-700 font-medium mb-2">
                        Number of Hours
                    </label>
                    <input
                        type="number"
                        id="hours"
                        name="hours"
                        value={availability.hours}
                        onChange={handleChange}
                        placeholder="Enter hours (e.g., 8)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        min="1"
                        max="24"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
                >
                    Submit
                </button>
            </form>

            <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-4xl">
                <h2 className="text-xl font-bold mb-4 text-primary">Schedule</h2>
                <input
                    type="text"
                    placeholder="Search by date (e.g., 2023-12-01)"
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <table className="table-auto w-full border-collapse border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Member Id</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Hours</th>
                            <th className="border border-gray-300 px-4 py-2">MemberShip Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAvailability.length > 0 ? (
                            filteredAvailability.map((item) => (
                                <tr key={item._id}>

                                    <td className="border border-gray-300 px-4 py-2">{item.user ? item.user.username || 'User' : 'User'}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(item.date).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{item.numberOfHours}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.assignedWork || '----'}</td>
                                    <td className=" px-4 py-2 flex items-center justify-center">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="text-blue-600 hover:text-blue-800 mx-2 flex items-center"
                                        >
                                            <FaEdit className="mr-1" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-red-600 hover:text-red-800 mx-2 flex items-center"
                                        >
                                            <FaTrash className="mr-1" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="border border-gray-300 px-4 py-2">
                                    Schedule Not Found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Schedule</h2>
                        <div className="mb-4">
                            <label htmlFor="editDate" className="block text-gray-700 font-medium mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                id="editDate"
                                name="date"
                                value={editingAvailability.date}
                                onChange={handleEditChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="editHours" className="block text-gray-700 font-medium mb-2">
                                Number of Hours
                            </label>
                            <input
                                type="number"
                                id="editHours"
                                name="hours"
                                value={editingAvailability.hours}
                                onChange={handleEditChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                min="1"
                                max="24"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleUpdate}
                                className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
                            >
                                Save
                            </button>
                            <button
                                onClick={closeEditModal}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmitAvailabilityForm;
