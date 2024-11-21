import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile, resetProgress } from '../redux/uploadFileSlice';
import AdminLayout from '../components/AdminLayout';
import { utilService } from '../utilService';
import { createVideo } from '../redux/videoSlice';

const UploadFile = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { progress, error, filePath } = useSelector((state) => state.uploadFiles);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      await dispatch(createVideo({
        title,
        path: filePath,
        category
      }));
      utilService.showSuccessToast('Video metadata successfully saved!');
      setCategory('');
      setTitle('');
      dispatch(resetProgress());

    } catch (error) {
      console.error('Error creating video:', error);
      utilService.showErrorToast('An error occurred while saving the video metadata.');
    }
  };

  return (
    <AdminLayout title="Upload File">
      <div className="p-6 mx-auto bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">{""}</h1>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a category</option>
              <option value="workout-video">Workout Video</option>
              <option value="recipe-video">Recipe Video</option>
              <option value="knowledge-video">Knowledge Video</option>
              <option value="story-podcast-recognition-video">Story/Podcast/Recognition Video</option>
            </select>
            {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.file && <p className="text-sm text-red-600 mt-1">{errors.file}</p>}

          </div>

          {progress > 0 && progress < 100 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Uploading...</label>
              <progress value={progress} max="100" className="w-full">{progress}%</progress>
              <p className="text-sm mt-2">Progress: {progress}%</p>
            </div>
          )}

          {filePath && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Uploaded Video</label>
              <video className='' controls src={filePath} />
            </div>
          )}

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
