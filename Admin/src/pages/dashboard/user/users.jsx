import React, { useEffect, useState } from "react";
import { UserCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "@/redux/userSlice";
import Profile from "./userDetails";

export function UserList() {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, totalUsers, loading, error } = useSelector((state) => state.users);

  const { role } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const usersPerPage = 10;

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: currentPage,
        search: searchTerm,
        role: filterRole,
      })
    );
  }, [dispatch, currentPage, debouncedSearchTerm, filterRole]);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleFilterRole = (role) => {
    setFilterRole(role);
    setCurrentPage(1);
  };

  const renderShimmerEffect = () => (
    <table className="w-full min-w-[640px] table-auto">
      <thead>
        <tr>
          {["Sr.No.", "User", "Phone", "Role", "Joined", "Actions"].map((el, i) => (
            <th
              key={i + 1}
              className="border-b border-blue-gray-50 py-3 px-5 text-left"
            >
              <div className="h-4 bg-gray-300 rounded-md animate-pulse"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            {Array.from({ length: 6 }).map((_, cellIndex) => (
              <td
                key={cellIndex}
                className="py-3 px-5 border-b border-blue-gray-50"
              >
                <div className="h-4 bg-gray-300 rounded-md animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {selectedUser ? (
        <Profile id={selectedUser?._id} closeModal={closeModal} />
      ) : (
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              User List
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="flex px-5 justify-end items-center gap-4 mb-4">
              <Input
                placeholder="Search by name or email"
                onChange={handleSearch}
                className=""
              />
              <Select
                label="Filter by Role"
                onChange={(value) => handleFilterRole(value)}
                className=""
              >
                <Option value="">All</Option>
                <Option value="user">User</Option>
                <Option value="host">Host</Option>
              </Select>
            </div>

            {/* User Table */}
            {loading ? (
              renderShimmerEffect()
            ) : error ? (
              <Typography variant="h6" color="red">
                {error}
              </Typography>
            ) : users.length > 0 ? (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Sr.No.", "User", "Phone", "Role", "Joined", "Actions"].map(
                      (el, i) => (
                        <th
                          key={i + 1}
                          className="border-b border-blue-gray-50 py-3 px-5 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {users.map(
                    (
                      { _id, img, name, email, role, phone, createdAt },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === users.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      return (
                        <tr key={_id}>
                          <td className={className}>{key + 1}</td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {img ? (
                                <Avatar
                                  src={img}
                                  alt={name}
                                  size="sm"
                                  variant="rounded"
                                />
                              ) : (
                                <UserCircleIcon className="h-10 w-10 text-blue-gray-300" />
                              )}
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {name}
                                </Typography>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {email}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {phone}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={role === "user" ? "cyan" : "indigo"}
                              value={role === "user" ? "User" : "Host"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {createdAt.split("T")[0]}
                            </Typography>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="text"
                                size="sm"
                                onClick={() =>
                                  handleViewDetails({
                                    _id,
                                    name,
                                    email,
                                    role,
                                    createdAt,
                                  })
                                }
                              >
                                View Details
                              </Button>
                              <TrashIcon
                                className="h-5 w-5 text-red-500 cursor-pointer"
                                onClick={() => handleDelete(_id)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            ) : (
              <Typography variant="h6" color="blue-gray">
                No users found.
              </Typography>
            )}

            {/* Pagination */}
            <div className="mt-4 flex justify-center gap-4">
              {Array.from(
                { length: Math.ceil(totalUsers / usersPerPage) },
                (_, index) => (
                  <Button
                    key={index + 1}
                    variant="text"
                    size="sm"
                    onClick={() => setCurrentPage(index + 1)}
                    color={currentPage === index + 1 ? "blue" : "gray"}
                  >
                    {index + 1}
                  </Button>
                )
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default UserList;
