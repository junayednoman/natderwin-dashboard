"use client";

import { Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Search } from "lucide-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Filter } from "lucide-react";
import Image from "next/image";
import CustomConfirm from "../../../../components/CustomConfirm/CustomConfirm";
import { Tag } from "antd";
import CreateCategoryModal from "./CreateCategoryModal";
import { CirclePlus } from "lucide-react";
import EditCategoryModal from "./EditCategoryModal";
import { Trash2 } from "lucide-react";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../../redux/api/categoryApi";
import { format } from "date-fns";
import { debounce } from "lodash";
import handleMutation from "../../../../utils/handleMutation";

export default function CategoryDetails() {
  const [searchText, setSearchText] = useState("");
  const [userId, setUserId] = useState(null);
  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();

  const { data, isFetching } = useGetAllCategoriesQuery({
    searchTerm: searchText,
  });
  const categories = data?.data;
  console.log("categories, ", categories);
  // Block user handler
  const handleDeleteCategory = (id) => {
    handleMutation(id, deleteCategory, "Deleting category...");
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleShowModal = (id) => {
    setUserId(id);
    setEditCategoryModalOpen(true);
    setOpen(false);
  };

  const handleSetSearchText = (text) => {
    setSearchText(text);
  };

  const debouncedSearch = debounce(handleSetSearchText, 500);

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (_, record, index) => `#${index + 1}`,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.image}
            alt="Category image"
            width={1200}
            height={1200}
            className="rounded-full w-10 h-auto aspect-square"
          />
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) => <p>{format(new Date(value), "dd MMM yyyy")}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "Inactive",
          value: "inactive",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex justify-start items-start"
        />
      ),
      onFilter: (value, record) => {
        // Log the value and record status for debugging
        console.log("Filtering by:", value); // The filter value ('active' or 'inactive')
        console.log("Record status:", record.status); // The status in the current record

        // Check if the status contains the filter value in a case-insensitive manner
        return record.status?.toLowerCase()?.includes(value.toLowerCase());
      },
      render: (value) => <Tag className="!text-sm">{value}</Tag>,
    },
    {
      title: "Action",
      render: ({ _id }) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => handleShowModal(_id)}>
              <Eye size={23} />
            </button>
          </Tooltip>

          <Tooltip title="Delete Category">
            <CustomConfirm
              title="Delete Category"
              description="Are you sure to delete this category?"
              onConfirm={() => handleDeleteCategory(_id)}
            >
              <Trash2 className="cursor-pointer" size={20} color="#F16365" />
            </CustomConfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      <div className="mb-6">
        <div>
          <button
            onClick={handleModalOpen}
            className="bg-primary-red w-full rounded-lg py-3 font-semibold text-lg text-white mb-6 flex items-center gap-2 justify-center"
          >
            <CirclePlus size={30} />
            <span>Create Category</span>
          </button>
          <CreateCategoryModal open={open} setOpen={setOpen} />
        </div>
        <div className="bg-[#FE5858] p-4 py-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="capitalize text-3xl font-semibold text-white">
              Category List
            </h1>
            <div className="w-1/4 ml-auto gap-x-5 mb-3">
              <Input
                placeholder="Search categories..."
                prefix={<Search className="mr-2 text-black" size={20} />}
                className="h-11 !border !rounded-lg !text-base"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>
          </div>

          <Table
            loading={isFetching}
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={categories}
            scroll={{ x: "100%" }}
          ></Table>
        </div>
      </div>
      <EditCategoryModal
        id={userId}
        open={editCategoryModalOpen}
        setOpen={setEditCategoryModalOpen}
      />
    </ConfigProvider>
  );
}
