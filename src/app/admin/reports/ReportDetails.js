"use client";

import { Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import userImage from "../../../assets/images/user-avatar-lg.png";
import { Eye } from "lucide-react";
import { Filter } from "lucide-react";
import Image from "next/image";
import { Tag } from "antd";
import { DatePicker } from "antd";
import Link from "next/link";
import { useGetAllReportsQuery } from "../../../redux/api/reportApi";
import { format } from "date-fns";
import { useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const params = {
    fields: "",
    page: currentPage,
    limit,
  };
  const { data, isLoading } = useGetAllReportsQuery(params);
  const reports = data?.data?.data;
  const total = data?.data?.meta?.total;
  console.log("reports", reports, total);

  const handleMonthChange = () => {
    console.log("month changed");
  };
  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (_, record, index) => `#${index + 1}`,
    },
    {
      title: "Reported By",
      dataIndex: "reporter.name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.reporter.image}
            alt="User avatar"
            width={1200}
            height={1200}
            className="rounded-full w-10 h-auto aspect-square"
          />
          <p className="font-medium">{record.reporter.name}</p>
        </div>
      ),
    },
    {
      title: "User Reporting",
      dataIndex: "post",
      render: (value) => <p>{value.author.name}</p>,
    },
    {
      title: "Reason for Report",
      dataIndex: "reason",
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
          text: "Pending",
          value: "pending",
        },
        {
          text: "Resolved",
          value: "resolved",
        },
        {
          text: "Post removed",
          value: "post_removed",
        },
        {
          text: "User blocked",
          value: "user_blocked",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex justify-start items-start"
        />
      ),
      onFilter: (value, record) => record?.status?.indexOf(value) === 0,
      render: (value) => <Tag className="!text-sm capitalize">{value}</Tag>,
    },
    {
      title: "Action",
      render: ({ _id }) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <Link href={`reports/${_id}`}>
              <Eye color="#1B70A6" size={22} />
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ];

  const onTableChange = (pagination, filters, sorter) => {
    console.log("pagination", pagination);
    console.log("filters", filters);
    console.log("sorter", sorter);
    setCurrentPage(pagination?.current);
  };
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
            onChange={onTableChange}
            loading={isLoading}
            style={{ overflowX: "auto" }}
            columns={columns}
            pagination={{
              pageSize: limit,
              total: total,
            }}
            dataSource={reports}
            scroll={{ x: "100%" }}
          ></Table>
        </div>
      </div>
    </ConfigProvider>
  );
}
