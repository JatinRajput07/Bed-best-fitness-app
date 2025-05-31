import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments, deleteAssignment } from "../../../redux/assignUserSlice";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    IconButton, // For pagination arrows
} from "@material-tailwind/react";
import {
    XMarkIcon, // For the remove user button
    ArrowRightIcon, // For pagination next button
    ArrowLeftIcon,  // For pagination previous button
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const AdminAssignments = () => {
    const dispatch = useDispatch();
    const { assignments, loading, error } = useSelector((state) => state.assignments);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2); // Display 2 host assignments per page, adjust as needed

    useEffect(() => {
        // For server-side pagination, you would pass currentPage and itemsPerPage here:
        // dispatch(fetchAssignments({ page: currentPage, limit: itemsPerPage }));
        // For client-side (current implementation), just fetch all once:
        dispatch(fetchAssignments());
    }, [dispatch]); // Only re-fetch on component mount

    const handleDelete = (id, type, userId) => {
        if (window.confirm("Are you sure you want to delete this?")) { // Confirmation box
            dispatch(deleteAssignment({ id, type, userId }))
                .then(res => {
                    if (res.meta.requestStatus === "fulfilled") {
                        toast.success('Deleted successfully!');
                        // Re-fetch assignments to update the list after deletion
                        // For server-side pagination, you might re-fetch the current page
                        dispatch(fetchAssignments());
                    } else if (res.meta.requestStatus === "rejected") {
                        toast.error(res.payload || 'Failed to delete.');
                    }
                })
                .catch(() => {
                    toast.error('An unexpected error occurred.');
                });
        }
    };

    // --- Update Image/User Actions ---
    const handleHostImageUpdate = (hostId) => {
        // This would typically navigate to an update page or open a modal
        toast.info(`Simulating update image for host ID: ${hostId}`);
        // Example: window.location.href = `/admin/hosts/${hostId}/edit-image`;
    };

    const handleAssignedUserUpdate = (assignmentId, userId) => {
        // This would typically navigate to a user-specific assignment edit page or open a modal
        toast.info(`Simulating update for assigned user ID: ${userId} in assignment: ${assignmentId}`);
        // Example: window.location.href = `/admin/assignments/${assignmentId}/users/${userId}/edit`;
    };

    // --- Pagination Logic (Client-Side) ---
    const indexOfLastAssignment = currentPage * itemsPerPage;
    const indexOfFirstAssignment = indexOfLastAssignment - itemsPerPage;
    const currentAssignments = assignments.slice(indexOfFirstAssignment, indexOfLastAssignment);

    const totalPages = Math.ceil(assignments.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    if (loading) return <Typography className="text-center mt-6">Loading...</Typography>;
    if (error) return <Typography className="text-center mt-6 text-red-500">Error: {error}</Typography>;

    return (
        <div className="mt-12 mb-8 flex flex-col gap-8">
            {currentAssignments.length === 0 && !loading && !error ? (
                <Typography className="text-center mt-6 text-gray-600">No assignments found.</Typography>
            ) : (
                currentAssignments.map(({ _id, hostName, hostEmail, assignedUsers }) => (
                    <Card key={_id} className="w-full mx-auto shadow-lg"> {/* Full width */}
                        {/* Host Card Header */}
                        <CardHeader
                            color="transparent"
                            className="p-4 flex items-center justify-between border-b border-blue-gray-50 rounded-none"
                            floated={false}
                            shadow={false}
                        >
                            <div className="flex items-center gap-4">
                                <Avatar
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(hostName)}&background=random&color=fff`}
                                    alt={hostName}
                                    size="lg"
                                />
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        {hostName}
                                    </Typography>
                                    <Typography variant="small" color="gray" className="font-normal">
                                        {hostEmail} {/* Displaying hostEmail as the "type" text */}
                                    </Typography>
                                </div>
                            </div>
                            <Button variant="outlined" size="sm" onClick={() => handleHostImageUpdate(_id)}>
                                Update Image {/* Button to update host image */}
                            </Button>
                        </CardHeader>

                        {/* Assigned Users Section */}
                        <CardBody className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold mb-3 flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Assigned Users ({assignedUsers.length})
                            </Typography>

                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-2 text-left text-gray-700 font-semibold text-sm">User</th>
                                            <th className="px-4 py-2 text-left text-gray-700 font-semibold text-sm">Email</th>
                                            <th className="px-4 py-2 text-left text-gray-700 font-semibold text-sm">Assignment Image</th>
                                            <th className="px-4 py-2 text-center text-gray-700 font-semibold text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignedUsers.map(({ userId, name, email, assignmentImage }, userIndex) => (
                                            <tr key={userId} className={userIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                {/* User Column */}
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar
                                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`}
                                                            alt={name}
                                                            size="sm"
                                                        />
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                {/* Email Column */}
                                                <td className="px-4 py-3">
                                                    <Typography variant="small" color="gray" className="font-normal">
                                                        {email}
                                                    </Typography>
                                                </td>
                                                {/* Assignment Image Column */}
                                                <td className="px-4 py-3">
                                                    {assignmentImage ? (
                                                        <img
                                                            src={assignmentImage}
                                                            alt="Assignment"
                                                            className="h-12 w-12 object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        <Typography variant="small" color="gray" className="font-normal">
                                                            No image
                                                        </Typography>
                                                    )}
                                                </td>
                                                {/* Actions Column */}
                                                <td className="px-4 py-3 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Button
                                                            variant="outlined"
                                                            size="sm"
                                                            className="py-1 px-3 text-xs"
                                                            onClick={() => handleAssignedUserUpdate(_id, userId)} // Update button with action
                                                        >
                                                            Update
                                                        </Button>
                                                        <IconButton
                                                            variant="text"
                                                            color="red"
                                                            size="sm"
                                                            className="rounded-full" // Use IconButton for icon-only button
                                                            onClick={() => handleDelete(_id, "user", userId)}
                                                        >
                                                            <XMarkIcon className="h-4 w-4" /> {/* Cross icon for remove */}
                                                        </IconButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Card Footer */}
                            <div className="flex justify-between items-center mt-4 text-sm text-gray-500 border-t border-blue-gray-50 pt-3">
                                <Typography variant="small" color="gray" className="font-normal">
                                    Created: {new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    {assignedUsers.length} users
                                </Typography>
                            </div>
                        </CardBody>
                    </Card>
                ))
            )}

            {/* Pagination Controls */}
            {assignments.length > itemsPerPage && ( // Only show pagination if there's more than one page
                <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                        variant="text"
                        className="flex items-center gap-2"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                    </Button>
                    <Typography color="gray" className="font-normal">
                        Page <strong className="text-blue-gray">{currentPage}</strong> of{" "}
                        <strong className="text-blue-gray">{totalPages}</strong>
                    </Typography>
                    <Button
                        variant="text"
                        className="flex items-center gap-2"
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AdminAssignments;