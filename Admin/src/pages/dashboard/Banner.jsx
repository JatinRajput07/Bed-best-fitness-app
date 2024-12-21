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
    Input
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
import DialogConfirm from '@mui/material/Dialog';

const BannerManagement = () => {
    const [banners, setBanners] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // for confirmation
    const [deleteBannerId, setDeleteBannerId] = useState(null); // to store the banner id to be deleted
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setImage(null);
        setImagePreview(null);
        setOpenDialog(false);
    };

    const handleSubmit = () => {
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);

        axios.post("http://43.204.2.84:7200/admin/banner", formData)
            .then((response) => {
                if (response.data.status === "success") {
                    fetchBanners();
                    handleCloseDialog();
                }
            })
            .catch((error) => {
                console.error("Error submitting banner:", error);
            })
            .finally(() => setLoading(false));
    };

    const fetchBanners = () => {
        axios.get("http://43.204.2.84:7200/admin/banner")
            .then((response) => {
                if (response.data.status === "success" && Array.isArray(response.data.data)) {
                    setBanners(response.data.data); // Ensure it's an array before setting the state
                } else {
                    setBanners([]); // Fallback to empty array if response is invalid
                }
            })
            .catch((error) => {
                console.error("Error fetching banners:", error);
                setBanners([]); // Fallback to empty array on error
            });
    };

    const toggleBannerStatus = (id, currentStatus) => {
        axios.patch(`http://43.204.2.84:7200/admin/banner/${id}/status`, { isActive: !currentStatus })
            .then((response) => {
                if (response.data.status === "success") {
                    fetchBanners();
                }
            })
            .catch((error) => {
                console.error("Error toggling banner status:", error);
            });
    };

    const deleteBanner = (id) => {
        axios.delete(`http://43.204.2.84:7200/admin/banner/${id}`)
            .then((response) => {
                if (response.data.status === "success") {
                    fetchBanners();
                    setOpenConfirmDialog(false); // Close confirmation dialog after deletion
                }
            })
            .catch((error) => {
                console.error("Error deleting banner:", error);
            });
    };

    const handleOpenConfirmDialog = (id) => {
        setDeleteBannerId(id);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setDeleteBannerId(null);
    };

    useEffect(() => {
        fetchBanners();
    }, []);

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
                    <Typography variant="h5" color="white">Banner Management</Typography>
                    <Button color="lightBlue" onClick={handleOpenDialog}>Add Banner</Button>
                </CardHeader>
                <CardBody className="p-6 space-y-6">
                    {/* Banner Data Table */}
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
                                {banners && banners.length > 0 && banners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((banner, index) => (
                                    <TableRow key={banner._id}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>
                                            <img src={banner.imageUrl} alt="Banner" className="w-32 h-32 object-cover rounded-md" />
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={banner.isActive}
                                                onChange={() => toggleBannerStatus(banner._id, banner.isActive)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button color="red" size="small" onClick={() => handleOpenConfirmDialog(banner._id)}>
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
                        count={banners.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>

            {/* Add Banner Dialog */}
            <Dialog open={openDialog} handler={handleCloseDialog} size="lg">
                <DialogBody className="overflow-y-auto overflow-x-hidden max-h-[500px]">
                    <div className="flex flex-col items-center space-y-6">
                        <Typography variant="h4" className="text-gray-800 font-semibold">Upload New Banner</Typography>
                        <div className="w-full max-w-md">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Choose Image</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none"
                            />
                        </div>
                        {imagePreview && (
                            <div className="w-full max-w-md">
                                <Typography variant="h6" color="blue-gray" className="mb-2">Image Preview</Typography>
                                <img src={imagePreview} alt="Preview" className="w-full h-auto object-cover rounded-md shadow-md" />
                            </div>
                        )}
                    </div>
                </DialogBody>
                <DialogFooter className="flex justify-between">
                    <Button variant="outlined" color="red" onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="filled" color="green" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Uploading..." : "Submit"}
                    </Button>
                </DialogFooter>
            </Dialog>

            <DialogConfirm open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                <DialogBody>
                    <Typography variant="h6" className="text-gray-800">Are you sure you want to delete this banner?</Typography>
                </DialogBody>
                <DialogFooter className="gap-1">
                    <Button variant="outlined" color="red" onClick={handleCloseConfirmDialog}>Cancel</Button>
                    <Button variant="filled" color="green" onClick={() => { deleteBanner(deleteBannerId); handleCloseConfirmDialog(); }}>Delete</Button>
                </DialogFooter>
            </DialogConfirm>
        </div>
    );
};

export default BannerManagement;
