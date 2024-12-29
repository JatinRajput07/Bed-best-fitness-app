import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments, deleteAssignment } from "../../../redux/assignUserSlice";
import { Button, Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";

const AdminAssignments = () => {
    const dispatch = useDispatch();
    const { assignments, loading, error } = useSelector((state) => state.assignments);

    useEffect(() => {
        dispatch(fetchAssignments());
    }, [dispatch]);

    const handleDelete = (id, type, userId) => {
        if (window.confirm("Are you sure you want to proceed?")) {
            dispatch(deleteAssignment({ id, type, userId }))
            .then(res => {
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(fetchAssignments());
                    toast.success('Success')
                }
            });
        }
    };

    if (loading) return <Typography className="text-center mt-6">Loading...</Typography>;
    if (error) return <Typography className="text-center mt-6 text-red-500">Error: {error}</Typography>;

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="p-6">
                    <Typography variant="h6" color="white">
                        Assign Users List
                    </Typography>
                </CardHeader>
                <CardBody className="p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">
                                        Host
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">
                                        Assigned Users
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map(({ _id, hostName, hostEmail, assignedUsers }, index) => (
                                    <tr
                                        key={_id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                                    >
                                        {/* Host Details */}
                                        <td className="border border-gray-300 px-4 py-2">
                                            <Typography className="text-gray-800">
                                                {hostName} <span className="text-gray-500">({hostEmail})</span>
                                            </Typography>
                                        </td>

                                        {/* Assigned Users */}
                                        <td className="border border-gray-300 px-4 py-2">
                                            {assignedUsers.map(({ userId, name, email, assignedAt }) => (
                                                <div key={userId} className="mb-2 flex items-center justify-between">
                                                    <div>
                                                        <Typography className="text-gray-800">
                                                            {name} <span className="text-gray-500">({email})</span>
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            className="text-gray-400"
                                                        >
                                                            Assigned At: {new Date(assignedAt).toLocaleString()}
                                                        </Typography>
                                                    </div>
                                                    <Button
                                                        color="red"
                                                        onClick={() => handleDelete(_id, "user", userId)}
                                                        size="sm"
                                                        className="ml-4 p-1"
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                        </td>

                                        {/* Actions */}
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <Button
                                                color="red"
                                                onClick={() => handleDelete(_id, "assignment")}
                                                size="sm"
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default AdminAssignments;
