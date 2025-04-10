"use client";

import { ConfigProvider, Table } from "antd";
import userImage from "../../../../assets/images/user-avatar-lg.png";
import Image from "next/image";
import { Filter } from "lucide-react";
import { Tooltip } from "antd";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Tag } from "antd";
import EarningModal from "./EarningModal";
import { DatePicker } from "antd";
import CustomCountUp from "../../../../components/CustomCountUp/CustomCountUp";
import { Repeat } from "lucide-react";
import { CircleDollarSign } from "lucide-react";

// Dummy Data
const earningStats = [
  {
    key: "earnings",
    title: "Total Earnings",
    icon: <CircleDollarSign className="text-white" size={33} />,
    count: 5180,
  },
  {
    key: "subscriptions",
    title: "Subscriptions Purchased",
    icon: <Repeat className="text-white" size={33} />,
    count: 118,
  },
];

// Dummy table data
const data = Array.from({ length: 15 }).map((_, inx) => ({
  key: inx + 1,
  name: "Justina",
  userImg: userImage,
  email: "justina@gmail.com",
  contact: "+1234567890",
  date: "11 oct 24, 11.10PM",
  subscriptionType: "Monthly",
  amount: 22,
}));

export default function EarningsTable() {
  const [showEarningModal, setShowEarningModal] = useState(false);
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
      title: "Name",
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
      title: "Subscription Type",
      dataIndex: "subscriptionType",

      filters: [
        {
          text: "Monthly",
          value: "monthly",
        },
        {
          text: "Quarterly",
          value: "quarterly",
        },
        {
          text: "Yearly",
          value: "yearly",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex justify-start items-start"
        />
      ),
      onFilter: (value, record) => record.subscriptionType.indexOf(value) === 0,
    },
    {
      title: "Purchase Date",
      dataIndex: "date",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => (
        <Tag className="!text-base font-semibold">${value}</Tag>
      ),
    },
    {
      title: "Action",
      render: () => (
        <Tooltip title="Show Details">
          <button onClick={() => setShowEarningModal(true)}>
            <Eye color="#1B70A6" size={22} />
          </button>
        </Tooltip>
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
      <div className="bg-[#FE5858] p-4 py-6 rounded-lg mb-6">
        {/* User Stats Section */}
        <section className="grid grid-cols-2 gap-5">
          {earningStats?.map((stat) => (
            <div
              key={stat.key}
              className="flex-center-start gap-x-4 bg-light-red p-6 rounded-lg"
            >
              <div className="bg-primary-blue flex-center rounded-full p-4">
                {stat.icon}
              </div>

              <div>
                <p className="font-dmSans text-xl text-primary-black">
                  {stat.title}
                </p>
                <h5 className="text-3xl font-semibold text-primary-black mt-0.5">
                  {stat.key !== "earning" ? (
                    <CustomCountUp end={stat.count} />
                  ) : (
                    <span>
                      $<CustomCountUp end={stat.count} />
                    </span>
                  )}
                </h5>
              </div>
            </div>
          ))}
        </section>

        <div className="mt-10">
          {/* Earning stats */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="capitalize text-3xl font-semibold text-white">
              Subscription Data
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

          {/* Earning table */}
          <section>
            <Table
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={data}
              scroll={{ x: "100%" }}
              pagination
            ></Table>
          </section>

          {/* Show earning modal */}
          <EarningModal open={showEarningModal} setOpen={setShowEarningModal} />
        </div>
      </div>
    </ConfigProvider>
  );
}
