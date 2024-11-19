import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { fetchCms, updateCms } from "../../redux/cmsSlice";
import AdminLayout from "../../components/AdminLayout";

const TermsAndConditions = () => {
  const dispatch = useDispatch();
  const policy = useSelector((state) => state.cms.content);
  
  const [title, setTitle] = useState("Terms & Condition");
  const [content, setContent] = useState("");
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    dispatch(fetchCms({ title: 'terms-condition' }));
  }, [dispatch]);

  useEffect(() => {
    if (policy) {
      setTitle(policy?.title || "Terms & Condition");
      setContent(policy?.content || "");
    }
  }, [policy]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);

    if (data !== policy.content) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  };

  const handleSave = () => {
    dispatch(updateCms({ title: 'terms-condition', content }));
    alert("Terms & Condition updated successfully!");
    setIsModified(false);
  };

  return (
    <AdminLayout title={"Terms & Condition"}>
      <div className="p-6 mx-auto bg-white shadow-md rounded-md">
        {/* <h1 className="text-2xl font-bold mb-4">Terms & Condition</h1> */}

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {content !== undefined && content !== null && (
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={handleEditorChange}
          />
        )}

        <button
          onClick={handleSave}
          disabled={!isModified}
          className={`px-4 py-2 ${isModified ? "bg-indigo-600" : "bg-gray-400"} text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4`}
        >
          {isModified ? "Save Changes" : "No Changes"}
        </button>
      </div>
    </AdminLayout>
  );
};

export default TermsAndConditions;
