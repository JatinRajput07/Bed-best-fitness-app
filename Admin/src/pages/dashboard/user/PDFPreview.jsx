import { Card, CardHeader, Typography, Button } from "@material-tailwind/react";
import { useState } from "react";

function PDFPreview({ userProfile, onDelete }) {
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  return (
    <div className="px-4 mt-8 pb-4">
      <Typography variant="h6" color="blue-gray" className="mb-4">
        Blood Report Files
      </Typography>
      <div className="mt-6  grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
        {userProfile?.userfiles
          ?.filter(({ type }) => type === "pdf")
          .map(({ path, _id }, key) => (
            <Card key={key} className="group">
              <CardHeader className="relative flex items-center justify-between p-4">
                <span className="text-blue-600 underline group-hover:text-blue-800 cursor-pointer">
                  Report #{key + 1}
                </span>
                <button
                  onClick={() => setConfirmDelete(_id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </CardHeader>
              <Button
                variant="text"
                color="blue"
                onClick={() => setSelectedPDF(path)}
              >
                Preview PDF
              </Button>
            </Card>
          ))}
      </div>

      {/* PDF Preview Modal */}
      {selectedPDF && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-3/4 lg:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">PDF Preview</Typography>
              <button
                onClick={() => setSelectedPDF(null)}
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>
            <iframe
              src={selectedPDF}
              title="PDF Preview"
              className="w-full h-96 border"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <Typography variant="h6" className="mb-4">
              Confirm Deletion
            </Typography>
            <Typography className="mb-4">
              Are you sure you want to delete this PDF?
            </Typography>
            <div className="flex justify-end gap-4">
              <Button variant="outlined" onClick={() => setConfirmDelete(null)}>
                Cancel
              </Button>
              <Button
                variant="filled"
                color="red"
                onClick={() => {
                  onDelete(confirmDelete);
                  setConfirmDelete(null);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDFPreview;
