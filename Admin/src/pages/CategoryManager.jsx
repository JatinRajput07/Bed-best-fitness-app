import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, Input, Typography, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Axios from "@/configs/Axios";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState(""); // "add-category", "edit-category", "add-subcategory", "edit-subcategory"
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [categoryType, setCategoryType] = useState("");
  const [deleteTarget, setDeleteTarget] = useState({ id: null, isCategory: true });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    Axios
      .get("/admin/categories")
      .then((response) => {
        if (response.data.status === "success") {
          setCategories(response.data.data);
        } else {
          toast.error("Failed to fetch categories.");
        }
      })
      .catch(() => {
        toast.error("Error fetching categories.");
      });
  };

  const handleAddOrUpdate = () => {
    if (dialogMode === "add-category" && (!categoryName || !categoryType)) {
      toast.error("Category name and type are required.");
      return;
    }

    if (dialogMode === "add-subcategory" && (!subCategoryName || !selectedCategoryId)) {
      toast.error("Subcategory name and parent category are required.");
      return;
    }

    const endpoint =
      dialogMode === "add-category"
        ? "/admin/categories"
        : dialogMode === "add-subcategory"
          ? "/admin/subcategories"
          : dialogMode === "edit-category"
            ? `/admin/categories/${editCategoryId}`
            : `/admin/subcategories/${editCategoryId}`;

    const payload =
      dialogMode === "add-category" || dialogMode === "edit-category"
        ? { name: categoryName, type: categoryType }
        : { name: subCategoryName, categoryId: selectedCategoryId };

    const method = dialogMode.startsWith("add") ? "post" : "patch";

    Axios[method](endpoint, payload)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(
            `${dialogMode.startsWith("add")
              ? dialogMode === "add-category"
                ? "Category"
                : "Subcategory"
              : dialogMode === "edit-category"
                ? "Category"
                : "Subcategory"
            } ${dialogMode.startsWith("add") ? "added" : "updated"} successfully.`
          );
          fetchCategories();
          resetDialog();
        } else {
          toast.error("Failed to save changes.");
        }
      })
      .catch(() => {
        toast.error("Error saving changes.");
      });
  };


  const handleDelete = () => {
    const { id, isCategory } = deleteTarget;

    if (!id) return;

    const endpoint = isCategory
      ? `/admin/categories/${id}`
      : `/admin/subcategories/${id}`;

    Axios
      .delete(endpoint)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(`${isCategory ? "Category" : "Subcategory"} deleted successfully.`);
          fetchCategories();
        } else {
          toast.error("Failed to delete.");
        }
        setDeleteDialog(false);
      })
      .catch(() => {
        toast.error("Error deleting.");
        setDeleteDialog(false);
      });
  };

  const openDeleteConfirmation = (id, isCategory = true) => {
    setDeleteTarget({ id, isCategory });
    setDeleteDialog(true);
  };
  const resetDialog = () => {
    setOpenDialog(false);
    setCategoryName("");
    setSubCategoryName("");
    setSelectedCategoryId("");
    setCategoryType(""); // Reset category type
    setDialogMode("");
    setEditCategoryId(null);
  };

  return (
    <div className="mt-12 mb-8 flex justify-center">
      <Card className="w-full max-w-6xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-t-lg flex justify-between items-center">
          <Typography variant="h5" color="white">
            Category Manager
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="flex space-x-4 mb-4">
            {/* Add Category Button */}
            <Button
              color="lightBlue"
              onClick={() => {
                setDialogMode("add-category");
                setOpenDialog(true);
              }}
            >
              Add Category
            </Button>
            {/* Add Subcategory Button */}
            <Button
              color="lightGreen"
              onClick={() => {
                setDialogMode("add-subcategory");
                setOpenDialog(true);
              }}
            >
              Add Subcategory
            </Button>
          </div>

          {/* Category Table */}
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-2">S.No</th>
                <th className="px-6 py-2">Category</th>
                <th className="px-6 py-2">Subcategories</th>
                <th className="px-6 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, i) => (
                <tr key={category._id} className="border-t">
                  <td className="px-6 py-2">{i + 1}</td>
                  <td className="px-6 py-2">{category.name} </td>
                  <td className="px-6 py-2">
                    {category.subcategories.length > 0 ? (
                      <ul>
                        {category.subcategories.map((sub) => (
                          <li key={sub._id} className="flex justify-between">
                            {sub.name}
                            <div className="flex space-x-1 mb-1">
                              <Button
                                size="sm"
                                color="green"
                                className="p-1"
                                onClick={() => {
                                  setDialogMode("edit-subcategory");
                                  setEditCategoryId(sub._id);
                                  setSubCategoryName(sub.name);
                                  setSelectedCategoryId(category._id);
                                  setOpenDialog(true);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                className="p-1"
                                color="red"
                                onClick={() => openDeleteConfirmation(sub._id, false)}
                                // onClick={() => handleDelete(sub._id, false)}
                              >
                                Delete
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No subcategories"
                    )}
                  </td>
                  <td className="px-6 py-2">
                    <Button
                      color="green"
                      className="p-2 mr-1"
                      onClick={() => {
                        setDialogMode("edit-category");
                        setEditCategoryId(category._id);
                        setCategoryName(category.name);
                        setCategoryType(category.type);
                        setOpenDialog(true);
                      }}
                    >
                      Edit
                    </Button>
                    
                    <Button className="p-2" color="red" onClick={() => openDeleteConfirmation(category._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Dialog for Adding/Editing Category/Subcategory */}
      <Dialog open={openDialog} handler={resetDialog}>
        <DialogBody>
          {/* Dialog Heading */}
          <Typography variant="h6" className="mb-4 text-center">
            {dialogMode === "add-category" || dialogMode === "edit-category"
              ? dialogMode === "add-category"
                ? "Add New Category"
                : "Edit Category"
              : dialogMode === "add-subcategory"
                ? "Add New Subcategory"
                : "Edit Subcategory"}
          </Typography>

          {/* Input Fields with Spacing */}
          {dialogMode === "add-category" || dialogMode === "edit-category" ? (
            <>
              <Input
                label="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mb-4" // Added margin for spacing
              />
              <select
                className="border rounded mt-4 p-2 w-full mb-4" // Added margin for spacing
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
              >
                <option value="">Select Category Type</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </>
          ) : (
            <>
              <Input
                label="Subcategory Name"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                className="mb-4" // Added margin for spacing
              />
              <select
                className="border rounded mt-4 p-2 w-full mb-4" // Added margin for spacing
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">Select Parent Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </>
          )}
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button className="" color="red" onClick={resetDialog}>
            Cancel
          </Button>
          <Button color="green" onClick={handleAddOrUpdate}>
            {dialogMode.startsWith("add") ? "Add" : "Update"}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} handler={() => setDeleteDialog(false)}>
        <DialogBody>
          <Typography variant="h6" className="mb-4 text-center">
            Are you sure you want to delete this {deleteTarget.isCategory ? "category" : "subcategory"}?
          </Typography>
        </DialogBody>
        <DialogFooter className="gap-2 justify-center">
          <Button color="red" onClick={() => setDeleteDialog(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CategoryManager;
