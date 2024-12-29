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
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState();
  const [file, setFile] = useState(null);
  const [audioThumbnail, setAudioThumbnail] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await Axios.get('/admin/categories');
      setCategories(categories.data.data);
    };
    fetchCategories();
  }, []);

  const [categories, setCategories] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Dynamically validate based on the category
      const isValidFile = category?.value === "audio"
        ? selectedFile.type.startsWith("audio/")
        : category?.value === "video"
          ? selectedFile.type.startsWith("video/")
          : true;

      if (isValidFile) {
        setFile(selectedFile);
        setErrors((prevErrors) => ({ ...prevErrors, file: null })); // Clear file error
      } else {
        setFile(null);
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: `Invalid file type. Please select a ${category?.value === "audio" ? "audio" : "video"} file.`,
        }));
      }
    }
  };

  const handleAudioThumbnailChange = (e) => {
    const selectedThumbnail = e.target.files[0];
    if (selectedThumbnail && selectedThumbnail.type.startsWith("image/")) {
      setAudioThumbnail(selectedThumbnail);
      setErrors((prevErrors) => ({ ...prevErrors, audioThumbnail: null }));
    } else {
      setAudioThumbnail(null);
      setErrors((prevErrors) => ({
        ...prevErrors,
        audioThumbnail: "Invalid image type for audio thumbnail.",
      }));
    }
  };

  const validateForm = () => {
    const formErrors = {};
    if (!title) formErrors.title = "Title is required.";
    if (!category) formErrors.category = "Category is required.";
    if (!file) formErrors.file = "File is required.";
    if (category?.value === "audio" && !audioThumbnail) {
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
          subcategories,
          description,
          audioThumbnail,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          utilService.showSuccessToast("File uploaded successfully!");
          navigate("/dashboard/videos");
          dispatch(fetchVideos());
          setTitle("");
          setDescription("");
          setCategory(null);
          setSubcategories();
          setFile(null);
          setAudioThumbnail(null);
          setIsSubmitting(false);
          dispatch(resetProgress());
        }
      });
    } catch (err) {
      console.error(err);
      utilService.showErrorToast("Failed to upload video.");
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    !title ||
    !category ||
    !file ||
    (category?.value === "audio" && !audioThumbnail) ||
    !subcategories ||
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
              onChange={(selected) => {
                setCategory(selected);
                setSubcategories();
                setFile(null);
                setAudioThumbnail(null);
              }}
              options={categories.map(cat => ({ value: cat._id, label: cat.name, type: cat.type, subcategories: cat.subcategories }))}
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
          {category && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcategories
              </label>
              <Select
                value={subcategories}
                onChange={(selected) => setSubcategories(selected)}
                options={category.subcategories?.map(sub => ({ value: sub._id, label: sub.name }))}
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

            {console.log(category, '====category==')}
            <input
              type="file"
              onChange={handleFileChange}
              accept={category?.type === "audio" ? "audio/*" : category?.type === "image" ? "image/*" : "video/*"}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            />
            {errors.file && (
              <Typography color="red" className="text-sm mt-1">
                {errors.file}
              </Typography>
            )}
          </div>

          {/* Audio Thumbnail (if audio-related category) */}
          {file?.type.startsWith("audio") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audio Thumbnail (Image)
              </label>
              <input
                type="file"
                onChange={handleAudioThumbnailChange}
                accept="image/jpeg"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              />
              {errors.audioThumbnail && (
                <Typography color="red" className="text-sm mt-1">
                  {errors.audioThumbnail}
                </Typography>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {progress > 0 && (
            <div>
              <Progress value={progress} color="indigo" />
            </div>
          )}

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
