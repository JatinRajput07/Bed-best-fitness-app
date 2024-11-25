import { HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import { Home, Profile, Notifications ,UserList } from "@/pages/dashboard";
import { Logout, SignIn, SignUp } from "@/pages/auth";
import Videos from "./pages/dashboard/videos";
import PrivacyPolicy from "./pages/dashboard/PrivacyPolicy";
import VideoUpload from "./pages/dashboard/VideoUpload";
import TermsAndConditions from "./pages/dashboard/TermsAndConditions";

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
        icon: <HomeIcon {...icon} />,
        name: "Videos",
        path: "/videos",
        element: <Videos />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Upload",
        path: "/video-upload",
        element: <VideoUpload />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Users",
        path: "/users",
        element: <UserList />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Privacy Policy",
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "TermsAndConditions",
        path: "/termsAndConditions",
        element: <TermsAndConditions />,
      },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "Settings",
      //   path: "/setting",
      //   element: <Home />,
      // },
      {
        icon: <HomeIcon {...icon} />,
        name: "Logout",
        path: "/logout", // This will use the Logout component
        element: <Logout />, // Render the Logout component when accessing /logout
      },
    ],
  },
];

export default routes;
