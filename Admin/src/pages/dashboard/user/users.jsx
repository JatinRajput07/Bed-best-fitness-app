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
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "@/redux/userSlice";
import Profile from "./userDetails";

export function UserList() {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, loading, error } = useSelector((state) => state.users);

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
            {loading ? (
              <Typography variant="h6" color="blue-gray">
                Loading users...
              </Typography>
            ) : error ? (
              <Typography variant="h6" color="red">
                {error}
              </Typography>
            ) : users.length > 0 ? (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["User", "Role", "Status", "Joined", "Actions"].map((el , i) => (
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
                  {users.map(({ id, img, name, email, role, active, createdAt, ...otherDetails },key) => {
                      const className=`py-3 px-5 ${key === users.length - 1 ? "" : "border-b border-blue-gray-50"}`;
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
                                    id,
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
                                onClick={() => handleDelete(id)}
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
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default UserList;
