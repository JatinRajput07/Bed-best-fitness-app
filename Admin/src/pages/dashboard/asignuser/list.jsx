import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAssignments,
    deleteAssignment,
    updateAssignmentImage,
} from "../../../redux/assignUserSlice";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const AdminAssignments = () => {
    const dispatch = useDispatch();
    const { assignments, loading, error } = useSelector((state) => state.assignments);

    const fileInputsRef = useRef({}); // Track refs by assignmentId-userId pair

    useEffect(() => {
        dispatch(fetchAssignments());
    }, [dispatch]);

    const handleDelete = (id, type, userId) => {
        if (window.confirm("Are you sure you want to proceed?")) {
            dispatch(deleteAssignment({ id, type, userId }))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        dispatch(fetchAssignments());
                        toast.success("Assignment deleted successfully!");
                    }
                })
                .catch((err) => {
                    toast.error("Failed to delete assignment.");
                    console.error("Delete error:", err);
                });
        }
    };

    const handleImageUpload = (event, assignmentId) => {
        const file = event.target.files[0];
        if (!file) {
            toast.error("No image selected.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        dispatch(updateAssignmentImage({ assignmentId, imageData: formData }))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    toast.success("Image uploaded successfully!");
                    dispatch(fetchAssignments());
                }
            })
            .catch((err) => {
                toast.error("Image upload failed.");
                console.error("Image upload error:", err);
            });
    };

    if (loading)
        return <Typography className="text-center mt-6">Loading...</Typography>;
    if (error)
        return (
            <Typography className="text-center mt-6 text-red-500">
                Error: {error}
            </Typography>
        );

    return (
        <div className="mt-12 mb-8 flex flex-col gap-8">
            <CardHeader variant="gradient" color="gray" className="p-6">
                <Typography variant="h6" color="white">
                    Assign Users List
                </Typography>
            </CardHeader>
            {assignments.map(({ _id, hostName, hostEmail, assignedUsers }) => (
                <Card key={_id} className="w-full mx-auto shadow-lg">
                    <CardHeader
                        color="transparent"
                        className="p-4 flex items-center justify-between border-b border-blue-gray-50 rounded-none"
                        floated={false}
                        shadow={false}
                    >
                        <div className="flex items-center gap-4">
                            <Avatar
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    hostName
                                )}&background=random&color=fff`}
                                alt={hostName}
                                size="lg"
                            />
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    {hostName}
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-normal"
                                >
                                    {hostEmail}
                                </Typography>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody className="p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold mb-3 flex items-center gap-1"
                        >
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
                                        <th className="px-4 py-2 text-left text-gray-700 font-semibold text-sm">
                                            User
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-semibold text-sm">
                                            Email
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-semibold text-sm">
                                            Assignment Image
                                        </th>
                                        <th className="px-4 py-2 text-center text-gray-700 font-semibold text-sm">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignedUsers.map(
                                        (
                                            { userId, name, email, imageUrl, assignedAt },
                                            userIndex
                                        ) => {
                                            const inputKey = `${_id}-${userId}`;
                                            return (
                                                <tr
                                                    key={inputKey}
                                                    className={
                                                        userIndex % 2 === 0
                                                            ? "bg-white"
                                                            : "bg-gray-50"
                                                    }
                                                >
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar
                                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                                    name
                                                                )}&background=random&color=fff`}
                                                                alt={name}
                                                                size="sm"
                                                            />
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-semibold"
                                                            >
                                                                {name}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Typography
                                                            variant="small"
                                                            color="gray"
                                                            className="font-normal"
                                                        >
                                                            {email}
                                                        </Typography>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt="Assignment"
                                                                className="h-12 w-12 object-cover rounded-md"
                                                            />
                                                        ) : (
                                                            <Typography
                                                                variant="small"
                                                                color="gray"
                                                                className="font-normal"
                                                            >
                                                                No image
                                                            </Typography>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            {/* Upload Image Button */}
                                                            <Button
                                                                variant="outlined"
                                                                size="sm"
                                                                className="py-1 px-3 text-xs flex items-center gap-1"
                                                                onClick={() =>
                                                                    fileInputsRef.current[inputKey]?.click()
                                                                }
                                                            >
                                                                <PhotoIcon className="h-4 w-4" />
                                                                Upload Image
                                                            </Button>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                ref={(el) =>
                                                                    (fileInputsRef.current[inputKey] = el)
                                                                }
                                                                onChange={(e) =>
                                                                    handleImageUpload(e, assignedUsers[userIndex]._id
                                                                    )
                                                                }
                                                            />

                                                            {/* Delete Button */}
                                                            <Button
                                                                variant="text"
                                                                color="red"
                                                                size="sm"
                                                                className="rounded-full p-2"
                                                                onClick={() =>
                                                                    handleDelete(_id, "user", userId)
                                                                }
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center mt-4 text-sm text-gray-500 border-t border-blue-gray-50 pt-3">
                            <Typography variant="small" color="gray" className="font-normal">
                                Created:{" "}
                                {assignedUsers.length > 0
                                    ? new Date(
                                          assignedUsers[0].assignedAt
                                      ).toLocaleDateString("en-US", {
                                          month: "numeric",
                                          day: "numeric",
                                          year: "numeric",
                                      })
                                    : "N/A"}
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                {assignedUsers.length} users
                            </Typography>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default AdminAssignments;
