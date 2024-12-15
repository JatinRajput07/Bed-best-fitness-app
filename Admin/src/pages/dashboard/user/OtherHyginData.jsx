import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, Grid, Switch } from "@mui/material";
import { CircularProgress } from "@mui/material";

import Axios from "@/configs/Axios";

const OtherHyginData = ({ selectedDate, userId }) => {
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await Axios.get(`/admin/getHealthHabits/${userId}`, {
          params: { date: selectedDate },
        });
        setRoutine(response.data.routine);
      } catch (error) {
        console.error("Error fetching routine:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutine();
  }, [userId, selectedDate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!routine) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="textSecondary">
          No routine data available for the selected date.
        </Typography>
      </div>
    );
  }

  const renderCategory = (title, data) => (
    <Card className="shadow-lg hover:shadow-2xl transition-all duration-300">
      <CardContent>
        <Typography  className="text-center">
          {title}
        </Typography>
        <Divider className="mb-4" />
        <Grid container spacing={2}>
          {Object.keys(data).map((key) => (
            <Grid className="w-full" item key={key}>
              <div className="flex justify-between items-center bg-gray-100 px-3 rounded-lg shadow-sm">
                <Typography className="capitalize">
                  {key.replace(/_/g, " ")}
                </Typography>
                <Switch
                  checked={data[key]}
                  disabled
                  color={data[key] ? "success" : "default"}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <div className=" bg-gray-50 p-6">
      <Grid container spacing={1}>
        {routine.health_habits && (
          <Grid item xs={3} md={3}>
            {renderCategory("Health Habits", routine.health_habits)}
          </Grid>
        )}
        {routine.hygiene && (
          <Grid item xs={3} md={3}>
            {renderCategory("Hygiene", routine.hygiene)}
          </Grid>
        )}
        {routine.holistic_wellness && (
          <Grid item xs={3} md={3}>
            {renderCategory("Holistic Wellness", routine.holistic_wellness)}
          </Grid>
        )}
        {routine.what_new_today && (
          <Grid item xs={3} md={3}>
            {renderCategory("What's New Today", routine.what_new_today)}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default OtherHyginData;
