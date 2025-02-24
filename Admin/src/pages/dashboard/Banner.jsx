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
    IconButton,
} from "@material-tailwind/react";
// import { PhotoCamera } from "@mui/icons-material";
import { CameraIcon } from "@heroicons/react/24/solid";
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
    const [link, setLink] = useState("");

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setImage(null);
        setImagePreview(null);
        setLink("");
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

    const handleSubmit = () => {
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);
        if (link) {
            formData.append("link", link);
        }

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

    const toggleBannerStatus = (id, currentStatus) => {
        Axios.patch(`/admin/banner/${id}/status`, { isActive: !currentStatus })
            .then(() => fetchBanners())
            .catch((error) => console.error("Error toggling banner status:", error));
    };

    const deleteBanner = (id) => {
        Axios.delete(`/admin/banner/${id}`)
            .then(() => {
                fetchBanners();
                handleCloseConfirmDialog();
            })
            .catch((error) => console.error("Error deleting banner:", error));
    };

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
                                    <TableCell>Link</TableCell>
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
                                        {banner?.link ?? '-'}
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
                <DialogBody className="flex flex-col items-center p-6">
                    <Typography variant="h4" className="mb-6 font-semibold">Add New Banner</Typography>

                    <div className="mb-4 w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                        <div className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-4">
                            <input
                                type="file"
                                id="image-upload"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload" className="cursor-pointer">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Banner Preview"
                                        className="max-w-xs max-h-48 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center">
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
                                            Select Image
                                        </Typography>
                                    </div>
                                )}
                            </label>

                        </div>
                    </div>

                    <Input
                        label="Link (Optional)"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="mb-4 w-full"
                    />
                </DialogBody>

                <DialogFooter className="p-6">
                    <Button onClick={handleCloseDialog} color="red" variant="text" className="mr-2">Cancel</Button>
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