import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, Typography, Dialog, DialogBody, DialogFooter, Input, Checkbox } from "@material-tailwind/react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Axios from "@/configs/Axios";
import toast from "react-hot-toast";

const Meeting = () => {
    const [image, setImage] = useState(null);
    const [googleMeetLink, setGoogleMeetLink] = useState("");
    const [selectedRole, setSelectedRole] = useState([]);
    const [meetingDate, setMeetingDate] = useState("");
    const [meetingTime, setMeetingTime] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [meetings, setMeetings] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editingMeeting, setEditingMeeting] = useState(null);
    const [deleteMeetingId, setDeleteMeetingId] = useState(null);
    const [category, setCategory] = useState("");
    // Add this new state for errors
    const [errors, setErrors] = useState({
        googleMeetLink: '',
        roles: '',
        meetingDate: '',
        meetingTime: '',
        category: '',
        image: ''
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const handleRoleChange = (role) => {
        setSelectedRole((prev) =>
            prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
        );
    };

    const handleOpenDialog = (meeting = null) => {
        if (meeting) {
            setEditingMeeting(meeting);
            setGoogleMeetLink(meeting.googleMeetLink);
            setSelectedRole(meeting.roles[0].split(','));
            setMeetingDate(meeting.meetingDate);
            setMeetingTime(meeting.meetingTime);
            setImagePreview(meeting.image);
            setCategory(meeting.category); // Set the category
        } else {
            setEditingMeeting(null);
            setGoogleMeetLink("");
            setSelectedRole([]);
            setMeetingDate("");
            setMeetingTime("");
            setImagePreview(null);
            setCategory(""); // Reset the category
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setImage(null);
        setGoogleMeetLink("");
        setSelectedRole([]);
        setMeetingDate("");
        setMeetingTime("");
        setImagePreview(null);
        setCategory(""); // Reset the category
        setOpenDialog(false);
        setEditingMeeting(null);
    };

    const handleSubmit = () => {
        // Reset errors
        setErrors({
            googleMeetLink: '',
            roles: '',
            meetingDate: '',
            meetingTime: '',
            category: '',
            image: ''
        });

        // Validate fields
        let hasError = false;
        const newErrors = {};

        if (!googleMeetLink.trim()) {
            newErrors.googleMeetLink = 'Meet link is required';
            hasError = true;
        }

        if (selectedRole.length === 0) {
            newErrors.roles = 'Please select at least one role';
            hasError = true;
        }

        if (!meetingDate) {
            newErrors.meetingDate = 'Meeting date is required';
            hasError = true;
        }

        if (!meetingTime) {
            newErrors.meetingTime = 'Meeting time is required';
            hasError = true;
        }

        if (!category) {
            newErrors.category = 'Category is required';
            hasError = true;
        }

        if (!editingMeeting && !image) {
            newErrors.image = 'Image is required';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("googleMeetLink", googleMeetLink);
        formData.append("roles", selectedRole);
        formData.append("meetingDate", meetingDate);
        formData.append("meetingTime", meetingTime);
        formData.append("category", category);
        if (image) {
            formData.append("image", image);
        }

        const url = editingMeeting ? `/admin/updateMeeting/${editingMeeting._id}` : "/admin/createMeeting";
        const method = editingMeeting ? "put" : "post";

        Axios[method](url, formData)
            .then((response) => {
                if (response.data.status === "success") {
                    fetchMeetings();
                    handleCloseDialog();
                }
            })
            .catch((error) => {
                console.error("Error submitting meeting:", error);
            })
            .finally(() => setLoading(false));
    };
    const fetchMeetings = () => {
        Axios.get("/admin/getMeeting")
            .then((response) => {
                if (response.data.status === "success") {
                    setMeetings(response.data.meeting);
                }
            })
            .catch((error) => {
                console.error("Error fetching meetings:", error);
            });
    };

    useEffect(() => {
        fetchMeetings();
    }, []);

    const handleDeleteConfirmation = (meetingId) => {
        setDeleteMeetingId(meetingId);
    };

    const handleDelete = () => {
        if (!deleteMeetingId) return;
        Axios.delete(`/admin/deleteMeeting/${deleteMeetingId}`)
            .then((response) => {
                if (response.data.status === "success") {
                    fetchMeetings();
                    toast.success('Meeting Deleted!');
                }
            })
            .catch((error) => {
                console.error("Error deleting meeting:", error);
            })
            .finally(() => setDeleteMeetingId(null));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="mt-12 mb-8 flex justify-center">
            <Card className="w-full max-w-7xl shadow-2xl">
                <CardHeader variant="gradient" className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-lg flex justify-between items-center">
                    <Typography variant="h4" color="white" className="font-bold">Meeting Management</Typography>
                    <Button 
                        className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 transition-all"
                        onClick={() => handleOpenDialog()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Meeting
                    </Button>
                </CardHeader>
                <CardBody className="p-6 space-y-6">
                    <TableContainer className="shadow-md rounded-lg">
                        <Table className="min-w-full">
                            <TableHead>
                                <TableRow className="bg-gray-100">
                                    <TableCell className="font-bold">Sr. No.</TableCell>
                                    <TableCell className="font-bold">Image</TableCell>
                                    <TableCell className="font-bold">Meet Link</TableCell>
                                    <TableCell className="font-bold">Date</TableCell>
                                    <TableCell className="font-bold">Time</TableCell>
                                    <TableCell className="font-bold">Roles</TableCell>
                                    <TableCell className="font-bold">Category</TableCell>
                                    <TableCell className="font-bold">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meetings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((meeting, index) => (
                                    <TableRow 
                                        key={meeting._id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <img 
                                                src={meeting.image} 
                                                alt="Meeting" 
                                                className="w-20 h-20 object-cover rounded-lg shadow-sm" 
                                            />
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">{meeting.googleMeetLink}</TableCell>
                                        <TableCell>{new Date(meeting.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(meeting.createdAt).toLocaleTimeString()}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1 flex-wrap">
                                                {meeting.roles.map(role => (
                                                    <span key={role} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                                                {meeting.category}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    className="bg-green-500 hover:bg-green-600 flex items-center gap-1"
                                                    onClick={() => handleOpenDialog(meeting)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-red-500 hover:bg-red-600 flex items-center gap-1"
                                                    onClick={() => handleDeleteConfirmation(meeting._id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    <TablePagination
                        className="mt-4"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={meetings.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>

            {/* Add/Edit Meeting Dialog */}
            <Dialog open={openDialog} handler={handleCloseDialog} size="lg">
                <DialogBody className="max-h-[80vh] overflow-y-auto p-6">
                    <div className="space-y-6">
                        <Typography variant="h4" className="text-center mb-6 text-blue-600">
                            {editingMeeting ? "Edit Meeting" : "Add New Meeting"}
                        </Typography>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <Input
                                        label="Meet Link"
                                        value={googleMeetLink}
                                        onChange={(e) => setGoogleMeetLink(e.target.value)}
                                        className="!border-t-blue-gray-200 focus:!border-t-blue-500"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        required
                                    />
                                    {errors.googleMeetLink && (
                                        <p className="text-red-500 text-sm mt-1">{errors.googleMeetLink}</p>
                                    )}
                                </div>

                                <div>
                                    <Typography variant="h6" className="text-gray-700 mb-2">Category</Typography>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:border-blue-500 outline-none"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="story">Story</option>
                                        <option value="workout">Workout</option>
                                        <option value="knowledge">Knowledge</option>
                                        <option value="postcast">Postcast</option>
                                        <option value="recipe">Recipe</option>
                                    </select>
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                    )}
                                </div>

                                <div>
                                    <Typography variant="h6" className="text-gray-700 mb-2">Roles</Typography>
                                    <div className="flex gap-4">
                                        <Checkbox
                                            label="User"
                                            checked={selectedRole.includes('user')}
                                            onChange={() => handleRoleChange('user')}
                                            className="checked:bg-blue-500"
                                        />
                                        <Checkbox
                                            label="Coach"
                                            checked={selectedRole.includes('coach')}
                                            onChange={() => handleRoleChange('coach')}
                                            className="checked:bg-blue-500"
                                        />
                                    </div>
                                    {errors.roles && (
                                        <p className="text-red-500 text-sm mt-1">{errors.roles}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Typography variant="h6" className="text-gray-700 mb-2">Meeting Schedule</Typography>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            type="date"
                                            label="Date"
                                            value={meetingDate?.split('T')[0]}
                                            onChange={(e) => setMeetingDate(e.target.value)}
                                            className="!border-t-blue-gray-200 focus:!border-t-blue-500"
                                            required
                                        />
                                        <Input
                                            type="time"
                                            label="Time"
                                            value={meetingTime}
                                            onChange={(e) => setMeetingTime(e.target.value)}
                                            className="!border-t-blue-gray-200 focus:!border-t-blue-500"
                                            required
                                        />
                                    </div>
                                    {(errors.meetingDate || errors.meetingTime) && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.meetingDate || errors.meetingTime}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Typography variant="h6" className="text-gray-700 mb-2">Meeting Image</Typography>
                                    <Input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="!border-t-blue-gray-200 focus:!border-t-blue-500"
                                        accept="image/*"
                                    />
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-40 object-cover rounded-lg shadow-md"
                                            />
                                        </div>
                                    )}
                                    {errors.image && (
                                        <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="sticky bottom-0 bg-white py-4 px-6 border-t flex justify-end gap-4">
                    <Button 
                        variant="outlined"
                        color="red" 
                        onClick={handleCloseDialog}
                        className="flex items-center gap-2"
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="blue" 
                        onClick={handleSubmit} 
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Submit
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={Boolean(deleteMeetingId)} handler={() => setDeleteMeetingId(null)}>
                <DialogBody className="flex flex-col items-center gap-6 p-6">
                    <Typography variant="h6" className="text-center">
                        Confirm Deletion
                    </Typography>
                    <Typography className="text-center text-blue-gray-600">
                        Are you sure you want to delete this meeting?
                    </Typography>
                </DialogBody>
                <DialogFooter className="flex justify-center gap-4">
                    <Button variant="outlined" color="blue-gray" onClick={() => setDeleteMeetingId(null)}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="red" onClick={handleDelete}>
                        Confirm
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Meeting;
