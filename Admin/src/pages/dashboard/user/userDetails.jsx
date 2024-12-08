import { Card, CardBody, CardHeader, CardFooter, Avatar, Typography, Tabs, TabsHeader, Tab, Switch, Tooltip, Button, Progress, } from "@material-tailwind/react";
import { HomeIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, PencilIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "@/redux/userSlice";

export function Profile({ id, closeModal }) {


  const dispatch = useDispatch();

  const { userProfile, profileLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserDetails({ id }));
  }, [dispatch, id]);

  if (profileLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
                {userProfile?.user?.name}
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
                    Daily Steps Goal
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
            {/* User Info Section */}
            <ProfileInfoCard user={userProfile?.user} />
          </div>

          {/* Daily Progress Section */}
          <Typography variant="h6" color="blue-gray" className="mt-8 mb-4">
            Today's Progress
          </Typography>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {/* Weight Progress */}
            <Card shadow={false} className="p-6 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Weight Goal
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Current Weight: <span className="text-blue-gray-800">85 kg</span>
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Target Weight: <span className="text-blue-gray-800">75 kg</span>
              </Typography>
              <Progress value={50} color="green" className="mt-4" />
              <Typography
                variant="small"
                color="blue-gray"
                className="mt-2 text-center"
              >
                Progress: <span className="font-bold text-green-600">50%</span>
              </Typography>
            </Card>

            {/* Steps Progress */}
            <Card shadow={false} className="p-6 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Steps Goal
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Steps Taken Today: <span className="text-blue-gray-800">8,000</span>
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Daily Goal: <span className="text-blue-gray-800">10,000</span>
              </Typography>
              <Progress value={80} color="blue" className="mt-4" />
              <Typography
                variant="small"
                color="blue-gray"
                className="mt-2 text-center"
              >
                Progress: <span className="font-bold text-blue-600">80%</span>
              </Typography>
            </Card>

            {/* Water Intake Progress */}
            <Card shadow={false} className="p-6 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Water Intake Goal
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Water Drank Today: <span className="text-blue-gray-800">2.5 L</span>
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Daily Goal: <span className="text-blue-gray-800">3 L</span>
              </Typography>
              <Progress value={83} color="cyan" className="mt-4" />
              <Typography
                variant="small"
                color="blue-gray"
                className="mt-2 text-center"
              >
                Progress: <span className="font-bold text-cyan-600">83%</span>
              </Typography>
            </Card>

            {/* Calories Consumed Progress */}
            <Card shadow={false} className="p-6 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Calories Goal
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Calories Consumed Today: <span className="text-blue-gray-800">1,800</span>
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Daily Goal: <span className="text-blue-gray-800">2,000</span>
              </Typography>
              <Progress value={90} color="orange" className="mt-4" />
              <Typography
                variant="small"
                color="blue-gray"
                className="mt-2 text-center"
              >
                Progress: <span className="font-bold text-orange-600">90%</span>
              </Typography>
            </Card>
          </div>




          <div className="px-4 mt-8 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Feed ( Post's )
            </Typography>

            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
                ({ img, title, description, tag, route, members }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                  </Card>
                )
              )}
            </div>
          </div>



          <div className="px-4 mt-8 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Recomended Videos
            </Typography>

            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
                ({ img, title, description, tag, route, members }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                  </Card>
                )
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
