import { Card, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";

function PDFPreview({ userProfile }) {
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [iframeSize, setIframeSize] = useState({ width: "100%", height: "600px" });
  return (
    <div className="px-4 mt-8 pb-4">
      <Typography variant="h6" color="blue-gray" className="mb-2">
      Blood Report Files
      </Typography>
      <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
        {userProfile?.userfiles.map(({ path, type }, key) => (
          type === "pdf" && (
            <Card
              key={key + 1}
              color="transparent"
              shadow={false}
              className="cursor-pointer"
              onClick={() => setSelectedPDF(path)}
            >
              <CardHeader floated={false} className="mx-0 mt-0 mb-4 h-16 flex items-center justify-center">
                <div className="text-blue-600 underline">
                  View Blood Report #{key + 1}
                </div>
              </CardHeader>
            </Card>
          )
        ))}
      </div>

      {/* Modal for PDF Preview */}
      {selectedPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-3/4 lg:w-1/2 relative">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">PDF Preview</Typography>
              <button
                onClick={() => setSelectedPDF(null)}
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

          
            {/* Iframe for PDF */}
            <iframe
              src={selectedPDF}
              title="PDF Preview"
              style={{
                width: iframeSize.width,
                height: iframeSize.height,
              }}
              frameBorder="0"
              className="border"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDFPreview;
