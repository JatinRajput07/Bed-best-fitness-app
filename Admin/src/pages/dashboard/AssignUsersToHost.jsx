import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Select, MultiSelect, Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { fetchUsers } from '@/redux/userSlice';

const AssignUsersToHost = () => {
  const dispatch = useDispatch();
  const [selectedHost, setSelectedHost] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [errors, setErrors] = useState('');
  
  // Redux state to get users data (you might need to adjust this part based on your Redux setup)
  const { users, loading, error } = useSelector((state) => state.users);

  console.log(users,'=====users')

  const hosts = users.filter(user => user.role === "host");
  const allUsers = users.filter(user => user.role === "user");

  useEffect(() => {
    if (selectedHost) {
      const assigned = selectedHost.assignedUsers || [];
      setAssignedUsers(assigned);

      // Filter out assigned users from available users list
      const filteredUsers = allUsers.filter(user => !assigned.some(assignedUser => assignedUser.id === user.id));
      setAvailableUsers(filteredUsers);
    }
  }, [selectedHost, allUsers]);


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleHostChange = (host) => {
    setSelectedHost(host);
  };

  const handleUserChange = (selected) => {
    setSelectedUsers(selected);
  };

  const handleSubmit = () => {
    if (!selectedHost) {
      setErrors('Please select a host.');
      return;
    }

    if (selectedUsers.length === 0) {
      setErrors('Please select at least one user.');
      return;
    }


    console.log(selectedHost.id, selectedUsers)
    // Call the parent function to assign the users
    // onAssignUsers(selectedHost.id, selectedUsers);
    setErrors('');
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue-gray" className="mb-4 p-6">
          <Typography variant="h6" color="white">
            Assign Users to Host
          </Typography>
        </CardHeader>

        <CardBody className="p-6 space-y-6">
          {errors && <Typography color="red" className="text-sm">{errors}</Typography>}

          {/* Host Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Host</label>
            <Select
              value={selectedHost}
              onChange={handleHostChange}
              options={hosts.map(host => ({ value: host, label: host.name }))}
              placeholder="Select a host"
              isClearable
            />
          </div>

          {/* Users Selection */}
          {selectedHost && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Users</label>
              <MultiSelect
                value={selectedUsers}
                onChange={handleUserChange}
                options={availableUsers.map(user => ({ value: user, label: user.name }))}
                placeholder="Select users"
              />
            </div>
          )}

          {/* Submit Button */}
          <Button
            color="blue"
            onClick={handleSubmit}
            disabled={selectedUsers.length === 0}
          >
            Assign Users
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default AssignUsersToHost;
