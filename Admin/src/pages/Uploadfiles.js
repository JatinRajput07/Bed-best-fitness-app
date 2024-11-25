import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile, resetProgress } from '../redux/uploadFileSlice';
import AdminLayout from '../components/AdminLayout';
import { utilService } from '../utilService';
import { createVideo } from '../redux/videoSlice';
import Select from 'react-select'; // Import react-select for better dropdowns

const UploadFile = () => {
  const [category, setCategory] = useState(null);  // Track the selected category
  const [title, setTitle] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);  // Track the selected subcategories
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { progress, error, filePath } = useSelector((state) => state.uploadFiles);

  const subcategories = {
    'workout-video': [
      { value: 'body', label: 'Body' },
      { value: 'neck-pain', label: 'Neck Pain' },
      { value: 'foot-muscles', label: 'Foot Muscles' },
      { value: 'upper-body', label: 'Upper Body' },
      { value: 'lower-body', label: 'Lower Body' },
    ],
    'recipe-video': [
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'snacks', label: 'Snacks' },
      { value: 'lunch', label: 'Lunch' },
      { value: 'dinner', label: 'Dinner' },
    ],
    'knowledge-video': [
      { value: 'nutrition-diet', label: 'Nutrition Diet' },
      { value: 'skin-care', label: 'Skin Care' },
      { value: 'sleep', label: 'Sleep' },
      { value: 'avoid-tobacco', label: 'Avoid Tobacco' },
    ],
    'story-podcast-recognition-video': [
      { value: 'story', label: 'Story' },
      { value: 'podcast', label: 'Podcast' },
      { value: 'recognition', label: 'Recognition' },
    ],
  };

  // Handle category change and set default subcategories
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
    setSelectedSubcategories([]);  // Reset selected subcategories when category changes
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!category) {
      formErrors.category = 'Category is required';
    }
    if (!title) {
      formErrors.title = 'Title is required';
    }
    if (!file) {
      formErrors.file = 'File is required';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      dispatch(resetProgress());
      dispatch(uploadFile(selectedFile));
    }
  };

  const handleSubcategoryChange = (selectedOptions) => {
    setSelectedSubcategories(selectedOptions ? selectedOptions.map(option => option.value) : []);  // Store selected subcategories as an array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Dispatch the create video action with the selected category, subcategories, title, and file path
      await dispatch(createVideo({
        title,
        path: filePath,
        category: category.value, // Send category value
        subcategories: selectedSubcategories, // Send subcategories array
      }));
      utilService.showSuccessToast('Video metadata successfully saved!');
      setCategory(null);
      setTitle('');
      setSelectedSubcategories([]);
      setFile(null);
      dispatch(resetProgress());

    } catch (error) {
      console.error('Error creating video:', error);
      utilService.showErrorToast('An error occurred while saving the video metadata.');
    }
  };

  // Categories for react-select dropdown
  const categoryOptions = [
    { value: 'workout-video', label: 'Workout Video' },
    { value: 'recipe-video', label: 'Recipe Video' },
    { value: 'knowledge-video', label: 'Knowledge Video' },
    { value: 'story-podcast-recognition-video', label: 'Story/Podcast/Recognition Video' },
  ];

  return (
    <AdminLayout title="Upload File">
      <div className="p-6 mx-auto bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <Select
              value={category}
              onChange={handleCategoryChange}
              options={categoryOptions}
              placeholder="Select a category"
              isClearable
            />
            {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter video title"
            />
            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
          </div>

          {/* Subcategory Select (Multiple Select) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategories</label>
            <Select
              value={selectedSubcategories.map(sub => ({ label: sub, value: sub }))} // map to object format
              onChange={handleSubcategoryChange}
              options={subcategories[category?.value] || []} // Show subcategories based on selected category
              isMulti
              placeholder="Select subcategories"
            />
            {errors.subcategory && <p className="text-sm text-red-600 mt-1">{errors.subcategory}</p>}
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.file && <p className="text-sm text-red-600 mt-1">{errors.file}</p>}
          </div>

          {/* Upload Progress */}
          {progress > 0 && progress < 100 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Uploading...</label>
              <progress value={progress} max="100" className="w-full">{progress}%</progress>
              <p className="text-sm mt-2">Progress: {progress}%</p>
            </div>
          )}

          {/* Uploaded Video Preview */}
          {filePath && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Uploaded Video</label>
              <video controls src={filePath} className="w-full max-w-md" />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={progress > 0 && progress < 100}
          >
            {progress > 0 && progress < 100 ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UploadFile;
