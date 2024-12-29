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

const BannerManagement = () => {
    const [banners, setBanners] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [deleteBannerId, setDeleteBannerId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Fetch banners from the server
    const fetchBanners = () => {
        Axios.get("/admin/banner")
            .then((response) => {
                if (response.data.status === "success" && Array.isArray(response.data.data)) {
                    setBanners(response.data.data);
                }
            })
            .catch((error) => console.error("Error fetching banners:", error));
    };

    useEffect(() => {
        fetchBanners();
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
        setDeleteBannerId(id);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setDeleteBannerId(null);
    };

    // Create Banner
    const handleSubmit = () => {
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);

        Axios.post("/admin/banner", formData)
            .then((response) => {
                if (response.data.status === "success") {
                    fetchBanners();
                    handleCloseDialog();
                }
            })
            .catch((error) => console.error("Error creating banner:", error))
            .finally(() => setLoading(false));
    };

    // Toggle Banner Status
    const toggleBannerStatus = (id, currentStatus) => {
        Axios.patch(`/admin/banner/${id}/status`, { isActive: !currentStatus })
            .then(() => fetchBanners())
            .catch((error) => console.error("Error toggling banner status:", error));
    };

    // Delete Banner
    const deleteBanner = (id) => {
        Axios.delete(`/admin/banner/${id}`)
            .then(() => {
                fetchBanners();
                handleCloseConfirmDialog();
            })
            .catch((error) => console.error("Error deleting banner:", error));
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
                <Typography variant="h5" className="mb-4 font-bold text-center">Active Banners</Typography>
                <Swiper
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="h-64"
                >
                    {banners.filter((banner) => banner.isActive).map((banner) => (
                        <SwiperSlide key={banner._id}>
                            <img
                                src={banner.imageUrl}
                                alt="Banner"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <Card className="w-full shadow-lg">
                <CardHeader className="p-6 bg-blue-600 text-white flex justify-between">
                    <Typography variant="h5">Banner Management</Typography>
                    <Button onClick={handleOpenDialog}>Add Banner</Button>
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
                                {banners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((banner, index) => (
                                    <TableRow key={banner._id}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>
                                            <img
                                                src={banner.imageUrl}
                                                alt="Banner"
                                                className="w-32 h-32 object-cover rounded-md"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={banner.isActive}
                                                onChange={() => toggleBannerStatus(banner._id, banner.isActive)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button color="red" onClick={() => handleOpenConfirmDialog(banner._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={banners.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>

            <Dialog open={openDialog} handler={handleCloseDialog}>
                <DialogBody className="flex flex-col items-center">
                    <Typography variant="h4" className="mb-4">Add New Banner</Typography>
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
                    <Typography>Are you sure you want to delete this banner?</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleCloseConfirmDialog} color="red">Cancel</Button>
                    <Button onClick={() => deleteBanner(deleteBannerId)} color="green">Delete</Button>
                </DialogFooter>
            </DialogConfirm>
        </div>
    );
};

export default BannerManagement;
