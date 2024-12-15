import { Card, CardBody, CardHeader, CardFooter, Avatar, Typography, Tabs, TabsHeader, Tab, Switch, Tooltip, Button, Progress, } from "@material-tailwind/react";
import { HomeIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, PencilIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "@/redux/userSlice";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import PDFPreview from "./PDFPreview";
import RecommendedVideos from "./RecommendedVideos";
import AllReminders from "./AllReminders";
import OtherHyginData from "./OtherHyginData";

export function Profile({ id, closeModal }) {

  const dispatch = useDispatch();

  const { userProfile, profileLoading } = useSelector((state) => state.users);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchUserDetails({ id }));
  }, [dispatch, id]);

  const fetchDailyReport = async (id, date) => {
    setLoading(true);
    setError(null);
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await axios.get(
        `http://43.204.2.84:7200/admin/user-daily-report/${id}`,
        {
          params: { date: formattedDate },
        }
      );
      setData(response.data.data);
    } catch (err) {
      setError("Failed to fetch the daily report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyReport(id, selectedDate);
  }, [id, selectedDate]);

  if (profileLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div className="relative h-20 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        <ArrowLeftIcon onClick={closeModal} className="absolute left-4 top-4 h-6 w-6 text-white" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {userProfile?.user?.name || ""}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {userProfile?.user?.City}, {userProfile?.user?.Country}
                  {/* CEO / Co-Founder */}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-0 xl:grid-cols-0">
            <div>
              {/* Goals Section */}
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Your Fitness Goals
              </Typography>
              <div className="grid grid-cols-2 gap-6">
                <Card shadow={false} className="p-4 border  border-gray-200">
                  <Typography variant="small" color="blue-gray" className="mb-2">
                    Current Weight
                  </Typography>
                  <Typography variant="h5" color="green">
                    {userProfile?.userGoal?.weightGoal?.currentWeight || "N/A"} kg
                  </Typography>
                </Card>
                <Card shadow={false} className="p-4 border  border-gray-200">
                  <Typography variant="small" color="blue-gray" className="mb-2">
                    Target Weight
                  </Typography>
                  <Typography variant="h5" color="cyan">
                    {userProfile?.userGoal?.weightGoal?.goalWeight || "N/A"} kg
                  </Typography>
                </Card>
                <Card shadow={false} className="p-4 border  border-gray-200">
                  <Typography variant="small" color="blue-gray" className="mb-2">
                    {`Daily Steps Goal` || ""}
                  </Typography>
                  <Typography variant="h5" color="blue">
                    {userProfile?.userGoal?.dailyStepsGoal || "N/A"} steps
                  </Typography>
                </Card>
                <Card shadow={false} className="p-4 border  border-gray-200">
                  <Typography variant="small" color="blue-gray" className="mb-2">
                    Water Intake Goal
                  </Typography>
                  <Typography variant="h5" color="blue-gray">
                    {userProfile?.userGoal?.dailyWaterGoal || "N/A"} L
                  </Typography>
                </Card>
                <Card shadow={false} className="p-6 border border-gray-200 col-span-2  rounded-xl">
                  <Typography variant="small" color="blue-gray" className="mb-4 font-semibold">
                    Nutrition Goal
                  </Typography>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Typography variant="h5" color="green" className="font-medium">Protein</Typography>
                      <Typography variant="h5" color="teal">{userProfile?.userGoal?.nutritionGoals?.macronutrientsBudget?.protein || "N/A"} g</Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <Typography variant="h5" color="yellow-500" className="font-medium">Fats</Typography>
                      <Typography variant="h5" color="teal">{userProfile?.userGoal?.nutritionGoals?.macronutrientsBudget?.fats || "N/A"} g</Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <Typography variant="h5" color="blue-500" className="font-medium">Carbs</Typography>
                      <Typography variant="h5" color="teal">{userProfile?.userGoal?.nutritionGoals?.macronutrientsBudget?.carbs || "N/A"} g</Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <Typography variant="h5" color="purple-500" className="font-medium">Fiber</Typography>
                      <Typography variant="h5" color="teal">{userProfile?.userGoal?.nutritionGoals?.macronutrientsBudget?.fiber || "N/A"} g</Typography>
                    </div>
                    <div className="flex justify-between items-center border-gray-300 pt-4">
                      <Typography variant="h5" color="red-500" className="font-medium">Daily Calorie Budget</Typography>
                      <Typography variant="h5" color="teal">{userProfile?.userGoal?.nutritionGoals?.dailyCalorieBudget || "N/A"} kcal</Typography>
                    </div>
                  </div>
                </Card>
              </div>
            </div>


            <ProfileInfoCard user={userProfile?.user} />
          </div>

          <div>
            {/* Calendar Filter */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Select Date
              </Typography>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <div className="flex items-center">
                    <input
                      ref={inputRef}
                      {...inputProps}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                    {InputProps?.endAdornment}
                  </div>
                )}
              />
            </LocalizationProvider>

            {loading ? (
              <div>Loading...</div>
            ) : data ? (
              <div>
                <Typography variant="h6" color="blue-gray" className="mt-8 mb-4">
                  Progress for {new Date(data.routine.date).toDateString()}
                </Typography>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                  {/* Weight Goal */}
                  <Card shadow={false} className="p-6 border border-gray-200 rounded-lg">
                    <Typography variant="h6" color="blue-gray" className="mb-4">
                      Weight Goal
                    </Typography>

                    {console.log(data.goals, ';====d==d=d=dd=')}

                    <Typography variant="small" className="text-gray-600">
                      {data.goals.weightGoal}
                    </Typography>
                  </Card>

                  {/* Steps Goal */}
                  <Card shadow={false} className="p-6 border border-gray-200 rounded-lg">
                    <Typography variant="h6" color="blue-gray" className="mb-4">
                      Steps Goal
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      Steps Taken:{" "}
                      <span className="text-blue-gray-800">{data.goals.steps.achieved}</span>
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      Daily Goal:{" "}
                      <span className="text-blue-gray-800">{data.goals.steps.target}</span>
                    </Typography>
                    <Progress
                      value={parseFloat(data.goals.steps.percentage)}
                      color="blue"
                      className="mt-4"
                    />
                    <Typography variant="small" color="blue-gray" className="mt-2 text-center">
                      Progress:{" "}
                      <span className="font-bold text-blue-600">
                        {data.goals.steps.percentage}%
                      </span>
                    </Typography>
                  </Card>

                  {/* Water Intake Goal */}
                  <Card shadow={false} className="p-6 border border-gray-200 rounded-lg">
                    <Typography variant="h6" color="blue-gray" className="mb-4">
                      Water Intake Goal
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      Water Drank:{" "}
                      <span className="text-blue-gray-800">
                        {data.goals.water.achieved} L ({Math.round((data.goals.water.achieved * 1000) / 250)} glasses)
                      </span>
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      Daily Goal:{" "}
                      <span className="text-blue-gray-800">{data.goals.water.target} L</span>
                    </Typography>
                    <Progress
                      value={parseFloat(data.goals.water.percentage)}
                      color="cyan"
                      className="mt-4"
                    />
                    <Typography variant="small" color="blue-gray" className="mt-2 text-center">
                      Progress:{" "}
                      <span className="font-bold text-cyan-600">
                        {data.goals.water.percentage}%
                      </span>
                    </Typography>
                  </Card>
                </div>

                {/* Meals Section */}
                <div className="mt-8">
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    Meals for the Day
                  </Typography>
                  {data.routine.meals.map((meal, index) => (
                    <Card
                      key={index}
                      shadow={false}
                      className="p-6 border border-gray-200 rounded-lg mb-4"
                    >
                      <Typography variant="h6" color="blue-gray" className="mb-2">
                        {meal.category.replace("_", " ").toUpperCase()}
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        Status: <span className="text-blue-gray-800">{meal.status}</span>
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        Note: <span className="text-blue-gray-800">{meal.note}</span>
                      </Typography>
                      <ul className="list-disc pl-6 mt-2">
                        {Object.entries(meal.items).map(([key, item]) => (
                          <li key={item._id} className="text-gray-600">
                            {key.replace("_", " ")}: {item}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div>No data available for the selected date.</div>
            )}
          </div>

          <OtherHyginData selectedDate={selectedDate.toISOString().split("T")[0]} userId={userProfile?.user?._id} />


          {console.log(userProfile, '=========userProfile====')}

          <AllReminders userId={userProfile?.user?._id} />

          <PDFPreview userProfile={userProfile} />

          <RecommendedVideos userId={userProfile?.user?._id} />

        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
