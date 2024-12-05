import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments, deleteAssignment } from "../../../redux/assignUserSlice";
import { Button, Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

const AdminAssignments = () => {
    const dispatch = useDispatch();
    const { assignments, loading, error } = useSelector((state) => state.assignments);

    

    useEffect(() => {
        dispatch(fetchAssignments());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this assignment?")) {
            dispatch(deleteAssignment(id));
        }
    };

    if (loading) return <Typography className="text-center mt-6">Loading...</Typography>;
    if (error) return <Typography className="text-center mt-6 text-red-500">Error: {error}</Typography>;

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="p-6">
                    <Typography variant="h6" color="white">
                        Assignments List
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
                                        Users
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map(({ _id, host, asign_user }, index) => (
                                    <tr
                                        key={_id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                                    >
                                        <td className="border border-gray-300 px-4 py-2">
                                            <Typography className="text-gray-800">
                                                {host.name} <span className="text-gray-500">({host.email})</span>
                                            </Typography>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {asign_user.map((user) => (
                                                <Typography
                                                    key={user._id}
                                                    className="text-gray-800"
                                                >
                                                    {user.name} <span className="text-gray-500">({user.email})</span>
                                                </Typography>
                                            ))}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <Button
                                                color="red"
                                                onClick={() => handleDelete(_id)}
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
