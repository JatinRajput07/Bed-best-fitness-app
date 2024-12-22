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
import ReactApexChart from "react-apexcharts"; // Import react-apexcharts

export function Home() {
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
        categories: [], // Empty initially, will be updated with API data
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

  useEffect(() => {
    // Fetching dashboard data
    const fetchData = async () => {
      try {
        const response = await fetch("http://43.204.2.84:7200/admin/dashboard");
        const data = await response.json();
        if (data.status === "success") {
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
              footer: {},
            },
          ];
          setStatisticsCardsData(apiData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    // Fetch goal analytics data
    const fetchGoalData = async () => {
      try {
        const response = await fetch("http://43.204.2.84:7200/admin/getGoalAnalytics");
        const data = await response.json();
        if (data.status === "success") {
          const { categories, series } = data.data;
          setGoalData({ categories, series });
        }
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };

    // Fetch user & coach statistics data for the bar chart
    const fetchUserAndCoachStats = async () => {
      try {
        const response = await fetch("http://43.204.2.84:7200/admin/getuserAndCoachStats");
        const data = await response.json();
        if (data.status === "success") {
          const { categories, series } = data.data;

          setBarChartData({
            series: series,
            options: {
              ...barChartData.options,
              xaxis: {
                categories: categories, // Set categories dynamically from API
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
        categories: goalData.categories.length > 0 ? goalData.categories : ["2024-12-04", "2024-12-05", "2024-12-06"], // Default categories
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
