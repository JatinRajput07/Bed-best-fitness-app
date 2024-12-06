import { HomeIcon, UserIcon, VideoCameraIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import { Home, Profile, Notifications, UserList } from "@/pages/dashboard";
import { Logout } from "@/pages/auth";
import Videos from "./pages/dashboard/videos";
import PrivacyPolicy from "./pages/dashboard/PrivacyPolicy";
import VideoUpload from "./pages/dashboard/VideoUpload";
import TermsAndConditions from "./pages/dashboard/TermsAndConditions";
import AssignUsersToHost from "./pages/dashboard/AssignUsersToHost";
import AdminAssignments from "./pages/dashboard/asignuser/list";
import EditAssignment from "./pages/dashboard/asignuser/update";
import CreateOrUpdateUser from "./pages/dashboard/user/CreateOrUpdateUser";
import MealAndNutrition from "./pages/dashboard/MealAndNutrition";
import Community_guidelines from "./pages/dashboard/Community_guidelines";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Users",
        dropdown: [
          {
            name: "Users List",
            path: "/users",
            element: <UserList />,
          },
          {
            name: "Create & Update",
            path: "/createupdate",
            element: <CreateOrUpdateUser />,
          },
        ]
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Assign UsersTo Host",
        path: "/asignusers",
        dropdown: [
          {
            name: "Create",
            path: "/asignusers",
            element: <AssignUsersToHost />,
          },
          {
            name: "List",
            path: "/asignusers-list",
            element: <AdminAssignments />,
          },
          // {
          //   name: "Edit",
          //   path: "/edit-asignusers",
          //   element: <EditAssignment />,
          // },
        ],
        // element: <AssignUsersToHost />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Meal And Nutrition",
        path: "/meal_nutrition",
        element: <MealAndNutrition />,
      },
      {
        icon: <VideoCameraIcon {...icon} />,
        name: "Videos",
        dropdown: [
          {
            name: "Video List",
            path: "/videos",
            element: <Videos />,
          },
          {
            name: "Upload Video",
            path: "/video-upload",
            element: <VideoUpload />,
          },
        ],
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "CMS",
        dropdown: [
          {
            name: "Privacy Policy",
            path: "/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            name: "Terms & Conditions",
            path: "/terms-and-conditions",
            element: <TermsAndConditions />,
          },
          {
            name: "Community Guidelines",
            path: "/community_guidelines",
            element: <Community_guidelines />,
          },
        ],
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Logout",
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
];

export default routes;
