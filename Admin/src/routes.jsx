import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
  HomeIcon,
  UserIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ListBulletIcon,
  ArchiveBoxIcon,
  CameraIcon,
  StopIcon,
  PhotoIcon,
  InformationCircleIcon,
  ChatBubbleOvalLeftIcon
} from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
// import { Home, Profile, Notifications, UserList } from "@/pages/dashboard";
// Lazy load components

const ChatComponent = React.lazy(() => import("@/pages/dashboard/Chat"));
const IntroductionManagement = React.lazy(() => import("@/pages/dashboard/Introduction"));
const HelpAndSupport = React.lazy(() => import("@/pages/dashboard/HelpAndSupport"));
const Home = React.lazy(() => import("@/pages/dashboard/Home"));
const Highlights = React.lazy(() => import("@/pages/dashboard/Highlights"));
const Profile = React.lazy(() => import("@/pages/dashboard/Profile"));
const Notifications = React.lazy(() => import("@/pages/dashboard/Notifications"));
const UserList = React.lazy(() => import("@/pages/dashboard/user/users"));
const Videos = React.lazy(() => import("./pages/dashboard/videos"));
const PrivacyPolicy = React.lazy(() => import("./pages/dashboard/PrivacyPolicy"));
const VideoUpload = React.lazy(() => import("./pages/dashboard/VideoUpload"));
const TermsAndConditions = React.lazy(() => import("./pages/dashboard/TermsAndConditions"));
const AssignUsersToHost = React.lazy(() => import("./pages/dashboard/AssignUsersToHost"));
const AdminAssignments = React.lazy(() => import("./pages/dashboard/asignuser/list"));
const CreateOrUpdateUser = React.lazy(() => import("./pages/dashboard/user/CreateOrUpdateUser"));
const MealForm = React.lazy(() => import("./pages/dashboard/MealAndNutrition/MealForm"));
const Nutrition = React.lazy(() => import("./pages/dashboard/MealAndNutrition/NutritionForm"));
const CategoryManager = React.lazy(() => import("./pages/CategoryManager"));
const Meeting = React.lazy(() => import("./pages/dashboard/Meeting"));
const BannerManagement = React.lazy(() => import("./pages/dashboard/Banner"));
const Logout = React.lazy(() => import("@/pages/auth/Logout"));
const CommunityGuidelines = React.lazy(() => import("./pages/dashboard/Community_guidelines"));

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = () => {
  const { role } = useSelector((state) => state.auth);

  const pages = [
    {
      icon: <HomeIcon {...icon} />,
      name: "Dashboard",
      path: "/home",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      ),
    },
    {
      icon: <UserIcon {...icon} />,
      name: "Users",
      path: "/users",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <UserList />
        </Suspense>
      ),
    },
    {
      icon: <ArchiveBoxIcon {...icon} />,
      name: "Meal And Nutrition",
      dropdown: [
        {
          name: "Meal",
          path: "/meal",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <MealForm />
            </Suspense>
          ),
        },
        {
          name: "Nutrition",
          path: "/nutrition",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Nutrition />
            </Suspense>
          ),
        },
      ],
    },
    {
      icon: <PhotoIcon {...icon} />,
      name: "Highlights",
      path: "/highlights",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Highlights />
        </Suspense>
      ),
    },
    {
      icon: <VideoCameraIcon {...icon} />,
      name: "Audio or video",
      dropdown: [
        {
          name: "Audio/video List",
          path: "/videos",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Videos />
            </Suspense>
          ),
        },
        {
          name: "Upload Audio/video",
          path: "/video-upload",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <VideoUpload />
            </Suspense>
          ),
        },
      ],
    },
    ...(role !== "admin"
      ? [
          {
            icon: <ChatBubbleOvalLeftIcon {...icon} />,
            name: "Chats",
            path: "/chats",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <ChatComponent />
              </Suspense>
            ),
          },
        ]
      : []),
    ...(role !== "host" ? [
      {
        icon: <StopIcon {...icon} />,
        name: "Banners",
        path: "/banner",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BannerManagement />
          </Suspense>
        ),
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Introduction",
        path: "/introduction",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <IntroductionManagement />
          </Suspense>
        ),
      },
      {
        icon: <CameraIcon {...icon} />,
        name: "Meeting",
        path: "/meeting",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Meeting />
          </Suspense>
        ),
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Assign Users To Host",
        dropdown: [
          {
            name: "Create",
            path: "/assign-users",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AssignUsersToHost />
              </Suspense>
            ),
          },
          {
            name: "List",
            path: "/assign-users-list",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AdminAssignments />
              </Suspense>
            ),
          },
        ],
      },

      {
        icon: <ListBulletIcon {...icon} />,
        name: "Categories",
        path: "/categories",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CategoryManager />
          </Suspense>
        ),
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "CMS",
        dropdown: [
          {
            name: "Privacy Policy",
            path: "/privacy-policy",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PrivacyPolicy />
              </Suspense>
            ),
          },
          {
            name: "Terms & Conditions",
            path: "/terms-and-conditions",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <TermsAndConditions />
              </Suspense>
            ),
          },
          {
            name: "Community Guidelines",
            path: "/community-guidelines",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <CommunityGuidelines />
              </Suspense>
            ),
          },
          {
            name: "Help and Support",
            path: "/help-and-support",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <HelpAndSupport />
              </Suspense>
            ),
          },
        ],
      },
    ] : []),
    {
      icon: <ArrowLeftIcon {...icon} />,
      name: "Logout",
      path: "/logout",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Logout />
        </Suspense>
      ),
    },
  ];

  return [
    {
      layout: "dashboard",
      pages: pages,
    },
  ];
};

export default routes;
