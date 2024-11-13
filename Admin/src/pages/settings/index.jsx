import { useState } from "react";
import UpdatePasswordForm from "../../components/UpdatePasswordForm";
import AdminLayout from "../../components/AdminLayout";
import ProfileTab from "../../components/Profile";

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <AdminLayout title={"Settings"}>
            <div className="flex">
                {/* Sidebar (Vertical Tabs) */}
                <div className="w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-6">Settings</h2>
                    <ul className="space-y-4">
                        <li
                            onClick={() => setActiveTab("profile")}
                            className={`cursor-pointer p-2 rounded-lg ${activeTab === "profile" ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50"}`}
                        >
                            Profile
                        </li>
                        <li
                            onClick={() => setActiveTab("updatePassword")}
                            className={`cursor-pointer p-2 rounded-lg ${activeTab === "updatePassword" ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50"}`}
                        >
                            Update Password
                        </li>
                    </ul>
                </div>

                {/* Tab Content */}
                <div className="w-3/4 p-6 ml-6 bg-white rounded-lg shadow-lg">
                    {activeTab === "profile" && <ProfileTab />}
                    {activeTab === "updatePassword" && <UpdatePasswordForm />}
                </div>
            </div>
        </AdminLayout>
    );
};

export default SettingsPage;