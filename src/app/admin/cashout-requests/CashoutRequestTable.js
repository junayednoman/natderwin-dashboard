"use client";

import { ConfigProvider, Table } from "antd";
import Image from "next/image";
import { useState } from "react";
import CashoutRequestModal from "./_components/CashoutRequestDetailsModal";
import { Input } from "antd";
import { Search } from "lucide-react";
import RejectModal from "./_components/RejectModal";
import {
  useGetAllCashoutRequestsQuery,
  useUpdateCashoutRequestMutation,
} from "../../../redux/api/cashoutApi";
import { format } from "date-fns";
import { debounce } from "lodash";
import handleMutation from "../../../utils/handleMutation";
import { ToastContainer } from "react-toastify";

export default function CashoutRequestTable() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateRequest] = useUpdateCashoutRequestMutation();

  // handle show details
  const handleShowDetails = (id) => {
    setSelectedUser(id);
    setShowDetailsModal(true);
  };

  // handle search
  const handleSearchText = (value) => {
    setSearchText(value);
  };

  // handle approve
  const handleApprove = (id) => {
    const payload = {
      status: "approved",
    };
    handleMutation({ id, payload }, updateRequest, "Approving request...");
  };

  const handleShowRejectModal = (id) => {
    setSelectedUser(id);
    setShowRejectModal(true);
  };

  const debouncedHandleSearchText = debounce(handleSearchText, 500);

  // fetch data
  const params = {
    searchTerm: searchText,
    limit: 100000000000,
  };
  const { data, isLoading } = useGetAllCashoutRequestsQuery(params);
  const requests = data?.data?.data;
  console.log("data", requests);

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
            src={value?.image}
            alt="User avatar"
            width={1200}
            height={1200}
            className="rounded-full w-10 h-auto aspect-square"
          />
          <p className="font-medium">{value?.name}</p>
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
      render: ({ _id }) => (
        <button
          onClick={() => handleShowDetails(_id)}
          className="!text-base font-semibold border border-[#A57758] text-[#A57758] rounded-lg p-1 px-2"
        >
          View Details
        </button>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) => <p>{format(new Date(value), "dd MMM yyyy")}</p>,
    },
    {
      title: "Action",
      render: ({ _id }, record) => (
        <div className="flex items-center gap-2">
          {record?.status !== "approved" && (
            <button
              onClick={() => handleApprove(_id)}
              className="text-sm bg-[#1A8588] text-white rounded-lg py-1 px-5"
            >
              Approve
            </button>
          )}
          {record?.status !== "rejected" && (
            <button
              onClick={() => handleShowRejectModal(_id)}
              className="text-sm bg-primary-red text-white rounded-lg py-1 px-5"
            >
              Reject
            </button>
          )}
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
                onChange={(e) => debouncedHandleSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* Earning table */}
          <section>
            <Table
              loading={isLoading}
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={requests}
              scroll={{ x: "100%" }}
              pagination={{ pageSize: 15 }}
            ></Table>
          </section>

          {/* Show earning modal */}
          <CashoutRequestModal
            id={selectedUser}
            setShowRejectModal={setShowRejectModal}
            open={showDetailsModal}
            setOpen={setShowDetailsModal}
          />
          {/* Show rejection modal */}
          <RejectModal
            id={selectedUser}
            open={showRejectModal}
            setOpen={setShowRejectModal}
          />
        </div>
        <ToastContainer />
      </div>
    </ConfigProvider>
  );
}
