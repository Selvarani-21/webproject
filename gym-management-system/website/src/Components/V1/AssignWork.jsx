import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BASE_URL } from '../../api/Constants';

const AssignWork = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalData, setModalData] = useState(null); // To manage modal state
    const [assignedWork, setAssignedWork] = useState('');
    const [hours, setHours] = useState('');

    // Fetch employee availability data from the API
    useEffect(() => {
        const fetchEmployeeAvailability = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/employee-availability`);
                const availabilityData = response.data.data || [];
                setEmployees(availabilityData);
                setFilteredEmployees(availabilityData);
            } catch (error) {
                console.error('Failed to fetch employee availability:', error);
            }
        };

        fetchEmployeeAvailability();
    }, []);

    // Open the modal to edit work
    const handleEditWork = (employee) => {
        setModalData(employee); // Set the current employee data
        setAssignedWork(employee.assignedWork || '');
        setHours(employee.numberOfHours || '');
    };

    // Close the modal
    const closeModal = () => {
        setModalData(null);
        setAssignedWork('');
        setHours('');
    };

    // Call API to edit work
    const submitEditWork = async () => {
        try {
            await axios.put(`${BASE_URL}/api/v1/employee-availability/${modalData._id}`, {
                assignedWork,
                assignedBy: localStorage.getItem('uid'),
                numberOfHours: parseInt(hours, 10),
            });

            Swal.fire({
                icon: 'success',
                title: 'Details Updated',
                text: 'details have been successfully updated.',
                confirmButtonColor: '#1D4ED8',
            });

            // Update the employee data locally
            setEmployees((prev) =>
                prev.map((emp) =>
                    emp._id === modalData._id
                        ? { ...emp, assignedWork, numberOfHours: parseInt(hours, 10) }
                        : emp
                )
            );
            setFilteredEmployees((prev) =>
                prev.map((emp) =>
                    emp._id === modalData._id
                        ? { ...emp, assignedWork, numberOfHours: parseInt(hours, 10) }
                        : emp
                )
            );

            closeModal();
        } catch (error) {
            console.error('Failed to update work:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Update Work',
                text: 'An error occurred while updating work details. Please try again.',
                confirmButtonColor: '#1D4ED8',
            });
        }
    };

    // Call API to delete work
    const handleDeleteWork = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/v1/employee-availability/${id}`);

            Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: 'details have been successfully deleted.',
                confirmButtonColor: '#1D4ED8',
            });

            // Update the employee data locally
            setEmployees((prev) => prev.filter((emp) => emp._id !== id));
            setFilteredEmployees((prev) => prev.filter((emp) => emp._id !== id));
        } catch (error) {
            console.error('Failed to delete work:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Delete Work',
                text: 'An error occurred while deleting work details. Please try again.',
                confirmButtonColor: '#1D4ED8',
            });
        }
    };

    // Search employees by name or assigned work
    const handleSearch = (term) => {
        setSearchTerm(term);
        const filtered = employees.filter((employee) =>
            employee.user?.username?.toLowerCase().includes(term.toLowerCase()) ||
            employee.assignedWork?.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    return (
        <div
            className="flex flex-col items-center p-6 bg-gray-100 min-h-screen"
            style={{
                backgroundImage: `url('/main_bg_2.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                filter: 'brightness(95%)',
                opacity: 0.85,
            }}
        >
            <h2 className="text-3xl font-bold mb-8 border-2 p-2 bg-primary text-white rounded-2xl">
            Membership Details
            </h2>

            <div className="flex w-full max-w-4xl mb-6">
                <input
                    type="text"
                    placeholder="Search by Member Id or Name"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <table className="w-full max-w-6xl table-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-primary text-white">
                    <tr>
                        <th className="py-2 px-4">Member ID</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Join Date</th>
                        <th className="py-2 px-4">Renewal Due In</th>
                        <th className="py-2 px-4">Membership Status</th>
                        <th className="py-2 px-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                            <tr
                                key={employee._id}
                                className="text-gray-800 text-center border-b hover:bg-gray-100"
                            >
                                <td className="py-2 px-4">{employee.user?.id || '---'}</td>
                                <td className="py-2 px-4">{employee.user?.username || '---'}</td>
                                <td className="py-2 px-4">
                                    {employee.date ? new Date(employee.date).toLocaleDateString() : '---'}
                                </td>
                                <td className="py-2 px-4">{employee.numberOfHours || '---'}</td>
                                <td className="py-2 px-4">{employee.assignedWork || '---'}</td>
                                <td className="py-2 px-4 flex justify-center space-x-4">
                                    <button
                                        onClick={() => handleEditWork(employee)}
                                        className="bg-primary p-2 rounded hover:bg-primary-dark text-white"
                                    >
                                        Edit 
                                    </button>
                                    <button
                                        onClick={() => handleDeleteWork(employee._id)}
                                        className="bg-red-600 p-2 rounded hover:text-red-800 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                No Member data found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for Editing Work */}
            {modalData && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">
                            Edit membership details for {modalData.user?.username || 'Employee'}
                        </h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Renewal due In</label>
                            <input
                                type="number"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                placeholder="Enter hours"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Membership Status</label>
                            <input
                                type="text"
                                value={assignedWork}
                                onChange={(e) => setAssignedWork(e.target.value)}
                                placeholder="Enter work details"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 py-1 px-3 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitEditWork}
                                className="bg-indigo-500 text-white py-1 px-3 rounded-lg hover:bg-indigo-600 transition"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignWork;
