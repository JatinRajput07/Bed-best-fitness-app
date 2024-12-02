import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/userSlice";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";

const AssignUsersToHost = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users || { users: [] });

  const hosts = users.filter((user) => user.role === "host");
  const allUsers = users.filter((user) => user.role === "user");

  const [selectedHost, setSelectedHost] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, searchQuery: "" }));
  }, [dispatch]);

  const handleUserSelect = (userId) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prev) => [...prev, userId]);
    }
  };

  const handleUserRemove = (userId) => {
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  const handleAssign = () => {
    if (selectedHost && selectedUsers.length > 0) {
      // Call the assign function here
      alert(`Users assigned to Host ${selectedHost} successfully!`);
      setSelectedHost(null);
      setSelectedUsers([]);
    } else {
      alert("Please select both a host and at least one user.");
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Assign Users to Hosts
          </Typography>
        </CardHeader>
        <CardBody className="p-6">
          <div className="mb-4">
            <Typography variant="small" color="gray" className="mb-2">
              Select a Host
            </Typography>
            <select
              value={selectedHost || ""}
              onChange={(e) => setSelectedHost(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-indigo-500"
            >
              <option value="" disabled>
                Choose Host
              </option>
              {hosts.map((host) => (
                <option key={host.id} value={host.id}>
                  {host.name}
                </option>
              ))}
            </select>
          </div>

          {selectedHost && (
            <div className="mb-4">
              <Typography variant="small" color="gray" className="mb-2">
                Select Users to Assign
              </Typography>
              <div className="border border-gray-300 rounded-md p-2 max-h-40 overflow-auto">
                {allUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 border-b last:border-none cursor-pointer hover:bg-gray-100"
                    onClick={() => handleUserSelect(user.id)}
                  >
                    <span>{user.name}</span>
                    {selectedUsers.includes(user.id) && (
                      <span className="text-indigo-600">Selected</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap mt-4 gap-2">
                {selectedUsers.map((userId) => {
                  const user = allUsers.find((u) => u.id === userId);
                  return (
                    <div
                      key={userId}
                      className="flex items-center bg-indigo-500 text-white px-3 py-1 rounded-full"
                    >
                      <span className="mr-2">{user?.name}</span>
                      <button
                        onClick={() => handleUserRemove(userId)}
                        className="text-white font-bold focus:outline-none"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <Button
            onClick={handleAssign}
            color="blue"
            className={`mt-4 ${selectedHost && selectedUsers.length > 0 ? "" : "opacity-50 cursor-not-allowed"}`}
            disabled={!selectedHost || selectedUsers.length === 0}
          >
            Assign Users to Host
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default AssignUsersToHost;
