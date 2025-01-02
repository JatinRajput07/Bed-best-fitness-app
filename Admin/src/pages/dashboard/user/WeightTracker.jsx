import React from "react";
import { Card, CardBody, Typography, Progress } from "@material-tailwind/react";

const WeightTracker = ({ startWeight, targetWeight, currentWeight }) => {

  const weightDifference = targetWeight - startWeight;
  const isGain = weightDifference > 0;
  const isLoss = weightDifference < 0;

  // Progress calculation
  const progress = isGain
    ? Math.min(((currentWeight - startWeight) / (targetWeight - startWeight)) * 100, 100)
    : Math.min(((startWeight - currentWeight) / (startWeight - targetWeight)) * 100, 100);

  const weightProgress = currentWeight - startWeight;
  const remainingWeight = isGain ? targetWeight - currentWeight : currentWeight - targetWeight;

  // Messages based on progress and weight goal
  let message = '';
  if (isGain) {
    if (currentWeight >= targetWeight) {
      message = `Target Reached! You've gained ${Math.abs(weightProgress).toFixed(1)} kg.`;
    } else if (currentWeight > startWeight) {
      message = `You gained ${Math.abs(weightProgress).toFixed(1)} kg.`;
    }
    if (currentWeight > targetWeight) {
      message = `You've exceeded your target weight by ${Math.abs(currentWeight - targetWeight).toFixed(1)} kg.`;
    }
  } else if (isLoss) {
    if (currentWeight <= targetWeight) {
      message = `Target Reached! You've lost ${Math.abs(weightProgress).toFixed(1)} kg.`;
    } else if (currentWeight < startWeight) {
      message = `You lost ${Math.abs(weightProgress).toFixed(1)} kg.`;
    }
    if (currentWeight < targetWeight) {
      message = `You've exceeded your target weight loss and gained ${Math.abs(currentWeight - targetWeight).toFixed(1)} kg.`;
    }
  }

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

        {message && (
          <div className="mt-4">
            <Typography variant="small" className="font-medium text-gray-600">
              {message}
            </Typography>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default WeightTracker;
