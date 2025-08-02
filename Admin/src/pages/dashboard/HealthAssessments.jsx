import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Typography,
  Chip,
  IconButton,
  Spinner,
  Tooltip
} from "@material-tailwind/react";
import { 
  UserIcon, 
  PhoneIcon, 
  CalendarIcon, 
  EyeIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { HRADetailView } from "./HealthAssessmentView";

export const HRADataTable = () => {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://43.204.2.84:7200/hra/health-assessments");
        const result = await response.json();
        if (result.status === "success") {
          setData(result.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchData();
  }, [refresh]);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, hh:mm a");
    } catch {
      return "Invalid Date";
    }
  };

  const getObjectiveBadges = (objectives) => {
    if (!objectives || objectives.length === 0) {
      return (
        <Chip
          value="No objectives"
          className="text-xs bg-gray-100 text-gray-600"
        />
      );
    }
    
    return objectives.slice(0, 3).map((objective, index) => (
      <Chip
        key={index}
        value={objective}
        className="text-xs bg-blue-100 text-blue-800 mr-1 mb-1"
      />
    ));
  };

  const handleRefresh = () => {
    setRefresh(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full mt-6 border border-red-100">
        <CardBody className="text-center py-12">
          <ExclamationTriangleIcon className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <Typography variant="h5" color="red" className="mb-2">
            Error Loading Data
          </Typography>
          <Typography color="gray" className="mb-4">
            {error}
          </Typography>
          <Button 
            variant="gradient" 
            color="red" 
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Retry
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Typography variant="h3" className="font-bold text-gray-900 mb-1">
            Health Risk Assessments
          </Typography>
          <Typography variant="small" color="gray">
            View and manage all submitted assessment forms
          </Typography>
        </div>
        
        <div className="flex items-center gap-3">
          <Chip
            value={`Total: ${data.length}`}
            className="bg-blue-500 text-white"
          />
          <Button
            variant="outlined"
            color="blue"
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <ArrowPathIcon className={`h-4 w-4 ${refresh ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="w-full shadow-sm border border-blue-gray-50">
        <CardBody className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-4">
                    <Typography variant="small" className="font-bold text-blue-800 flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      Patient Details
                    </Typography>
                  </th>
                  <th className="p-4">
                    <Typography variant="small" className="font-bold text-blue-800 flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4" />
                      Contact
                    </Typography>
                  </th>
                  <th className="p-4">
                    <Typography variant="small" className="font-bold text-blue-800">
                      Health Objectives
                    </Typography>
                  </th>
                  <th className="p-4">
                    <Typography variant="small" className="font-bold text-blue-800 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Submitted
                    </Typography>
                  </th>
                  <th className="p-4">
                    <Typography variant="small" className="font-bold text-blue-800">
                      Actions
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((record, index) => (
                  <tr
                    key={record._id}
                    className={`border-b border-blue-gray-50 hover:bg-blue-50/50 cursor-pointer transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                    onClick={() => setSelectedRecord(record)}
                  >
                    <td className="p-4">
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-bold">
                          {record.name || "Anonymous"}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" className="font-mono">
                        {record.mobileNumber || "Not provided"}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap">
                        {getObjectiveBadges(record.mainObjective)}
                        {record.mainObjective?.length > 3 && (
                          <Tooltip content={record.mainObjective.slice(3).join(", ")}>
                            <Chip
                              value={`+${record.mainObjective.length - 3}`}
                              className="text-xs bg-gray-100 text-gray-600"
                            />
                          </Tooltip>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography variant="small">
                        {formatDate(record.createdAt)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Tooltip content="View Details">
                        <IconButton
                          variant="text"
                          color="blue"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecord(record);
                          }}
                        >
                          <EyeIcon className="h-5 w-5" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.length === 0 && (
            <div className="text-center py-12">
              <UserIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <Typography variant="h5" className="mb-2">
                No Assessments Found
              </Typography>
              <Typography variant="small" color="gray" className="max-w-md mx-auto">
                Health Risk Assessment forms will appear here once submitted by patients.
              </Typography>
            </div>
          )}
        </CardBody>
      </Card>

      {selectedRecord && (
        <HRADetailView
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
};