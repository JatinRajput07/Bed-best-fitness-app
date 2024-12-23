import {
  Card, CardBody, CardHeader,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel, CardFooter, Avatar, Typography, Tabs, Switch, Tooltip, Button, Progress,
} from "@material-tailwind/react";
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
import MealCard from "./MealCard";
import Gallery from "./galleryImages";
import WeightTracker from "./WeightTracker";
import StepsTracker from "./StepsTracker";
import WaterTracker from "./WaterTracker";
import MealTracker from "./MealTracker";
import Axios from "@/configs/Axios";

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
      const response = await Axios.get(`/admin/user-daily-report/${id}`,
        {
          params: { date: formattedDate },
        }
      );

      console.log(response.data ,'======response======')

      setData(response.data);
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
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-0 xl:grid-cols-0">

            <ProfileInfoCard user={userProfile?.user} />
          </div>

          <Tabs id="custom-animation" value="Weight">
            <TabsHeader>
              {userProfile?.user?.role === 'user' && <Tab value="Weight">Weight</Tab>}
              {userProfile?.user?.role === 'user' && <Tab value="steps">Steps</Tab>}
              {userProfile?.user?.role === 'user' && <Tab value="water">Water</Tab>}
              {userProfile?.user?.role === 'user' && <Tab value="meals">Meals</Tab>}
              {userProfile?.user?.role === 'user' && <Tab value="nutritions">Nutritions</Tab>}
              {userProfile?.user?.role === 'user' && <Tab value="reminderds">Reminders</Tab>}
              {userProfile?.user?.role === 'user' && <Tab value="gallery">Gallery</Tab>}
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              {userProfile?.user?.role === 'user' && (
                <TabPanel value="Weight">
                  <WeightTracker
                    startWeight={data?.weightGoal?.startsWeight}
                    targetWeight={data?.weightGoal?.goalWeight}
                    currentWeight={data?.weightGoal?.currentWeight}
                  />
                </TabPanel>
              )}

              {userProfile?.user?.role === 'user' && (
                <TabPanel value="steps">
                  <StepsTracker data={data?.stepTrack} />
                </TabPanel>
              )}

              {userProfile?.user?.role === 'user' && (
                <TabPanel value="water">
                  <WaterTracker data={data?.waterTrack} />
                </TabPanel>
              )}

              {userProfile?.user?.role === 'user' && (
                <TabPanel value="meals">
                  <MealTracker />
                </TabPanel>
              )}

              {userProfile?.user?.role === 'user' && (
                <TabPanel value="nutritions">
                  This is the Nutritions content.
                </TabPanel>
              )}

              {userProfile?.user?.role === 'user' && (
                <TabPanel value="reminderds">
                  <AllReminders userId={userProfile?.user?._id} />
                </TabPanel>
              )}

              {userProfile?.user?.role === 'user' && (
                <TabPanel value="gallery">
                  <Gallery />
                </TabPanel>
              )}
            </TabsBody>
          </Tabs>


          {userProfile?.user?.role === 'user' && <OtherHyginData selectedDate={selectedDate.toISOString().split("T")[0]} userId={userProfile?.user?._id} />}

          {userProfile?.user?.role === 'user' && <PDFPreview userProfile={userProfile} />}

          {userProfile?.user?.role === 'user' && <RecommendedVideos userId={userProfile?.user?._id} />}

        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
