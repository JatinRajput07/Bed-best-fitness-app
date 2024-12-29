import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideo, fetchVideos, resetProgress } from "@/redux/videoSlice";
import { utilService } from "@/utilService";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Progress,
} from "@material-tailwind/react";
import Axios from "@/configs/Axios";

const UploadVideo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { progress, error: uploadError } = useSelector((state) => state.videos);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [file, setFile] = useState(null);
  const [audioThumbnail, setAudioThumbnail] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await Axios.get("/admin/categories");
        const data = response.data.data.map((cat) => ({
          value: cat._id,
          label: cat.name,
          subcategories: cat.subcategories.map((sub) => ({
            value: sub._id,
            label: sub.name,
          })),
        }));
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        utilService.showErrorToast("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (selected) => {
    setCategory(selected);
    setSubcategories([]);
    setSubcategoryOptions(selected?.subcategories || []);
    setFile(null);
    setAudioThumbnail(null);
  };

  const validateForm = () => {
    const formErrors = {};
    if (!title) formErrors.title = "Title is required.";
    if (!category) formErrors.category = "Category is required.";
    if (!file) formErrors.file = "File is required.";
    if (category?.label?.toLowerCase().includes("audio") && !audioThumbnail) {
      formErrors.audioThumbnail = "Audio thumbnail image is required for audio files.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await dispatch(
        createVideo({
          title,
          file,
          category: category.value,
          subcategories: subcategories.map((sub) => sub.value),
          description,
          audioThumbnail,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          utilService.showSuccessToast("File uploaded successfully!");
          navigate("/dashboard/videos");
          dispatch(fetchVideos());
          resetForm();
        }
      });
    } catch (err) {
      console.error(err);
      utilService.showErrorToast("Failed to upload video.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory(null);
    setSubcategories([]);
    setFile(null);
    setAudioThumbnail(null);
    setErrors({});
    dispatch(resetProgress());
  };

  const isSubmitDisabled =
    !title ||
    !category ||
    !file ||
    (category?.label?.toLowerCase().includes("audio") && !audioThumbnail) ||
    isSubmitting ||
    (progress > 0 && progress < 100);

  return (
    <div className="mt-12 mb-8 flex justify-center">
      <Card className="w-full max-w-4 shadow-lg">
        <CardHeader
          variant="gradient"
          className="bg-gradient-to-r from-red-800  to-indigo-600 p-6 rounded-t-lg"
        >
          <Typography variant="h5" color="white" className="text-center">
            Upload File
          </Typography>
        </CardHeader>
        <CardBody className="p-6 space-y-6">
          {uploadError && (
            <Typography color="red" className="text-sm">
              {uploadError}
            </Typography>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select
              value={category}
              onChange={handleCategoryChange}
              options={categories}
              placeholder="Select a category"
              isClearable
              className="focus:ring focus:ring-indigo-500"
            />
            {errors.category && (
              <Typography color="red" className="text-sm mt-1">
                {errors.category}
              </Typography>
            )}
          </div>

          {/* Subcategories */}
          {subcategoryOptions.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcategories
              </label>
              <Select
                value={subcategories}
                onChange={(selected) => setSubcategories(selected || [])}
                options={subcategoryOptions}
                isMulti
                placeholder="Select subcategories"
                className="focus:ring focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              placeholder="Enter title"
            />
            {errors.title && (
              <Typography color="red" className="text-sm mt-1">
                {errors.title}
              </Typography>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              placeholder="Enter description"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            />
            {errors.file && (
              <Typography color="red" className="text-sm mt-1">
                {errors.file}
              </Typography>
            )}
          </div>

          {/* Submit Button */}
          <Button
            color="indigo"
            fullWidth
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            {isSubmitting
              ? progress > 0
                ? `Uploading... ${progress}%`
                : "Please Wait..."
              : "Upload File"}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UploadVideo;
