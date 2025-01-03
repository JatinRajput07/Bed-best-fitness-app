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
        } else {
            setEditingMeeting(null);
            setGoogleMeetLink("");
            setSelectedRole([]);
            setMeetingDate("");
            setMeetingTime("");
            setImagePreview(null);
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
        setOpenDialog(false);
        setEditingMeeting(null);
    };

    const handleSubmit = () => {
        if (!googleMeetLink || selectedRole.length === 0 || !meetingDate || !meetingTime) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("googleMeetLink", googleMeetLink);
        formData.append("roles", selectedRole);
        formData.append("meetingDate", meetingDate);
        formData.append("meetingTime", meetingTime);
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
            <Card className="w-full max-w-6xl shadow-lg">
                <CardHeader variant="gradient" className="bg-gradient-to-r from-blue-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center">
                    <Typography variant="h5" color="white">Meeting</Typography>
                    <Button color="lightBlue" onClick={() => handleOpenDialog()}>Add Meeting</Button>
                </CardHeader>
                <CardBody className="p-6 space-y-6">
                    {/* Meeting Data Table */}
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sr. No.</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Google Meet Link</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Roles</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meetings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((meeting, index) => (
                                    <TableRow key={meeting._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <img src={meeting.image} alt="Meeting" className="w-16 h-16 object-cover" />
                                        </TableCell>
                                        <TableCell>{meeting.googleMeetLink}</TableCell>
                                        <TableCell>{new Date(meeting.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(meeting.createdAt).toLocaleTimeString()}</TableCell>
                                        <TableCell>{meeting.roles.join(", ")}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                color="green"
                                                className="mr-1"
                                                onClick={() => handleOpenDialog(meeting)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                color="red"
                                                onClick={() => handleDeleteConfirmation(meeting._id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
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
                <DialogBody>
                    <div className="space-y-4">
                        <Typography variant="h6" className="text-center mb-4">
                            {editingMeeting ? "Edit Meeting" : "Add Meeting"}
                        </Typography>
                        <Input
                            label="Google Meet Link"
                            value={googleMeetLink}
                            onChange={(e) => setGoogleMeetLink(e.target.value)}
                            required
                        />
                        <Input
                            type="file"
                            onChange={handleImageChange}
                            label="Upload Image"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <Typography variant="h6" color="gray" className="mb-2">Image Preview</Typography>
                                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                            </div>
                        )}
                        <div>
                            <Typography variant="h6" className="text-gray-700">Select Roles</Typography>
                            <Checkbox
                                label="User"
                                checked={selectedRole.includes('user')}
                                onChange={() => handleRoleChange('user')}
                            />
                            <Checkbox
                                label="Coach"
                                checked={selectedRole.includes('coach')}
                                onChange={() => handleRoleChange('coach')}
                            />
                        </div>
                        <div>
                            <Typography variant="h6" className="text-gray-700">Select Meeting Date and Time</Typography>
                            <div className="space-y-4">
                                <Input
                                    type="date"
                                    label="Date"
                                    value={meetingDate?.split('T')[0]}
                                    onChange={(e) => setMeetingDate(e.target.value)}
                                    required
                                />
                                <Input
                                    type="time"
                                    label="Time"
                                    value={meetingTime}
                                    onChange={(e) => setMeetingTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button color="red" onClick={handleCloseDialog}>Cancel</Button>
                    <Button color="blue" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Please wait..." : "Submit"}
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
