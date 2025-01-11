import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchCms, updateCms } from "../../redux/cmsSlice";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";

const DeleteAccountPolicy = () => {
  const dispatch = useDispatch();
  const policy = useSelector((state) => state.cms.content);

  const [title, setTitle] = useState("Delete Account");
  const [content, setContent] = useState("");
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    dispatch(fetchCms({ title: "delete-account" }));
  }, [dispatch]);

  useEffect(() => {
    if (policy) {
      setTitle(policy?.title || "Delete Account");
      setContent(policy?.content || "");
    }
  }, [policy]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);

    setIsModified(data !== policy.content);
  };

  const handleSave = () => {
    dispatch(updateCms({ title: "delete-account", content }));
    alert("Delete Account updated successfully!");
    setIsModified(false);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Delete Account Policy
          </Typography>
        </CardHeader>
        <CardBody className="p-6">
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
          <Button
            onClick={handleSave}
            disabled={!isModified}
            className={`mt-4 ${isModified ? "bg-indigo-600" : "bg-gray-400"} text-white`}
          >
            {isModified ? "Save Changes" : "No Changes"}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default DeleteAccountPolicy;
