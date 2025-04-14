"use client";

import { ConfigProvider } from "antd";
import { Table } from "antd";
import { ListFilter, UserCheck, UserX } from "lucide-react";
import { Eye } from "lucide-react";
import Image from "next/image";
import userImage from "../../../../assets/images/user-avatar-lg.png";
import { Tooltip } from "antd";
import { Tag } from "antd";
import { useState } from "react";
import ProfileModal from "../../../../components/SharedModals/ProfileModal";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
} from "../../../../redux/api/userApi";
import { format } from "date-fns";
import handleMutation from "../../../../utils/handleMutation";

const RecentUserTable = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [blockUser] = useBlockUserMutation();

  const params = {
    fields: "name email image type is_blocked createdAt",
    limit,
    page: currentPage,
  };

  const { data, isLoading } = useGetAllUsersQuery(params);
  const users = data?.data?.data;
  const total = data?.data?.meta?.total;

  const handleShowProfileModal = (id) => {
    setSelectedUser(id);
    setShowProfileModal(true);
  };

  const handleBLockUser = (id) => {
    handleMutation(id, blockUser, "Blocking user...");
  };

  // =============== Table columns ===============
  const columns = [
    {
      title: "Serial",
      render: (_, record, index) => `#${index + 1}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.image || userImage} // Fallback image
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
        <ListFilter
          size={18}
          color="#fff"
          className="flex justify-start items-start"
        />
      ),
      onFilter: (value, record) => {
        // Ensure comparison is case-insensitive
        return record?.type?.toLowerCase() === value.toLowerCase() || false;
      },
      render: (value) => <Tag className="!text-sm capitalize">{value}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) => <p>{format(new Date(value), "dd MMM yyyy")}</p>,
    },
    {
      title: "Action",
      render: ({ _id, is_blocked }) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => handleShowProfileModal(_id)}>
              <Eye color="#010101" size={22} />
            </button>
          </Tooltip>

          <Tooltip
            onClick={() => handleBLockUser(_id)}
            title={`${is_blocked ? "Unblock" : "Block"} User`}
          >
            <button>
              {is_blocked ? (
                <UserCheck className="text-green-500" size={22} />
              ) : (
                <UserX color="#F16365" size={22} />
              )}
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setCurrentPage(pagination.current);
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
      <h4 className="text-2xl font-semibold text-primary-white mt-6">
        Recently Joined Users
      </h4>

      <Table
        onChange={onChange}
        loading={isLoading}
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: limit, total }}
        className="mt-4"
      />

      {/* Profile Modal */}
      <ProfileModal
        id={selectedUser}
        open={showProfileModal}
        setOpen={setShowProfileModal}
      />
    </ConfigProvider>
  );
};

export default RecentUserTable;
