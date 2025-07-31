import {
  Card, CardBody, CardHeader,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel, CardFooter, Avatar, Typography, Tabs, Switch, Tooltip, Button, Progress,
  Spinner,  // Add this import
} from "@material-tailwind/react";
import { HomeIcon, ArrowLeftIcon, ArrowPathIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, PencilIcon } from "@heroicons/react/24/solid";
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
import MealCard from "./MealCard";
import Gallery from "./galleryImages";
import WeightTracker from "./WeightTracker";
import StepsTracker from "./StepsTracker";
import WaterTracker from "./WaterTracker";
import MealTracker from "./MealTracker";
import Axios from "@/configs/Axios";
import NutritionTracker from "./NutritionTracker";
import SleepTracker from "./SleepTracker";
import BodyDataTracker from "./BodyDataTracker";
import BodyMeasurementTracker from "./BodyMeasurementTracker";
import HealthHabitsTracker from "./HealthHabitsTracker";
import HygieneTracker from "./HygieneTracker";
import HolisticWellnessTracker from "./HolisticWellnessTracker";
import WhatsNewTodayTracker from "./WhatsNewTodayTracker";
import KnowledgeSessionTracker from "./KnowledgeSessionTracker";
import WorkoutTracker from "./WorkoutTracker";

export function Profile({ id, closeModal }) {

  const dispatch = useDispatch();

  const { userProfile, profileLoading } = useSelector((state) => state.users);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id : loginUser } = useSelector((state) => state.auth);
  // console.log(loginUser,'====d==f=f=f')

  const [fileToDelete, setFileToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteFile = async (fileId) => {
    setIsDeleting(true);
    try {
      await Axios.delete(`/admin/user-upload-file/${fileId}/delete_blood_report`);
      dispatch(fetchUserDetails({ id }));
      setFileToDelete(null);
    } catch (error) {
      console.error("Failed to delete the file:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUserDetails({ id }));
  }, [dispatch, id]);

  const fetchDailyReport = async (id, date) => {
    setLoading(true);
    setError(null);
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await Axios.get(`/admin/user-daily-report/${id}`,
        {
          params: { date: formattedDate },
        }
      );

      // console.log(response.data, '======response======')

      setData(response.data);
    } catch (err) {
      setError("Failed to fetch the daily report.");
    } finally {
      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState("Weight");

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
  };

  useEffect(() => {
    fetchDailyReport(id, selectedDate);
  }, [id, selectedDate]);

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Spinner className="h-12 w-12 text-blue-500/10 animate-spin" />
          <Typography
            variant="h6"
            color="blue-gray"
            className="mt-4"
          >
            Loading user details...
          </Typography>
        </div>
      </div>
    );
  }


  const handleRefresh = () => {
    dispatch(fetchUserDetails({ id }));
    fetchDailyReport(id, selectedDate);
  };

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
                src={userProfile?.user?.profilePicture || "/img/profile.png"}
                alt="profile-picture"
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
                </Typography>
              </div>
            </div>
            <Button
              className="flex items-center gap-2"
              size="sm"
              onClick={handleRefresh}
            >
              <ArrowPathIcon className="h-4 w-4" /> Refresh
            </Button>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-0 xl:grid-cols-0">

            <ProfileInfoCard user={userProfile?.user} />
          </div>

          {userProfile?.user?.role === "user" && (
            <Tabs id="custom-animation" value={activeTab}>
              <TabsHeader className="gap-4 py-4" style={{ overflowX: "auto", whiteSpace: "nowrap", display: "flex" }} >

                <>
                  <Tab value="Weight" onClick={() => handleTabClick("Weight")}>
                    Weight
                  </Tab>
                  <Tab value="steps" onClick={() => handleTabClick("steps")}>
                    Steps
                  </Tab>
                  <Tab value="sleep" onClick={() => handleTabClick("sleep")}>
                    Sleep
                  </Tab>
                  <Tab value="water" onClick={() => handleTabClick("water")}>
                    Water
                  </Tab>
                  <Tab value="meals" onClick={() => handleTabClick("meals")}>
                    Meals
                  </Tab>
                  <Tab value="nutritions" onClick={() => handleTabClick("nutritions")}>
                    Nutritions
                  </Tab>

                  <Tab value="KnowledgeSessionTracker" onClick={() => handleTabClick("KnowledgeSessionTracker")}>
                    Knowledge Session
                  </Tab>

                  <Tab value="Workout" onClick={() => handleTabClick("Workout")}>
                    Workout Session
                  </Tab>

                  {/* <Tab value="bodydata" onClick={() => handleTabClick("bodydata")}>
                    Body Data
                  </Tab> */}

                  <Tab value="BodyMeasurement" onClick={() => handleTabClick("BodyMeasurement")}>
                    Body Measurement
                  </Tab>

                  <Tab value="HealthHabitsTracker" onClick={() => handleTabClick("HealthHabitsTracker")}>
                    Health Habits
                  </Tab>

                  {/* <Tab value="HygieneTracker" onClick={() => handleTabClick("HygieneTracker")}>
                    Hygiene
                  </Tab> */}

                  {/* <Tab value="HolisticWellnessTracker" onClick={() => handleTabClick("HolisticWellnessTracker")}>
                    Holistic Wellness
                  </Tab> */}

                  {/* <Tab value="WhatsNewTodayTracker" onClick={() => handleTabClick("WhatsNewTodayTracker")}>
                    Whats New Today
                  </Tab> */}


                  <Tab value="reminders" onClick={() => handleTabClick("reminders")}>
                    Reminders
                  </Tab>
                  <Tab value="gallery" onClick={() => handleTabClick("gallery")}>
                    Gallery
                  </Tab>
                </>

              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                {activeTab === "Weight" && (
                  <TabPanel value="Weight">
                    <WeightTracker
                      startWeight={data?.weightGoal?.startsWeight}
                      targetWeight={data?.weightGoal?.goalWeight}
                      currentWeight={data?.weightGoal?.currentWeight}
                    />
                  </TabPanel>
                )}
                {activeTab === "steps" && (
                  <TabPanel value="steps">
                    <StepsTracker userId={userProfile?.user?._id} />
                  </TabPanel>
                )}

                {activeTab === "sleep" && (
                  <TabPanel value="sleep">
                    <SleepTracker userId={userProfile?.user?._id} />
                  </TabPanel>
                )}

                {activeTab === "water" && (
                  <TabPanel value="water">
                    <WaterTracker userId={userProfile?.user?._id} />
                  </TabPanel>
                )}
                {activeTab === "meals" && (
                  <TabPanel value="meals">
                    <MealTracker userId={userProfile?.user?._id} loginUser={loginUser}/>
                  </TabPanel>
                )}
                {activeTab === "nutritions" && (
                  <NutritionTracker userId={userProfile?.user?._id} />
                )}

                {activeTab === "KnowledgeSessionTracker" && (
                  <KnowledgeSessionTracker userId={userProfile?.user?._id} />
                )}

                {activeTab === "Workout" && (
                  <WorkoutTracker userId={userProfile?.user?._id} />
                )}

                {activeTab === "bodydata" && (
                  <BodyDataTracker userId={userProfile?.user?._id} />
                )}

                {activeTab === "BodyMeasurement" && (
                  <BodyMeasurementTracker userId={userProfile?.user?._id} />
                )}


                {activeTab === "HealthHabitsTracker" && (
                  <HealthHabitsTracker userId={userProfile?.user?._id} />
                )}


                {activeTab === "HygieneTracker" && (
                  <HygieneTracker userId={userProfile?.user?._id} />
                )}

                {activeTab === "HolisticWellnessTracker" && (
                  <HolisticWellnessTracker userId={userProfile?.user?._id} />
                )}

                {activeTab === "WhatsNewTodayTracker" && (
                  <WhatsNewTodayTracker userId={userProfile?.user?._id} />
                )}



                {activeTab === "reminders" && (
                  <TabPanel value="reminders">
                    <AllReminders userId={userProfile?.user?._id} />
                  </TabPanel>
                )}
                {activeTab === "gallery" && (
                  <TabPanel value="gallery">
                    <Gallery userId={userProfile?.user?._id} />
                  </TabPanel>
                )}
              </TabsBody>
            </Tabs>)
          }

          {userProfile?.user?.role === 'user' && <PDFPreview userProfile={userProfile} onDelete={handleDeleteFile} />}

          {userProfile?.user?.role === 'user' && <RecommendedVideos userId={userProfile?.user?._id} />}

        </CardBody>
      </Card>

    </>
  );
}

export default Profile;
