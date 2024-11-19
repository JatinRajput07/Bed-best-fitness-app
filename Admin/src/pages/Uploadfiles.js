import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';


const UploadFile = () => {
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Generate a preview if the file type is supported
      const fileType = selectedFile.type;
      if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
        setPreview(URL.createObjectURL(selectedFile));
      } else if (fileType === 'text/plain') {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsText(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !file) {
      setMessage('Please select a category and a file before uploading.');
      return;
    }

    // Prepare form data for upload
    const formData = new FormData();
    formData.append('category', category);
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully!');
        setCategory('');
        setFile(null);
        setPreview(null);
      } else {
        setMessage('Failed to upload the file.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('An error occurred during file upload.');
    }
  };

  return (
    <AdminLayout title="Upload File">
      <div className="p-6 mx-auto bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Upload a File</h1>
        {message && <p className="mb-4 text-sm text-red-600">{message}</p>}
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {preview && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
              {file.type.startsWith('image/') && <img src={preview} alt="Preview" className="max-w-full h-auto" />}
              {file.type.startsWith('video/') && (
                <video controls className="max-w-full h-auto">
                  <source src={preview} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              )}
              {file.type === 'text/plain' && (
                <textarea
                  readOnly
                  value={preview}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Upload
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UploadFile;
