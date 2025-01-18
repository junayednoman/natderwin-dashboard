"use client";

import { ConfigProvider } from "antd";
import { Table } from "antd";
import { UserX } from "lucide-react";
import { Eye } from "lucide-react";
import { Filter } from "lucide-react";
import Image from "next/image";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Tooltip } from "antd";
import { Tag } from "antd";
import { useState } from "react";
import ProfileModal from "@/components/SharedModals/ProfileModal";

// Dummy Data
const data = Array.from({ length: 5 }).map((_, inx) => ({
  key: inx + 1,
  name: "Justina",
  userImg: userImage,
  email: "justina@gmail.com",
  contact: "+1234567890",
  date: "11 oct 24, 11:10 PM",
  type: "Subscriber",
}));

const RecentUserTable = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  // =============== Table columns ===============
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
            <button onClick={() => setShowProfileModal(true)}>
              <Eye color="#010101" size={22} />
            </button>
          </Tooltip>

          <Tooltip title="Block User">
            <button>
              <UserX color="#F16365" size={22} />
            </button>
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
      <h4 className="text-2xl font-semibold text-primary-white mt-6">
        Recently Joined Users
      </h4>

      <div className="my-2">
        <Table
          className="rounded-lg dashboard-table"
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%" }}
        ></Table>
      </div>

      {/* Profile Modal */}
      <ProfileModal open={showProfileModal} setOpen={setShowProfileModal} />
    </ConfigProvider>
  );
};

export default RecentUserTable;
