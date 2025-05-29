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
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "@/redux/userSlice";
import Profile from "./userDetails";
import { formatDate } from "@/utilService";

export function UserList() {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, totalUsers, loading, error } = useSelector((state) => state.users);
  const { role } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const usersPerPage = 10;

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: currentPage,
        search: searchTerm,
        role: filterRole,
        limit: 10,
      })
    );
  }, [dispatch, currentPage, debouncedSearchTerm, filterRole]);

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteUserId) {
      dispatch(deleteUser(deleteUserId)).then(() => {
        dispatch(
          fetchUsers({
            page: currentPage,
            search: searchTerm,
            role: filterRole,
            limit: 10,
          })
        );
        setDeleteDialogOpen(false);
        setDeleteUserId(null);
      });
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
                <Option value="user">Client</Option>
                <Option value="host">Healthbuddy</Option>
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
                      const className = `py-3 px-5 ${key === users.length - 1
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
                              value={role === "user" ? "Client" : "Health buddy"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {formatDate(createdAt)}
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
                                onClick={() => handleDeleteClick(_id)}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} handler={() => setDeleteDialogOpen(false)} size="sm">
        <DialogHeader className="bg-gray-100 text-center">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Confirm Deletion
          </Typography>
        </DialogHeader>
        <DialogBody className="bg-white flex flex-col items-center gap-4 p-6">
          <div className="flex items-center justify-center p-4 rounded-full bg-red-100">
            <TrashIcon className="h-12 w-12 text-red-500" />
          </div>
          <Typography className="text-center text-base font-medium text-blue-gray-600">
            Are you sure you want to delete this user? This action cannot be undone.
          </Typography>
        </DialogBody>
        <DialogFooter className="bg-gray-50 flex justify-center gap-4">
          <Button
            color="blue-gray"
            variant="outlined"
            className="w-24"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="red"
            variant="gradient"
            className="w-24"
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>

    </div>
  );
}

export default UserList;
