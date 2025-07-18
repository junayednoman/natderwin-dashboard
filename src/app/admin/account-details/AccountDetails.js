"use client";

import { Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Search } from "lucide-react";
import userImage from "../../../assets/images/user-avatar-lg.png";
import { Eye } from "lucide-react";
import { Filter } from "lucide-react";
import Image from "next/image";
import { Tag } from "antd";
import { UserX } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import CustomConfirm from "../../../components/CustomConfirm/CustomConfirm";
import { useGetAllUsersQuery } from "../../../redux/api/userApi";

export default function AccountDetails() {
  const [searchText, setSearchText] = useState("");
  console.log("searchText", searchText);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const params = {
    limit,
    page: currentPage,
  };

  const { data: userData } = useGetAllUsersQuery(params);
  const users = userData?.data?.data;
  const total = userData?.data?.meta?.total;

  const onPopConfirm = () => {
    console.log("user blocked");
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (_, record, index) => `#${index + 1}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.image}
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full aspect-square"
          />
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Account Type",
      dataIndex: "type",

      filters: [
        {
          text: "Subscriber",
          value: "subscriber",
        },
        {
          text: "Unsubscriber",
          value: "unsubscriber",
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
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      render: () => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <Link href={"/admin/account-details/id"}>
              <Eye color="#010101" size={22} />
            </Link>
          </Tooltip>

          <Tooltip title="Block User">
            <CustomConfirm
              title={"Block User"}
              description={"Are you sure you want block this user?"}
              onConfirm={onPopConfirm}
            >
              <UserX className="cursor-pointer" color="#F16365" size={22} />
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
        <div></div>
        <div className="bg-[#FE5858] p-4 py-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="capitalize text-3xl font-semibold text-white">
              Account Details
            </h1>

            <div className="w-[350px] month-picker">
              <Input
                placeholder="Search users..."
                prefix={<Search className="mr-2 text-black" size={20} />}
                className="h-11 !border !rounded-lg !text-base"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          <Table
            pagination={{ pageSize: limit, total: total }}
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={users}
            scroll={{ x: "100%" }}
          ></Table>
        </div>
      </div>
    </ConfigProvider>
  );
}
