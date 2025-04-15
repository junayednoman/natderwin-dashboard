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
import {
  useGetEarningsQuery,
  useGetEarningStatsQuery,
} from "../../../../redux/api/summaryApi";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { useMemo } from "react";

export default function EarningsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [selectedEarning, setSelectedEarning] = useState(null);
  const handleMonthChange = (value) => {
    setSelectedDate(value);
  };

  // Calculate startDate and endDate based on the selected date
  const [selectedDate, setSelectedDate] = useState("");
  const { startDate, endDate } = useMemo(() => {
    const date = new Date(selectedDate);
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    return { startDate, endDate };
  }, [selectedDate]);

  const { data: statsData } = useGetEarningStatsQuery();
  const stats = statsData?.data;

  // fetch data
  const limit = 10;
  const params = {
    limit,
    page: currentPage,
  };

  if (selectedDate) {
    params.startDate = startDate;
    params.endDate = endDate;
  }

  const { data, isLoading } = useGetEarningsQuery(params);
  const earnings = data?.data?.data;
  const total = data?.data?.meta?.total;

  const handleSelectEarning = (id) => {
    setSelectedEarning(id);
    setShowEarningModal(true);
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (_, record, index) => `#${index + 1}`,
    },
    {
      title: "User",
      dataIndex: "user",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.user.image}
            alt="User avatar"
            width={1200}
            height={1200}
            className="rounded-full w-10 h-auto aspect-square"
          />
          <p className="font-medium">{value.name}</p>
        </div>
      ),
    },
    {
      title: "Payment Purpose",
      dataIndex: "purpose",
      filters: [
        {
          text: "Subscription payment",
          value: "subscription",
        },
        {
          text: "Star payment",
          value: "star",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex justify-start items-start"
        />
      ),
      onFilter: (value, record) => record?.purpose?.indexOf(value) === 0,
    },
    {
      title: "Purchase Date",
      dataIndex: "createdAt",
      render: (value) => (
        <p className="font-medium">{format(value, "dd MMM yyyy")}</p>
      ),
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
      render: ({ _id }) => (
        <Tooltip title="Show Details">
          <button onClick={() => handleSelectEarning(_id)}>
            <Eye color="#1B70A6" size={22} />
          </button>
        </Tooltip>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
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
      <div className="bg-[#FE5858] p-4 py-6 rounded-lg mb-6">
        {/* User Stats Section */}
        <section className="grid grid-cols-2 gap-5">
          <div className="flex-center-start gap-x-4 bg-light-red p-6 rounded-lg">
            <div className="bg-primary-blue flex-center rounded-full p-4">
              <CircleDollarSign size={33} className="text-white" />
            </div>
            <div>
              <p className="font-dmSans text-xl text-primary-black">
                Total Earnings
              </p>
              <h5 className="text-3xl font-semibold text-primary-black mt-0.5">
                <CustomCountUp end={stats?.earnings?.toFixed(2) || 0} />
              </h5>
            </div>
          </div>
          <div className="flex-center-start gap-x-4 bg-light-red p-6 rounded-lg">
            <div className="bg-primary-blue flex-center rounded-full p-4">
              <Repeat size={33} className="text-white" />
            </div>
            <div>
              <p className="font-dmSans text-xl text-primary-black">
                Subscriptions Purchased
              </p>
              <h5 className="text-3xl font-semibold text-primary-black mt-0.5">
                <CustomCountUp end={stats?.subscriptions || 0} />
              </h5>
            </div>
          </div>
        </section>

        <div className="mt-10">
          {/* Earning stats */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="capitalize text-3xl font-semibold text-white">
              Earning Data
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
              onChange={onChange}
              loading={isLoading}
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={earnings}
              scroll={{ x: "100%" }}
              pagination={{ pageSize: limit, total }}
            ></Table>
          </section>

          {/* Show earning modal */}
          <EarningModal
            id={selectedEarning}
            open={showEarningModal}
            setOpen={setShowEarningModal}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
