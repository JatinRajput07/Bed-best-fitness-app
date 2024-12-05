import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/userSlice";
import { fetchAssignments, createAssignment } from "../../redux/assignUserSlice";
import Select from "react-select";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const CreateAssignment = () => {
  const dispatch = useDispatch();
  const { users, loading: usersLoading, error: usersError } = useSelector((state) => state.users);
  const { assignments, loading: assignmentsLoading, error: assignmentsError } = useSelector((state) => state.assignments);

  const [selectedHost, setSelectedHost] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchUsers({}));
    dispatch(fetchAssignments());
  }, [dispatch]);

  const hosts = users.filter((user) => user.role === "host");

  const unassignedUsers = useMemo(() => {
    const assignedUserIds = assignments.flatMap((a) => a.asign_user.map((u) => u._id));
    return users.filter(
      (user) => !assignedUserIds.includes(user._id) && user.role === "user"
    );
  }, [assignments, users]);

  const userOptions = unassignedUsers.map((user) => ({
    value: user._id,
    label: `${user.name} (${user.email})`,
  }));

  const validateForm = () => {
    const formErrors = {};
    if (!selectedHost) formErrors.host = "Host is required.";
    if (selectedUsers.length === 0) formErrors.users = "At least one user is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    dispatch(
      createAssignment({
        host: selectedHost,
        asign_user: selectedUsers.map((user) => user.value),
      })
    );
    alert("Assignment created successfully!");
    setSelectedHost(null);
    setSelectedUsers([]);
    setErrors({});
  };

  if (usersLoading || assignmentsLoading) {
    return <Typography className="text-center mt-6">Loading...</Typography>;
  }

  if (usersError || assignmentsError) {
    return (
      <Typography className="text-center mt-6 text-red-500">
        Error loading data. Please try again.
      </Typography>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-4 p-6">
          <Typography variant="h6" color="white">
            Create Assignment
          </Typography>
        </CardHeader>
        <CardBody className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Host
            </label>
            <select
              value={selectedHost || ""}
              onChange={(e) => setSelectedHost(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            >
              <option value="" disabled>
                Select Host
              </option>
              {hosts.map((host) => (
                <option key={host._id} value={host._id}>
                  {host.name}
                </option>
              ))}
            </select>
            {errors.host && (
              <Typography color="red" className="text-sm mt-1">
                {errors.host}
              </Typography>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Users
            </label>
            <Select
              isMulti
              options={userOptions}
              value={selectedUsers}
              onChange={(selected) => setSelectedUsers(selected || [])}
              placeholder="Select users"
            />
            {errors.users && (
              <Typography color="red" className="text-sm mt-1">
                {errors.users}
              </Typography>
            )}
          </div>

          <Button color="blue" onClick={handleSubmit}>
            Create Assignment
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateAssignment;
