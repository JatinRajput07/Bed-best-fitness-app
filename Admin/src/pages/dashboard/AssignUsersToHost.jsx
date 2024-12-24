import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/userSlice";
import { fetchAssignments, createAssignment } from "../../redux/assignUserSlice";
import Select, { components } from "react-select";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const { users, loading: usersLoading, error: usersError } = useSelector((state) => state.users);
  const { assignments = [], loading: assignmentsLoading, error: assignmentsError } = useSelector((state) => state.assignments);

  const [selectedHost, setSelectedHost] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchUsers({}));
    dispatch(fetchAssignments());
  }, [dispatch]);

  // Filter hosts
  const hosts = users.filter((user) => user.role === "host");

  // Filter unassigned users
  const unassignedUsers = useMemo(() => {
    const assignedUserIds = assignments.flatMap((assignment) =>
      assignment.assignedUsers.map((user) => user.userId) || []
    );
    return users.filter(
      (user) => !assignedUserIds.includes(user._id) && user.role === "user"
    );
  }, [assignments, users]);

  const userOptions = unassignedUsers.map((user) => ({
    value: user._id,
    label: user.name ? user.name : user.email,
    email: user.email,
  }));

  const hostOptions = hosts.map((host) => ({
    value: host._id,
    label: host.name,
    email: host.email,
  }));

  // Custom option rendering for React-Select
  const CustomOption = ({ data, innerRef, innerProps }) => (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
    >
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">
          {data.label} {/* Name or Email (fallback) */}
        </span>
        {data.email && (
          <span className="text-sm text-gray-500">{data.email}</span>
        )}
      </div>
    </div>
  );


  const validateForm = () => {
    const formErrors = {};
    if (!selectedHost) formErrors.host = "Host is required.";
    if (selectedUsers.length === 0) formErrors.users = "At least one user is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = () => {
    if (!validateForm()) return;

    dispatch(
      createAssignment({
        host: selectedHost,
        asign_user: selectedUsers.map((user) => user.value),
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("success");
        navigate("/dashboard/assign-users-list");
        setSelectedHost(null);
        setSelectedUsers([]);
        setErrors({});
      }
    })

  };

  // Loading state
  if (usersLoading || assignmentsLoading) {
    return <Typography className="text-center mt-6">Loading...</Typography>;
  }

  // Error state
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
          {/* Select Host */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Host
            </label>
            <Select
              options={hostOptions}
              value={hostOptions.find((host) => host.value === selectedHost)}
              onChange={(selected) => setSelectedHost(selected?.value || null)}
              components={{ Option: CustomOption }}
              placeholder="Select a host"
              className="react-select-container"
              classNamePrefix="react-select"
            />
            {errors.host && (
              <Typography color="red" className="text-sm mt-1">
                {errors.host}
              </Typography>
            )}
          </div>

          {/* Select Users */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Users
            </label>
            <Select
              isMulti
              options={userOptions}
              value={selectedUsers}
              onChange={(selected) => setSelectedUsers(selected || [])}
              components={{ Option: CustomOption }}
              placeholder="Select users"
              className="react-select-container"
              classNamePrefix="react-select"
            />
            {errors.users && (
              <Typography color="red" className="text-sm mt-1">
                {errors.users}
              </Typography>
            )}
          </div>

          {/* Submit Button */}
          <Button color="blue" onClick={handleSubmit}>
            Create Assignment
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateAssignment;
