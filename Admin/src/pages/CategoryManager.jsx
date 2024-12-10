import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, Input, Typography, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null); // For editing categories or subcategories

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories and subcategories
  const fetchCategories = () => {
    axios
      .get("http://43.204.2.84:7200/admin/categories")
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

  // Add a new category
  const handleAddCategory = () => {
    if (!categoryName) {
      toast.error("Category name is required.");
      return;
    }
    axios
      .post("http://43.204.2.84:7200/admin/categories", { name: categoryName })
      .then((response) => {
        if (response.data.status === "success") {
          toast.success("Category added successfully.");
          fetchCategories();
          resetDialog();
        } else {
          toast.error("Failed to add category.");
        }
      })
      .catch(() => {
        toast.error("Error adding category.");
      });
  };

  // Add a new subcategory
  const handleAddSubCategory = () => {
    if (!subCategoryName || !selectedCategoryId) {
      toast.error("Subcategory name and parent category are required.");
      return;
    }
    axios
      .post("http://43.204.2.84:7200/admin/subcategories", {
        name: subCategoryName,
        categoryId: selectedCategoryId,
      })
      .then((response) => {
        if (response.data.status === "success") {
          toast.success("Subcategory added successfully.");
          fetchCategories();
          resetDialog();
        } else {
          toast.error("Failed to add subcategory.");
        }
      })
      .catch(() => {
        toast.error("Error adding subcategory.");
      });
  };

  // Update a category or subcategory
  const handleUpdate = () => {
    if (dialogMode === "edit-category" && !categoryName) {
      toast.error("Category name is required.");
      return;
    }
    if (dialogMode === "edit-subcategory" && (!subCategoryName || !selectedCategoryId)) {
      toast.error("Subcategory name and parent category are required.");
      return;
    }

    const endpoint =
      dialogMode === "edit-category"
        ? `http://43.204.2.84:7200/admin/categories/${editCategoryId}`
        : `http://43.204.2.84:7200/admin/subcategories/${editCategoryId}`;
    const payload =
      dialogMode === "edit-category"
        ? { name: categoryName }
        : { name: subCategoryName, categoryId: selectedCategoryId };

    axios
      .patch(endpoint, payload)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(`${dialogMode === "edit-category" ? "Category" : "Subcategory"} updated successfully.`);
          fetchCategories();
          resetDialog();
        } else {
          toast.error("Failed to update.");
        }
      })
      .catch(() => {
        toast.error("Error updating.");
      });
  };

  // Delete a category or subcategory
  const handleDelete = (id, isCategory = true) => {
    const endpoint = isCategory
      ? `http://43.204.2.84:7200/admin/categories/${id}`
      : `http://43.204.2.84:7200/admin/subcategories/${id}`;

    axios
      .delete(endpoint)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(`${isCategory ? "Category" : "Subcategory"} deleted successfully.`);
          fetchCategories();
        } else {
          toast.error("Failed to delete.");
        }
      })
      .catch(() => {
        toast.error("Error deleting.");
      });
  };

  // Reset dialog inputs
  const resetDialog = () => {
    setOpenDialog(false);
    setCategoryName("");
    setSubCategoryName("");
    setSelectedCategoryId("");
    setDialogMode("add");
    setEditCategoryId(null);
  };

  return (
    <div className="mt-12 mb-8 flex justify-center">

      <Card className="w-full max-w-6xl shadow-lg">
        <CardHeader
          variant="gradient"
          className="bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-t-lg flex justify-between items-center"
        >
          <Typography variant="h5" color="white">
            Category Manager
          </Typography>
          <Button color="lightBlue" onClick={() => setOpenDialog(true)}>
            Add Category/SubCategory
          </Button>
        </CardHeader>
        <CardBody>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">S.No</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">SubCategories</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category,i) => (
                <tr key={category._id} className="border-t">
                     <td className="px-6 py-2 text-sm text-gray-600">{i + 1}</td>
                  <td className="px-6 py-2 text-sm text-gray-600">{category.name}</td>
                  <td className="px-6 py-2 text-sm text-gray-600">
                    {category.subcategories.length > 0
                      ? category.subcategories.map((sub) => sub.name).join(", ")
                      : "No subcategories"}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-600">
                    {/* <Button
                      color="green"
                      onClick={() => {
                        setDialogMode("edit-category");
                        setEditCategoryId(category._id);
                        setCategoryName(category.name);
                        setOpenDialog(true);
                      }}
                    >
                      Edit
                    </Button> */}
                    <Button color="red" onClick={() => handleDelete(category._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Dialog for Adding or Editing Categories/Subcategories */}
      <Dialog open={openDialog} handler={resetDialog}>
        <DialogBody>
          <div className="space-y-4">
            <Input
              label="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              disabled={dialogMode === "edit-subcategory"}
            />
            <Input
              label="SubCategory Name"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              disabled={dialogMode === "edit-category"}
            />
            <select
              className="border rounded p-2 w-full"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              disabled={dialogMode === "edit-category"}
            >
              <option value="">Select Parent Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={resetDialog}>
            Cancel
          </Button>
          <Button
            color="green"
            onClick={dialogMode.startsWith("edit") ? handleUpdate : categoryName ? handleAddCategory : handleAddSubCategory}
          >
            {dialogMode.startsWith("edit") ? "Update" : categoryName ? "Add Category" : "Add SubCategory"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CategoryManager;
