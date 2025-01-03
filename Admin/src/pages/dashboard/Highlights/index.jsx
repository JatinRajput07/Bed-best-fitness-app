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
    DialogHeader,
    Input,
    IconButton,
} from "@material-tailwind/react";
import TablePagination from "@mui/material/TablePagination";
import Axios from "@/configs/Axios";
import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/solid";

const Highlights = () => {
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchImages = () => {
        Axios.get("/admin/highlights")
            .then((response) => {
                if (response.data.status === "success") {
                    setImages(response.data.data.highlights);
                }
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const handleOpenDialog = () => {
        setImage(null);
        setImagePreview(null);
        setOpenDialog(true);
    };

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

        Axios.post("/admin/highlights", formData)
            .then((response) => {
                if (response.data.status === "success") {
                    fetchImages();
                    handleCloseDialog();
                    toast.success("Image uploaded successfully!");
                }
            })
            .catch((error) => {
                console.error("Error uploading image:", error);
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = () => {
        if (!deleteImageId) return;

        Axios.delete(`/admin/highlights/${deleteImageId}`)
            .then((response) => {
                if (response.data.status === "success") {
                    fetchImages();
                    toast.success("Image deleted successfully!");
                }
            })
            .catch((error) => {
                console.error("Error deleting image:", error);
            })
            .finally(() => setDeleteImageId(null));
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
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex justify-between items-center"
                >
                    <Typography variant="h5" color="white">
                        Highlights Gallery
                    </Typography>
                    <Button color="lightGreen" onClick={handleOpenDialog}>
                        Add Image
                    </Button>
                </CardHeader>
                <CardBody className="p-6 space-y-6">
                    {/* Images Gallery */}
                    {images?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {images
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((image) => (
                                    <div key={image._id} className="relative">
                                        <img
                                            src={image?.url}
                                            alt="Highlight"
                                            className="w-full h-32 object-cover rounded-lg shadow-md"
                                        />
                                        <div className="absolute bg-deep-orange-500 p-1 right-2 rounded text-white top-2">
                                            <TrashIcon
                                                onClick={() => setDeleteImageId(image._id)}
                                                className="h-5 w-5 text-white cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="text-center font-semibold"
                        >
                            No data found
                        </Typography>
                    )}
                    {images?.length > 0 && (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={images?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    )}
                </CardBody>
            </Card>

            {/* Add Image Dialog */}
            <Dialog open={openDialog} handler={handleCloseDialog} size="lg" className="rounded-lg shadow-lg">
                <DialogBody className="p-6">
                    <Typography variant="h4" color="blue-gray" className="text-center mb-6 font-semibold">
                        Upload a New Highlight Image
                    </Typography>
                    <div className="space-y-6">
                        {/* File Upload */}
                        <div className="border-2 border-dashed border-blue-gray-300 rounded-lg p-6 hover:border-blue-gray-500 focus-within:ring focus-within:ring-blue-400 transition">
                            <label
                                htmlFor="file-upload"
                                className="block text-center text-blue-gray-700 cursor-pointer hover:text-blue-600 transition"
                            >
                                <Typography variant="h6" className="mb-2 font-semibold">
                                    Click to Select Image File
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Supported formats: .jpg, .png
                                </Typography>
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                        </div>

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="flex flex-col items-center">
                                <Typography variant="h6" className="mb-2 font-semibold text-blue-gray-700">
                                    Image Preview
                                </Typography>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-56 h-56 object-cover rounded-xl shadow-lg border border-blue-gray-200"
                                />
                            </div>
                        )}
                    </div>

                </DialogBody>
                <DialogFooter className="p-6 flex justify-between">
                    <Button
                        variant="outlined"
                        color="red"
                        onClick={handleCloseDialog}
                        className="rounded-lg px-6 py-2 border-red-500 text-red-500 hover:bg-red-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-lg px-6 py-2"
                    >
                        {loading ? "Uploading..." : "Submit"}
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={Boolean(deleteImageId)}
                handler={() => setDeleteImageId(null)}
            >
                <DialogHeader className="bg-gray-100 text-center py-4">
                    <Typography variant="h5" color="blue-gray" className="font-semibold">
                        Confirm Deletion
                    </Typography>
                </DialogHeader>
                <DialogBody className="flex flex-col items-center gap-6 p-6">
                    <div className="p-4 rounded-full bg-red-100 flex justify-center items-center">
                        <TrashIcon className="h-10 w-10 text-red-500" />
                    </div>
                    <Typography className="text-center text-base font-medium text-blue-gray-600">
                        Are you sure you want to delete this image?
                    </Typography>
                </DialogBody>
                <DialogFooter className="bg-gray-50 flex justify-center gap-4 py-4">
                    <Button
                        variant="outlined"
                        color="blue-gray"
                        className="w-24"
                        onClick={() => setDeleteImageId(null)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        className="w-24"
                        onClick={handleDelete}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Highlights;
