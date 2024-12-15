import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import {
  CheckCircleIcon,
  ClockIcon,
  BanknotesIcon,
  UsersIcon,
  UserPlusIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
  FilmIcon,
} from "@heroicons/react/24/solid";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsChartsData } from "@/data";

export function Home() {
  const [statisticsCardsData, setStatisticsCardsData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch("http://43.204.2.84:7200/admin/dashboard");
        const data = await response.json();
        if (data.status === "success") {
          // Transform API data to match the required structure
          const apiData = [
            {
              color: "gray",
              icon: UsersIcon,
              title: "Users",
              value: data.data.users,
              footer: {
                color: "text-green-500",
             
              },
            },
            {
              color: "gray",
              icon: UserPlusIcon,
              title: "Coaches",
              value: data.data.coach,
              footer: {
                color: "text-green-500",
              
              },
            },
            {
              color: "gray",
              icon: ArchiveBoxIcon,
              title: "Meal & Nutrition",
              value: data.data.meal + data.data.nutrition,
              footer: {
                color: "text-green-500",
              
              },
            },
            {
              color: "gray",
              icon: FilmIcon,
              title: "Videos",
              value: data.data.videos,
              footer: {
                
              },
            },
          ];
          setStatisticsCardsData(apiData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
