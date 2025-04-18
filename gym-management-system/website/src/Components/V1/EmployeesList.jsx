import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/Constants';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    // Fetch employee availability data from the API
    useEffect(() => {
        const fetchEmployeeAvailability = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/employee-availability`);
                console.log('response.data.data: ', response.data.data)
                const availabilityData = response.data.data || [];
                setEmployees(availabilityData);
                setFilteredEmployees(availabilityData);
            } catch (error) {
                console.error("Failed to fetch employee availability:", error);
            }
        };

        fetchEmployeeAvailability();
    }, []);

    // Search employees by name or assigned work
    const handleSearch = (term) => {
        setSearchTerm(term);
        const filtered = employees.filter((employee) =>
            employee.uid?.toLowerCase().includes(term.toLowerCase()) ||
            employee.assignedWork?.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    // Sort employees by column
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedEmployees = [...filteredEmployees].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredEmployees(sortedEmployees);
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
            Active Members List
            </h2>

            <div className="flex w-full max-w-4xl mb-6">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <table className="w-full max-w-6xl table-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-primary text-white">
                    <tr>
                        <th
                            className="py-2 px-4 cursor-pointer"
                            onClick={() => handleSort('id')}
                        >
                           Member ID
                        </th>
                        <th
                            className="py-2 px-4 cursor-pointer"
                            onClick={() => handleSort('uid')}
                        >
                            Name
                        </th>
                        <th
                            className="py-2 px-4 cursor-pointer"
                            onClick={() => handleSort('date')}
                        >
                           Join Date
                        </th>
                        <th
                            className="py-2 px-4 cursor-pointer"
                            onClick={() => handleSort('numberOfHours')}
                        >
                            Renewal Due In
                        </th>
                        <th
                            className="py-2 px-4 cursor-pointer"
                            onClick={() => handleSort('assignedWork')}
                        >
                            Membership Status
                        </th>
                        <th
                            className="py-2 px-4 cursor-pointer"
                            onClick={() => handleSort('assignedBy')}
                        >
                            Trainer Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                            <tr
                                key={employee._id}
                                className="text-gray-800 text-center border-b hover:bg-gray-100"
                            >
                                <td className="py-2 px-4">{employee.user ? employee.user.id || '---' : '---'}</td>
                                <td className="py-2 px-4">{employee.user ? employee.user.username || '---' : '---'}</td>
                                <td className="py-2 px-4">
                                    {employee.date ? new Date(employee.date).toLocaleDateString() : '---'}
                                </td>
                                <td className="py-2 px-4">{employee.numberOfHours || '---'}</td>
                                <td className="py-2 px-4">{employee.assignedWork || '---'}</td>
                                <td className="py-2 px-4">{employee.manager ? employee.manager.username || '---' : '---'}</td>
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
        </div>
    );
};

export default EmployeeList;
