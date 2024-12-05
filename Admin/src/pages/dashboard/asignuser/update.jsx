import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments, editAssignment } from "../../../redux/assignUserSlice";
import { fetchUsers } from "../../../redux/userSlice";
import Select from "react-select";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";

const EditAssignment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { assignments, loading: assignmentsLoading } = useSelector((state) => state.assignments);
    const { users, loading: usersLoading } = useSelector((state) => state.users);

    const [selectedHost, setSelectedHost] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchAssignments());
        dispatch(fetchUsers());
    }, [dispatch]);


    useEffect(() => {
        const assignment = assignments.find((a) => a._id === id);
        if (assignment) {
            setSelectedHost(assignment.host._id);

            setSelectedUsers(
                assignment.asign_user.map((user) => ({
                    value: user._id,
                    label: `${user.name} (${user.email})`,
                }))
            );
        }
    }, [assignments, id]);

    const hosts = users.filter((user) => user.role === "host");


    const availableUsers = useMemo(() => {
        const assignedUserIds = assignments.flatMap((a) => a.asign_user.map((u) => u._id));
        return users.filter(
            (user) => (selectedUsers.some((u) => u.value === user._id) || !assignedUserIds.includes(user._id)) && user.role === "user"
        );
    }, [assignments, users, selectedUsers]);

    const options = users
        .filter((user) => user.role === "user")
        .map((user) => ({
            value: user._id,
            label: `${user.name} (${user.email})`,
        }));

    const validateForm = () => {
        const validationErrors = {};
        if (!selectedHost) validationErrors.host = "Host is required.";
        if (selectedUsers.length === 0) validationErrors.users = "At least one user must be selected.";
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        dispatch(
            editAssignment({
                id,
                data: {
                    host: selectedHost,
                    asign_user: selectedUsers.map((user) => user.value),
                },
            })
        );
        alert("Assignment updated successfully!");
        navigate("/admin/assignments"); // Redirect after successful update
    };

    if (assignmentsLoading || usersLoading) {
        return <Typography className="text-center mt-6">Loading...</Typography>;
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="p-6">
                    <Typography variant="h6" color="white">
                        Edit Assignment
                    </Typography>
                </CardHeader>
                <CardBody className="p-6 space-y-6">
                    {/* Host Selection */}
                    <div>
                        <Typography variant="small" className="mb-2">
                            Select a Host
                        </Typography>
                        <select
                            value={selectedHost || ""}
                            onChange={(e) => setSelectedHost(e.target.value)}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="" disabled>
                                Select Host
                            </option>
                            {hosts.map((host) => (
                                <option key={host._id} value={host._id}>
                                    {host.name} ({host.email})
                                </option>
                            ))}
                        </select>
                        {errors.host && (
                            <Typography color="red" className="text-sm mt-1">
                                {errors.host}
                            </Typography>
                        )}
                    </div>

                    {/* Users Selection */}
                    <div>
                        <Typography variant="small" className="mb-2">
                            Select Users
                        </Typography>
                        <Select
                            isMulti
                            options={options}
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

                    {/* Submit Button */}
                    <Button onClick={handleSubmit} color="blue" className="mt-4">
                        Update Assignment
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default EditAssignment;
