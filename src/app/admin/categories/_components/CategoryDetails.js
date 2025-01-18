"use client";

import { Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Search } from "lucide-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Filter } from "lucide-react";
import Image from "next/image";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { message } from "antd";
import { Tag } from "antd";
import CreateCategoryModal from "./CreateCategoryModal";
import { CirclePlus } from "lucide-react";
import EditCategoryModal from "./EditCategoryModal";
import { Trash2 } from "lucide-react";

// Dummy table Data
const data = Array.from({ length: 15 }).map((_, inx) => ({
  key: inx + 1,
  name: "Kutta",
  userImg: "https://i.postimg.cc/nhkGjrMQ/Bullly-kutta.jpg",
  date: "11 oct 24, 11.10PM",
  status: "Active",
}));

export default function CategoryDetails() {
  const [searchText, setSearchText] = useState("");
  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Block user handler
  const handleBlockUser = () => {
    message.success("User blocked successfully");
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.userImg}
            alt="User avatar"
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
      dataIndex: "date",
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
      onFilter: (value, record) => record.accountType.indexOf(value) === 0,
      render: (value) => <Tag className="!text-sm">{value}</Tag>,
    },
    {
      title: "Action",
      render: () => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => setEditCategoryModalOpen(true)}>
              <Eye size={23} />
            </button>
          </Tooltip>

          <Tooltip title="Delete Category">
            <CustomConfirm
              title="Delete Category"
              description="Are you sure to delete this category?"
              onConfirm={handleBlockUser}
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
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          <Table
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={data}
            scroll={{ x: "100%" }}
          ></Table>
        </div>
      </div>
      <EditCategoryModal
        open={editCategoryModalOpen}
        setOpen={setEditCategoryModalOpen}
      />
    </ConfigProvider>
  );
}
