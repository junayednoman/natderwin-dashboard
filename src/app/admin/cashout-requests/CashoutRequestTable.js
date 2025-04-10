"use client";

import { ConfigProvider, Table } from "antd";
import userImage from "../../../assets/images/user-avatar-lg.png";
import Image from "next/image";
import { useState } from "react";
import CashoutRequestModal from "./_components/CashoutRequestDetailsModal";
import { Input } from "antd";
import { Search } from "lucide-react";
import RejectModal from "./_components/RejectModal";

// Dummy table data
const data = Array.from({ length: 15 }).map((_, inx) => ({
  key: inx + 1,
  name: "Justina",
  userImg: userImage,
  status: "pending",
  date: "11 oct 24, 11.10PM",
  subscriptionType: "Monthly",
  amount: 22,
}));

export default function CashoutRequestTable() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [searchText, setSearchText] = useState("");

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
      title: "Requested Amount",
      dataIndex: "amount",
      render: (value) => <span>${value}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <p
          className={`${
            value === "pending"
              ? "text-[#AF830E]"
              : value === "approved"
              ? "text-[#1A8588]"
              : "text-primary-red"
          } capitalize`}
        >
          {value}
        </p>
      ),
    },
    {
      title: "History",
      render: () => (
        <button
          onClick={() => setShowDetailsModal(true)}
          className="!text-base font-semibold border border-[#A57758] text-[#A57758] rounded-lg p-1 px-2"
        >
          View Details
        </button>
      ),
    },

    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      render: () => (
        <div className="flex items-center gap-2">
          <button className="text-sm bg-[#1A8588] text-white rounded-lg py-1 px-5">
            Approve
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            className="text-sm bg-primary-red text-white rounded-lg py-1 px-5"
          >
            Reject
          </button>
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
      <div className="bg-[#FE5858] p-4 py-6 rounded-lg mb-6">
        <div>
          {/* Earning stats */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="capitalize text-3xl font-semibold text-white">
              Cashout Requests
            </h1>
            <div className="w-1/4 ml-auto gap-x-5 mb-3">
              <Input
                placeholder="Search requests..."
                prefix={<Search className="mr-2 text-black" size={20} />}
                className="h-11 !border !rounded-lg !text-base"
                onChange={(e) => setSearchText(e.target.value)}
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
          <CashoutRequestModal
          setShowRejectModal={setShowRejectModal}
            open={showDetailsModal}
            setOpen={setShowDetailsModal}
          />
          {/* Show rejection modal */}
          <RejectModal open={showRejectModal} setOpen={setShowRejectModal} />
        </div>
      </div>
    </ConfigProvider>
  );
}
