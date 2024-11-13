
import AdminLayout from "../../components/AdminLayout"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels
        datasets: [
            {
                label: 'Sales Over Time',
                data: [65, 59, 80, 81, 56, 55], // Y-axis data
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)', // Border color
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Monthly Sales Data',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Sales: $${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    return (
        <>
            <AdminLayout title={"Dashboard"}>
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                    {/* Cards Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">Card 1</h2>
                            <p>Content for Card 1</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">Card 2</h2>
                            <p>Content for Card 2</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">Card 3</h2>
                            <p>Content for Card 3</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">Card 4</h2>
                            <p>Content for Card 4</p>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-xl font-semibold mb-4">Sales Chart</h2>
                        <div className="h-96">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-xl font-semibold mb-4">Table</h2>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2 text-left">ID</th>
                                    <th className="border px-4 py-2 text-left">Name</th>
                                    <th className="border px-4 py-2 text-left">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">1</td>
                                    <td className="border px-4 py-2">Item 1</td>
                                    <td className="border px-4 py-2">$10</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">2</td>
                                    <td className="border px-4 py-2">Item 2</td>
                                    <td className="border px-4 py-2">$20</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">3</td>
                                    <td className="border px-4 py-2">Item 3</td>
                                    <td className="border px-4 py-2">$30</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminLayout>
        </>
    )

}


export default Dashboard