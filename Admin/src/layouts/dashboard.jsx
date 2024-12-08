import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { routes } from "@/routes";  // Ensure this is imported correctly

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const routeConfig = routes(); // Call the function to get the routes array

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav 
        routes={routeConfig} 
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routeConfig.map(({ layout, pages }) =>
            layout === "dashboard" &&
            pages.map(({ path, element, dropdown }) =>
              dropdown ? (
                dropdown.map(({ path: subPath, element: subElement }) => (
                  <Route key={subPath} path={subPath} element={subElement} />
                ))
              ) : (
                <Route key={path} path={path} element={element} />
              )
            )
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
