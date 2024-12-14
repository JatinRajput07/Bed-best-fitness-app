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
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "@/redux/userSlice";
import Profile from "./userDetails";

export function UserList() {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, loading, error } = useSelector((state) => state.users);
  const { role } = useSelector((state) => state.auth);

  // Pagination and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7; // Adjust as needed

  useEffect(() => {
    dispatch(fetchUsers({}));
  }, [dispatch]);

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

  // Filter users based on role and search term
  const filteredUsers = role === "host"
    ? users.filter((user) => user.role === "user")
    : users;

  const searchFilteredUsers = filteredUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = searchFilteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {selectedUser ? (
        <Profile id={selectedUser?._id} closeModal={closeModal} />
      ) : (
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              {role === "host" ? "users List" : "User List"}
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {/* <Input  
              variant="standard"
              label="Search Users"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-4"
            /> */}
            {loading ? (
              <Typography variant="h6" color="blue-gray">
                Loading users...
              </Typography>
            ) : error ? (
              <Typography variant="h6" color="red">
                {error}
              </Typography>
            ) : searchFilteredUsers.length > 0 ? (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["User", "Role", "Status", "Joined", "Actions"].map((el, i) => (
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
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map(
                    ({ _id, img, name, email, role, active, createdAt, ...otherDetails }, key) => {
                      const className = `py-3 px-5 ${key === currentUsers.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                      return (
                        <tr key={key + 1}>
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
                            <Chip
                              variant="gradient"
                              color={role === "user" ? "cyan" : "indigo"}
                              value={role === "user" ? "User" : "Host"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={!active ? "green" : "blue-gray"}
                              value={!active ? "online" : "offline"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {createdAt}
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
                                    active,
                                    createdAt,
                                    ...otherDetails,
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
                No {role === "host" ? "hosts" : "users"} found.
              </Typography>
            )}

            {/* Pagination */}
            <div className="mt-4 flex justify-center gap-4">
              {Array.from({ length: Math.ceil(searchFilteredUsers.length / usersPerPage) }, (_, index) => (
                <Button
                  key={index + 1}
                  variant="text"
                  size="sm"
                  onClick={() => paginate(index + 1)}
                  color={currentPage === index + 1 ? "blue" : "gray"}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default UserList;
