import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createVideo, fetchVideos, resetProgress } from "@/redux/videoSlice"; // Assuming createVideo handles FormData
import { utilService } from "@/utilService";
import Axios from "@/configs/Axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Progress,
  Input,
  Textarea,
} from "@material-tailwind/react";
import Select from "react-select";
import { FiUpload, FiImage, FiFile, FiMusic, FiFilm } from "react-icons/fi";

const UploadVideo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { progress, error: uploadError } = useSelector((state) => state.videos);

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: null,
    subcategories: null, // Will be converted to array before dispatch
    file: null,
    thumbnail: null,
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get("/admin/categories");
        setCategories(response.data.data);
      } catch (error) {
        utilService.showErrorToast("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Auto-fill title from filename
  useEffect(() => {
    if (form.file && !form.title) {
      const fileName = form.file.name.split(".")[0];
      setForm((prev) => ({ ...prev, title: fileName }));
    }
  }, [form.file]);

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type based on category
    if (field === "file" && form.category) {
      const expectedType = form.category.type;
      if (!file.type.startsWith(`${expectedType}/`)) {
        setErrors((prev) => ({
          ...prev,
          file: `Please select a ${expectedType} file`,
        }));
        setForm((prev) => ({ ...prev, [field]: null })); // Clear file on invalid type
        return;
      }
    }

    // Validate thumbnail is image
    if (field === "thumbnail" && !file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, thumbnail: "Please select an image file" }));
      setForm((prev) => ({ ...prev, [field]: null })); // Clear thumbnail on invalid type
      return;
    }

    setForm((prev) => ({ ...prev, [field]: file }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.file) newErrors.file = "File is required";
    // Check if category type is 'audio' or 'video' and thumbnail is missing
    if (
      form.category?.type &&
      ["audio", "video"].includes(form.category.type) &&
      !form.thumbnail
    ) {
      newErrors.thumbnail = "Thumbnail is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Prepare FormData
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category?._id);

    // Ensure subcategories is an array for the backend
    if (form.subcategories) {
      formData.append("subcategories[]", form.subcategories._id); // Append as array
    } else {
      formData.append("subcategories", []); // Send an empty array if no subcategory selected
    }

    // Append the main file
    if (form.file) {
      formData.append("file", form.file); // Backend expects 'file' field for the main content
    }

    // Append the thumbnail if required by category type
    if (
      form.category?.type &&
      ["audio", "video"].includes(form.category.type) &&
      form.thumbnail
    ) {
      // Backend expects 'thumbnail' for videos and 'audioThumbnail' for audios.
      // We will send 'thumbnail' from frontend, and backend will handle based on filetype.
      formData.append("thumbnail", form.thumbnail);
    }

    try {
      // Assuming createVideo Redux action takes FormData directly
      const result = await dispatch(createVideo(formData));

      if (result.meta.requestStatus === "fulfilled") {
        utilService.showSuccessToast("Upload successful!");
        dispatch(fetchVideos());
        navigate("/dashboard/videos");
      }
    } catch (error) {
      utilService.showErrorToast("Upload failed");
    } finally {
      setIsSubmitting(false);
      dispatch(resetProgress()); // Reset progress on completion or error
    }
  };

  // Get appropriate icon for file type
  const getFileIcon = () => {
    if (!form.file) return <FiFile className="h-10 w-10" />;
    if (form.file.type.startsWith("audio/")) return <FiMusic className="h-10 w-10" />;
    if (form.file.type.startsWith("video/")) return <FiFilm className="h-10 w-10" />;
    return <FiFile className="h-10 w-10" />;
  };

  return (
    <div className="mt-12 mb-8 flex justify-center">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader
          variant="gradient"
          className="bg-gradient-to-r from-red-800 to-indigo-600 p-6 rounded-t-lg"
        >
          <Typography variant="h5" color="white" className="flex items-center gap-2">
            <FiUpload className="h-5 w-5" />
            Upload File
          </Typography>
        </CardHeader>

        <CardBody className="p-6 space-y-6">
          {uploadError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {uploadError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <Select
                value={
                  form.category
                    ? {
                        value: form.category._id,
                        label: form.category.name,
                      }
                    : null
                }
                onChange={(selected) => {
                  const category = selected
                    ? categories.find((c) => c._id === selected.value)
                    : null;
                  setForm((prev) => ({
                    ...prev,
                    category,
                    subcategories: null, // Reset subcategories when category changes
                    file: null, // Reset file when category changes
                    thumbnail: null, // Reset thumbnail when category changes
                  }));
                  setErrors((prev) => ({
                    ...prev,
                    category: undefined,
                    file: undefined,
                    thumbnail: undefined,
                  })); // Clear related errors
                }}
                options={categories.map((cat) => ({
                  value: cat._id,
                  label: cat.name,
                }))}
                placeholder="Select a category"
                isClearable
              />
              {errors.category && (
                <p className="text-sm text-red-600 mt-1">{errors.category}</p>
              )}
            </div>

            {/* Subcategory Selection */}
            {form.category?.subcategories?.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Subcategory
                </label>
                <Select
                  value={
                    form.subcategories
                      ? {
                          value: form.subcategories._id,
                          label: form.subcategories.name,
                        }
                      : null
                  }
                  onChange={(selected) => {
                    const subcategory = selected
                      ? form.category.subcategories.find((s) => s._id === selected.value)
                      : null;
                    setForm((prev) => ({ ...prev, subcategories: subcategory }));
                  }}
                  options={form.category.subcategories.map((sub) => ({
                    value: sub._id,
                    label: sub.name,
                  }))}
                  placeholder="Select a subcategory"
                  isClearable
                />
              </div>
            )}

            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <Input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter title"
                error={!!errors.title}
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description ( optional )
              </label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Enter description"
                rows={4}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "file")}
                  accept={form.category?.type ? `${form.category.type}/*` : undefined}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  {getFileIcon()}
                  <p className="text-sm text-gray-600">
                    {form.file ? form.file.name : "Click to select a file"}
                  </p>
                  {form.category?.type && (
                    <p className="text-xs text-gray-500">
                      {form.category.type.toUpperCase()} files only
                    </p>
                  )}
                </label>
              </div>
              {errors.file && (
                <p className="text-sm text-red-600 mt-1">{errors.file}</p>
              )}
            </div>

            {/* Thumbnail Upload (for audio/video) */}
            {form.category?.type && ["audio", "video"].includes(form.category.type) && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Thumbnail *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "thumbnail")}
                    accept="image/*"
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    <FiImage className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {form.thumbnail
                        ? form.thumbnail.name
                        : "Click to select a thumbnail"}
                    </p>
                    <p className="text-xs text-gray-500">
          Required dimensions: 77px × 58px
        </p>
                  </label>
                </div>
                {form.thumbnail && (
                  <div className="mt-4">
                    <img
                      src={URL.createObjectURL(form.thumbnail)}
                      alt="Thumbnail preview"
                      className="w-full h-auto rounded-md max-h-48 object-cover"
                    />
                  </div>
                )}
                {errors.thumbnail && (
                  <p className="text-sm text-red-600 mt-1">{errors.thumbnail}</p>
                )}
              </div>
            )}

            {/* Progress Bar */}
            {progress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} color="indigo" />
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              color="indigo"
              fullWidth
              disabled={isSubmitting || (progress > 0 && progress < 100)}
            >
              {isSubmitting
                ? progress > 0
                  ? `Uploading (${progress}%)`
                  : "Processing..."
                : "Upload File"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UploadVideo;