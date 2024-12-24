import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Switch,
    Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import { createUser, fetchUsers, updateUser } from "@/redux/userSlice";

const permissionSections = [
    {
        name: "Video",
        permissions: ["create", "update", "view", "delete"],
    },
    {
        name: "Nutrition",
        permissions: ["create", "update", "view", "delete"],
    },
    {
        name: "Meal",
        permissions: ["create", "update", "view", "delete"],
    },
];

const CreateOrUpdateUser = ({ editUserId = null }) => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.users || { users: [] });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "host",
        permissions: {}, // Permissions structure: { section: { permission: true/false } }
    });

    // Fetch all users and set data if editing
    useEffect(() => {
        dispatch(fetchUsers());
        if (editUserId) {
            const userToEdit = users.find((user) => user.id === editUserId);
            if (userToEdit) {
                setFormData({
                    name: userToEdit.name || "",
                    email: userToEdit.email || "",
                    role: userToEdit.role || "admin",
                    permissions: userToEdit.permissions || {},
                });
            }
        }
    }, [dispatch, editUserId, users]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle permission toggling
    const handlePermissionToggle = (section, permission) => {
        setFormData((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [section]: {
                    ...prev.permissions[section],
                    [permission]: !prev.permissions[section]?.[permission],
                },
            },
        }));
    };

    // Handle form submission
    const handleSubmit = () => {
        if (editUserId) {
            // Update user
            dispatch(updateUser({ id: editUserId, data: formData }));
            alert("User updated successfully!");
        } else {

            // console.log(formData,'=====formData===')
            // Create new user
            dispatch(createUser(formData));
            alert("User created successfully!");
        }
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        {editUserId ? "Edit User Permissions" : "Create New User"}
                    </Typography>
                </CardHeader>
                <CardBody className="space-y-6">
                    {/* User Info Section */}
                    <div className="space-y-4">
                        <Input
                            type="text"
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            type="email"
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />

                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />

                        <Select
                            value={{ label: formData.role, value: formData.role }}
                            options={[
                                // { label: "User", value: "user" },
                                { label: "Host", value: "host" },
                                // { label: "Admin", value: "admin" },
                            ]}
                            onChange={(selected) =>
                                setFormData((prev) => ({ ...prev, role: selected.value }))
                            }
                        />
                    </div>

                    {/* Permissions Section */}
                    <div>
                        <Typography variant="small" className="text-gray-600 font-bold mb-2">
                            Assign Permissions
                        </Typography>
                        {permissionSections.map((section) => (
                            <div key={section.name} className="mb-6">
                                <Typography variant="small" className="text-gray-800 font-semibold">
                                    {section.name}
                                </Typography>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {section.permissions.map((permission) => (
                                        <div key={permission} className="flex items-center gap-2">
                                            <Typography variant="small">{permission}</Typography>
                                            <Switch
                                                checked={
                                                    formData.permissions[section.name]?.[permission] || false
                                                }
                                                onChange={() => handlePermissionToggle(section.name, permission)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        variant="gradient"
                        color="blue"
                        disabled={!formData.name || !formData.email}
                    >
                        {editUserId ? "Update User" : "Create User"}
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default CreateOrUpdateUser;
