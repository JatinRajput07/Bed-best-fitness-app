import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchCms, updateCms } from "../../redux/cmsSlice";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";

const HelpAndSupport = () => {
  const dispatch = useDispatch();
  const helpContent = useSelector((state) => state.cms.content);

  const [title, setTitle] = useState("Help and Support");
  const [content, setContent] = useState("");
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    dispatch(fetchCms({ title: "help-and-support" }));
  }, [dispatch]);

  useEffect(() => {
    if (helpContent) {
      setTitle(helpContent?.title || "Help and Support");
      setContent(helpContent?.content || "");
    }
  }, [helpContent]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);

    setIsModified(data !== helpContent.content);
  };

  const handleSave = () => {
    dispatch(updateCms({ title: "help-and-support", content }));
    alert("Help and Support updated successfully!");
    setIsModified(false);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Help and Support
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

export default HelpAndSupport;