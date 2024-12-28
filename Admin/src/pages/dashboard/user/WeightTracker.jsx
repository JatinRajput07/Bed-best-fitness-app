import React from "react";
import { Card, CardBody, Typography, Progress } from "@material-tailwind/react";

const WeightTracker = ({ startWeight, targetWeight, currentWeight }) => {

  const weightDifference = targetWeight - startWeight;
  const isGain = weightDifference > 0;
  const progress = Math.min(
    ((currentWeight - startWeight) / (targetWeight - startWeight)) * 100,
    100
  );

  const weightProgress = currentWeight - startWeight;
  const remainingWeight = targetWeight - currentWeight;

  return (
    <Card className="max-w-full mx-auto shadow-lg">
      <CardBody className="text-center space-y-6">
        <Typography variant="h5" className="font-bold">
          Weight Tracker
        </Typography>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="small" className="font-medium text-gray-600">
              Start Weight
            </Typography>
            <Typography variant="h6" className="font-bold">
              {startWeight?.toFixed(1)} kg
            </Typography>
          </div>
          <div>
            <Typography variant="small" className="font-medium text-gray-600">
              Target Weight
            </Typography>
            <Typography variant="h6" className="font-bold">
              {targetWeight?.toFixed(1)} kg
            </Typography>
          </div>
        </div>
        <div>
          <Typography variant="small" className="font-medium text-gray-600">
            Current Weight
          </Typography>
          <Typography variant="h6" className="font-bold">
            {currentWeight?.toFixed(1)} kg
          </Typography>
        </div>
        <div>
          <Typography
            variant="small"
            className={`font-medium ${isGain ? "text-green-600" : "text-red-600"}`}
          >
            {isGain ? "Weight Gained:" : "Weight Lost:"}
          </Typography>
          <Typography
            variant="h6"
            className={`font-bold ${isGain ? "text-green-600" : "text-red-600"}`}
          >
            {Math.abs(weightProgress).toFixed(1)} kg {isGain ? "gained" : "lost"}
          </Typography>
        </div>
        <div>
          <Typography
            variant="small"
            className={`font-medium ${remainingWeight <= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {remainingWeight <= 0 ? "Target Reached!" : "Remaining Weight:"}
          </Typography>
          <Typography
            variant="h6"
            className={`font-bold ${remainingWeight <= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {remainingWeight.toFixed(1)} kg
          </Typography>
        </div>
        <div>
          <Typography variant="small" className="font-medium text-gray-600">
            Progress
          </Typography>
          <Progress value={progress} color="blue" className="w-full" />
        </div>
      </CardBody>
    </Card>
  );
};

export default WeightTracker;
