import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile, resetProgress } from "@/redux/uploadFileSlice";
import { createVideo } from "@/redux/videoSlice";
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

const UploadVideo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { progress, filePath, error: uploadError } = useSelector(
    (state) => state.uploadFiles
  );

  const [title, setTitle] = useState("");
  const [description,setDescription] = useState("")
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: "workout-video", label: "Workout Video" },
    { value: "recipe-video", label: "Recipe Video" },
    { value: "knowledge-video", label: "Knowledge Video" },
    { value: "story-podcast-recognition-video", label: "Story/Podcast/Recognition Video" },
    { value: "wallpaper", label: "Wallpaper" },
    { value: "quotes", label: "Quotes" },
    { value: "audio-clips", label: "Audio Clips" },
    { value: "music", label: "Music" },
    { value: "podcast", label: "Podcast" },
    { value: "audio-book", label: "Audio Book" },
  ];

  const subcategoryOptions = {
    "workout-video": [
      { value: "body", label: "Body" },
      { value: "neck-pain", label: "Neck Pain" },
      { value: "upper-body", label: "Upper Body" },
      { value: "lower-body", label: "Lower Body" },
    ],
    "recipe-video": [
      { value: "breakfast", label: "Breakfast" },
      { value: "lunch", label: "Lunch" },
      { value: "dinner", label: "Dinner" },
    ],
    "knowledge-video": [
      { value: "nutrition-diet", label: "Nutrition Diet" },
      { value: "skin-care", label: "Skin Care" },
      { value: "sleep", label: "Sleep" },
    ],
    "story-podcast-recognition-video": [
      { value: "story", label: "Story" },
      { value: "podcast", label: "Podcast" },
    ],
    wallpaper: [
      { value: "nature", label: "Nature" },
      { value: "motivation", label: "Motivation" },
      { value: "god", label: "God" },
    ],
    quotes: [
      { value: "friendship", label: "Friendship" },
      { value: "motivation", label: "Motivation" },
      { value: "success", label: "Success" },
    ],
    "audio-clips": [
      { value: "new", label: "New" },
      { value: "tophits", label: "Top Hits" },
      { value: "trending", label: "Trending" },
    ],
    music: [
      { value: "new", label: "New" },
      { value: "tophits", label: "Top Hits" },
      { value: "trending", label: "Trending" },
    ],
    podcast: [
      { value: "new", label: "New" },
      { value: "motivation", label: "Motivation" },
      { value: "educational", label: "Educational" },
    ],
    "audio-book": [
      { value: "new", label: "New" },
      { value: "popular", label: "Most Popular" },
      { value: "health_wellness", label: "Health & Wellness" },
    ],
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      dispatch(resetProgress());
      dispatch(uploadFile(selectedFile));
    }
  };

  const validateForm = () => {
    const formErrors = {};
    if (!title) formErrors.title = "Title is required.";
    // if (!description) formErrors.description = "Description is required.";
    if (!category) formErrors.category = "Category is required.";
    if (!file) formErrors.file = "File is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(
        createVideo({
          title,
          path: filePath?.path,
          filetype: filePath.mimeType.split('/')[0],
          category: category.value,
          subcategories,
          description,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          utilService.showSuccessToast("File uploaded successfully!");
          navigate("/videos");
          setTitle("");
          setDescription("")
          setCategory(null);
          setSubcategories([]);
          setFile(null);
          dispatch(resetProgress());
        }
      });
    } catch (err) {
      console.error(err);
      utilService.showErrorToast("Failed to upload video.");
    }
  };

  const isSubmitDisabled = !title || !category || !file || (progress > 0 && progress < 100);

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
              onChange={(selected) => setCategory(selected)}
              options={categoryOptions}
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
                onChange={(selected) => setSubcategories(selected || [])}
                options={subcategoryOptions[category.value]}
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
              placeholder="Enter video title"
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
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              placeholder="Enter file description..."
            />
            <textarea/>
            {errors.description && (
              <Typography color="red" className="text-sm mt-1">
                {errors.description}
              </Typography>
            )}
          </div>

          {/* File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            />
            {errors.file && (
              <Typography color="red" className="text-sm mt-1">
                {errors.file}
              </Typography>
            )}
          </div>

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
            Upload File
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UploadVideo;
