import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Typography,
    Dialog,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Switch from "@mui/material/Switch";
import DialogConfirm from "@mui/material/Dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Axios from "@/configs/Axios";

const IntroductionManagement = () => {
    const [introductions, setIntroductions] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [deleteIntroductionId, setDeleteIntroductionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Fetch introductions from the server
    const fetchIntroductions = () => {
        Axios.get("/admin/introduction")
            .then((response) => {
                if (response.data.status === "success" && Array.isArray(response.data.data)) {
                    setIntroductions(response.data.data);
                }
            })
            .catch((error) => console.error("Error fetching introductions:", error));
    };

    useEffect(() => {
        fetchIntroductions();
    }, []);

    // Handle Image Upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Open & Close Dialogs
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setImage(null);
        setImagePreview(null);
        setOpenDialog(false);
    };

    const handleOpenConfirmDialog = (id) => {
        setDeleteIntroductionId(id);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setDeleteIntroductionId(null);
    };

    // Create Introduction
    const handleSubmit = () => {
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);

        Axios.post("/admin/introduction", formData)
            .then((response) => {
                if (response.data.status === "success") {
                    fetchIntroductions();
                    handleCloseDialog();
                }
            })
            .catch((error) => console.error("Error creating introduction:", error))
            .finally(() => setLoading(false));
    };

    // Toggle Introduction Status
    const toggleIntroductionStatus = (id, currentStatus) => {
        Axios.patch(`/admin/introduction/${id}/status`, { isActive: !currentStatus })
            .then(() => fetchIntroductions())
            .catch((error) => console.error("Error toggling introduction status:", error));
    };

    // Delete Introduction
    const deleteIntroduction = (id) => {
        Axios.delete(`/admin/introduction/${id}`)
            .then(() => {
                fetchIntroductions();
                handleCloseConfirmDialog();
            })
            .catch((error) => console.error("Error deleting introduction:", error));
    };

    // Pagination Handlers
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="mt-12 mb-8">
            <div className="mb-8">
                <Typography variant="h5" className="mb-4 font-bold text-center">Active Introduction Screens</Typography>
                <Swiper
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    style={{ width: "10%", height: "auto" }}
                    className="h-64"
                >
                    {introductions.filter((introduction) => introduction.isActive).map((introduction) => (
                        <SwiperSlide key={introduction._id}>
                            <img
                                src={introduction.imageUrl}
                                alt="Introduction"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <Card className="w-full shadow-lg">
                <CardHeader className="p-6 bg-blue-600 text-white flex justify-between">
                    <Typography variant="h5">Introduction Management</Typography>
                    <Button onClick={handleOpenDialog}>Add Introduction</Button>
                </CardHeader>
                <CardBody className="p-6">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sr. No.</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {introductions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((introduction, index) => (
                                    <TableRow key={introduction._id}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>
                                            <img
                                                src={introduction.imageUrl}
                                                alt="Introduction"
                                                className="w-32 h-32 object-cover rounded-md"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={introduction.isActive}
                                                onChange={() => toggleIntroductionStatus(introduction._id, introduction.isActive)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button color="red" onClick={() => handleOpenConfirmDialog(introduction._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={introductions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>

            <Dialog open={openDialog} handler={handleCloseDialog}>
                <DialogBody className="flex flex-col items-center">
                    <Typography variant="h4" className="mb-4">Add New Introduction</Typography>
                            <div className="mb-4 w-full">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                               Introduction Image (Recommended: 1920x768px, 5:2 ratio, Max: 2MB)
                                            </label>
                                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-4">
                                                <input
                                                    type="file"
                                                    id="image-upload"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                    max-size="2097152"
                                                />
                                                <label htmlFor="image-upload" className="cursor-pointer w-full">
                                                    {imagePreview ? (
                                                        <div className="relative w-full" style={{ paddingTop: '40%' }}>
                                                            <img
                                                                src={imagePreview}
                                                                alt="Banner Preview"
                                                                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center py-8">
                                                            <span className="text-4xl text-primary">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="w-10 h-10"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M7 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4zm1 2v1h8V6H8zm-2 3v8h12V9H6zm6 1a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <Typography variant="small" className="mt-2 text-gray-600">
                                                                Select Image (1920x768px recommended, max 2MB)
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </label>
                                            </div>
                                        </div>

                    <Input type="file" onChange={handleImageChange} />
                    {imagePreview && (
                        <div className="mt-4 max-h-64 overflow-auto">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-auto rounded-md object-contain max-h-64"
                            />
                        </div>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleCloseDialog} color="red">Cancel</Button>
                    <Button onClick={handleSubmit} color="green" disabled={loading}>
                        {loading ? "Uploading..." : "Submit"}
                    </Button>
                </DialogFooter>
            </Dialog>

            <DialogConfirm open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                <DialogBody>
                    <Typography>Are you sure you want to delete this introduction?</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleCloseConfirmDialog} color="red">Cancel</Button>
                    <Button onClick={() => deleteIntroduction(deleteIntroductionId)} color="green">Delete</Button>
                </DialogFooter>
            </DialogConfirm>
        </div>
    );
};

export default IntroductionManagement;