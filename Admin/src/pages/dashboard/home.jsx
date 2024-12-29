import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import {
  UsersIcon,
  UserPlusIcon,
  ArchiveBoxIcon,
  FilmIcon,
} from "@heroicons/react/24/solid";
import ReactApexChart from "react-apexcharts";
import Axios from "@/configs/Axios";
import { useSelector } from "react-redux";

export function Home() {
  const { role } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [statisticsCardsData, setStatisticsCardsData] = useState([]);
  const [goalData, setGoalData] = useState({
    categories: [],
    series: [],
  });

  const [barChartData, setBarChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: "Count",
        },
      },
      fill: {
        opacity: 1,
      },
    },
  });

  const shimmerCard = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="h-24 w-full bg-gray-300 animate-pulse rounded-md"
      ></div>
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/admin/dashboard");
        const data = await response.data;
        if (data.status === "success") {
          const apiData = [
            {
              color: "gray",
              icon: UsersIcon,
              title: "Users",
              value: role === "host" ? data.data.assignedUserCount : data.data.users,
              footer: {
                color: "text-green-500",
              },
            },
            ...(role === "admin"
              ? [
                {
                  color: "gray",
                  icon: UserPlusIcon,
                  title: "Coaches",
                  value: data.data.coach,
                  footer: {
                    color: "text-green-500",
                  },
                },
              ]
              : []),
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
              footer: {},
            },
          ];
          setStatisticsCardsData(apiData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
      finally {
        setLoading(false);
      }
    };

    const fetchGoalData = async () => {
      try {
        const response = await Axios.get("/admin/getGoalAnalytics");
        const data = await response.data;
        if (data.status === "success") {
          const { categories, series } = data.data;
          setGoalData({ categories, series });
        }
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };

    const fetchUserAndCoachStats = async () => {
      try {
        const response = await Axios.get("/admin/getuserAndCoachStats");
        const data = await response.data;
        if (data.status === "success") {
          const { categories, series } = data.data;

          setBarChartData({
            series: series,
            options: {
              ...barChartData.options,
              xaxis: {
                categories: categories,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user and coach stats:", error);
      }
    };

    fetchData();
    fetchGoalData();
    fetchUserAndCoachStats();
  }, []);

  const lineChartData = {
    series: [
      {
        name: "Achieve Goal",
        data: goalData.series.length > 0 ? goalData.series[0].data : [75, 50, 60], // Default static data
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      stroke: {
        width: 4,
        curve: "smooth",
      },
      title: {
        text: "Goal Achievement Progress",
        align: "left",
      },
      xaxis: {
        categories: goalData.categories.length > 0 ? goalData.categories : ["2024-12-04", "2024-12-05", "2024-12-06"],
      },
      yaxis: {
        title: {
          text: "Percentage (%)",
        },
      },
    },
  };

  return (
    <div className="mt-12">
      <div
        className={`mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-${role === "host" ? 3 : 4
          }`}
      >
        {loading
          ? shimmerCard(role === "host" ? 3 : 4)
          : statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
            <StatisticsCard
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
            />
          ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-0">
        {/* Bar Chart for User & Coach */}
        <div className="col-span-1">
          <Card>
            <CardHeader color="blue" className="p-4">
              <Typography variant="h6" color="white">
                User & Coach Statistics
              </Typography>
            </CardHeader>
            <CardBody>
              <ReactApexChart
                options={barChartData.options}
                series={barChartData.series}
                type="bar"
                height={350}
              />
            </CardBody>
          </Card>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader color="blue" className="p-4">
              <Typography variant="h6" color="white">
                Goal Achievement
              </Typography>
            </CardHeader>
            <CardBody>
              <ReactApexChart
                options={lineChartData.options}
                series={lineChartData.series}
                type="line"
                height={350}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
