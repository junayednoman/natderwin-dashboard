"use client";

import { Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Eye } from "lucide-react";
import { Filter } from "lucide-react";
import Image from "next/image";
import { Tag } from "antd";
import { DatePicker } from "antd";
import Link from "next/link";

// Dummy table Data
const data = Array.from({ length: 15 }).map((_, inx) => ({
  key: inx + 1,
  name: "Justina",
  userImg: userImage,
  date: "11 oct 24, 11.10PM",
  status: "Pending",
  post_link: "https://gemini.google.com/app",
  reason: "Abuse",
}));

export default function ReportContentDetails() {
  const handleMonthChange = () => {
    console.log("month changed");
  };
  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "Reported By",
      dataIndex: "reporter",
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
      title: "User Reporting",
      dataIndex: "date",
    },
    {
      title: "Post Link",
      dataIndex: "post_link",
    },
    {
      title: "Reason for Report",
      dataIndex: "reason",
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
          text: "Pending",
          value: "pending",
        },
        {
          text: "Blocked",
          value: "blocked",
        },
        {
          text: "Resolved",
          value: "resolved",
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
            <Link href={`reports/id`}>
              <Eye color="#1B70A6" size={22} />
            </Link>
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
        <div className="bg-[#FE5858] p-4 pt-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="capitalize text-3xl font-semibold text-white">
              Reporting List
            </h1>

            <div className="w-[200px] month-picker">
              <DatePicker
                placeholder="This Month"
                className="w-full h-[44px] text-black !border-black !border"
                onChange={handleMonthChange}
                picker="month"
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
    </ConfigProvider>
  );
}
