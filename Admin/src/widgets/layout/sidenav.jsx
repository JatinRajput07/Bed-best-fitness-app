import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useSelector } from "react-redux";

export function Sidenav({ brandImg, brandName, routes }) {
  const { role } = useSelector((state) => state.auth);
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const [openDropdown, setOpenDropdown] = useState(null); // For dropdown state
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };


  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 overflow-y-auto`}
    >
      <style>
        {`
      aside {
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
}

aside::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}
    `}
      </style>
      <div className="relative">
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            <img className="m-auto" width={"200px"} src="/free-logo.png" alt="" />
            <span>{role === "host" ? "Coach" : "Admin"}</span>
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white " />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, dropdown }, pageIndex) => (
              <li key={pageIndex}>
                {dropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(name)}
                      className="flex font-medium gap-4 hover:bg-blue-gray-500/10 hover:shadow-none items-center px-4 py-3 rounded-lg select-none shadow-none text-dark text-center transition-all w-full"
                     
                    >
                      {icon}
                      <span className="">{name}</span>
                    </button>
                    {openDropdown === name && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {dropdown.map((subPage, subIndex) => (
                          <li key={subIndex}>
                            <NavLink to={`/${layout}${subPage.path}`}>
                              {({ isActive }) => (
                                <Button
                                  variant={isActive ? "gradient" : "text"}
                                  color={isActive ? sidenavColor : "dark"}
                                  className="flex items-center px-4 capitalize"
                                  fullWidth
                                >
                                  <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                  >
                                    {subPage.name}
                                  </Typography>
                                </Button>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={isActive ? sidenavColor : "dark"}
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                        onClick={() => handleDropdownToggle(name)}
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/free-logo.png",
  brandName: "FITNESS-APP",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
