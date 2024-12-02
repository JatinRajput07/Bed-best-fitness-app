import { HomeIcon, UserIcon, VideoCameraIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import { Home, Profile, Notifications, UserList } from "@/pages/dashboard";
import { Logout } from "@/pages/auth";
import Videos from "./pages/dashboard/videos";
import PrivacyPolicy from "./pages/dashboard/PrivacyPolicy";
import VideoUpload from "./pages/dashboard/VideoUpload";
import TermsAndConditions from "./pages/dashboard/TermsAndConditions";
import AssignUsersToHost from "./pages/dashboard/AssignUsersToHost";

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
        path: "/users",
        element: <UserList />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Assign UsersTo Host",
        path: "/asignusers",
        element: <AssignUsersToHost />,
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
