import React, { useState, useEffect } from 'react';
import Axios from '../../config';


function AssignHost() {
    const [users, setUsers] = useState([]);
    const [hosts, setHosts] = useState([]);
    const [assignments, setAssignments] = useState({});

    // Fetch users and hosts on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await Axios.get('/admin/user-list'); // Replace with your admin endpoint
                const hostRes = await Axios.get('/admin/user-list'); // Replace with your API endpoint

                setUsers(userRes.data.users.filter(item => item.role !== 'host'));
                setHosts(hostRes.data.users.filter(item => item.role !== 'user'));
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    const handleAssignHost = async (userId, hostId) => {
        try {
            const res = await Axios.post('/api/v1/admin/assign-host', { userId, hostId });

            if (res.status === 200) {
                setAssignments(prevAssignments => ({
                    ...prevAssignments,
                    [userId]: hostId
                }));
            }
        } catch (error) {
            console.error('Error assigning host', error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Users</h3>
                    <ul className="space-y-3">
                        {users.map(user => (
                            <li key={user._id} className="flex justify-between items-center">
                                <span>{user.name} ({user.email})</span>

                                {/* Assign host dropdown */}
                                {assignments[user._id] ? (
                                    <span className="text-green-600">Assigned to Host</span>
                                ) : (
                                    <select
                                        className="bg-gray-200 p-2 rounded-md"
                                        onChange={(e) => handleAssignHost(user._id, e.target.value)}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select Host</option>
                                        {hosts.map(host => (
                                            <option key={host._id} value={host._id}>
                                                {host.name} ({host.email})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Hosts</h3>
                    <ul className="space-y-3">
                        {hosts.map(host => (
                            <li key={host._id} className="flex justify-between items-center">
                                <span>{host.name} ({host.email})</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AssignHost;
