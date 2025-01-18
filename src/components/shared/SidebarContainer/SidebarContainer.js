"use client";

import "./Sidebar.css";
import logo from "@/assets/logos/logo.png";
import icon from "@/assets/logos/icon.svg";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { CircleDollarSign } from "lucide-react";
import { Shapes } from "lucide-react";
import { ScrollText } from "lucide-react";
import { LogOut } from "lucide-react";
import { SlidersVertical } from "lucide-react";
import { Podcast } from "lucide-react";
import { House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChartBarStacked } from "lucide-react";
import { MessageSquareWarning } from "lucide-react";
import { Users } from "lucide-react";
import { Star } from "lucide-react";
import { Receipt } from "lucide-react";

const SidebarContainer = ({ collapsed }) => {
  // const dispatch = useDispatch();
  const router = useRouter();

  // Logout handler
  const onClick = (e) => {
    // if (e.key === "logout") {
    //   dispatch(logout());
    //   router.refresh();
    //   router.push("/login");

    //   Success_model({ title: "Logout successful" });
    // }

    console.log("logout success");
  };

  const navLinks = [
    {
      key: "dashboard",
      icon: <House size={21} strokeWidth={2} />,
      label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
    },
    {
      key: "categories",
      icon: <ChartBarStacked size={21} strokeWidth={2} />,
      label: <Link href={"/admin/categories"}>Category</Link>,
    },
    {
      key: "reports",
      icon: <MessageSquareWarning size={21} strokeWidth={2} />,
      label: <Link href={"/admin/reports"}>Report Content</Link>,
    },
    {
      key: "account-details",
      icon: <Users size={21} strokeWidth={2} />,
      label: <Link href={"/admin/account-details"}>Account Details</Link>,
    },
    {
      key: "earnings",
      icon: <CircleDollarSign size={21} strokeWidth={2} />,
      label: <Link href={"/admin/earnings"}>Earnings</Link>,
    },
    {
      key: "cashout-requests",
      icon: <Receipt size={21} strokeWidth={2} />,
      label: <Link href={"/admin/cashout-requests"}>Cashout Requests</Link>,
    },
    {
      key: "manage-subscription",
      icon: <Podcast size={21} strokeWidth={2} />,
      label: (
        <Link href={"/admin/manage-subscription"}>Manage Subscriptions</Link>
      ),
    },
    {
      key: "Manage Points",
      icon: <Star size={21} strokeWidth={2} />,
      label: <Link href={"/admin/manage-points"}>Manage Points</Link>,
    },
    {
      key: "settings",
      icon: <SlidersVertical size={21} strokeWidth={2} />,
      label: "Settings",
      children: [
        {
          key: "privacy-policy",
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/privacy-policy">Privacy Policy</Link>,
        },
        {
          key: "terms-conditions",
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/terms-conditions">Terms & Conditions</Link>,
        },
      ],
    },
    {
      key: "logout",
      icon: <LogOut size={21} strokeWidth={2} />,
      label: <Link href="/login">Logout</Link>,
    },
  ];

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()?.replace("/admin/", "")?.split(" ")[0];

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        paddingInline: `${!collapsed ? "10px" : "4px"}`,
        paddingBlock: "30px",
        backgroundColor: "white",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      className="scroll-hide"
    >
      <div className="mb-6 flex flex-col justify-center items-center gap-y-5">
        <Link href={"/"}>
          {collapsed ? (
            // Logo small
            <Image
              src={icon}
              alt="Logo Of Before After Story"
              className="h-14 w-auto"
            />
          ) : (
            <Image
              src={logo}
              alt="Logo Of Before After Story"
              className="h-32 w-auto"
            />
          )}
        </Link>
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu !bg-transparent space-y-2.5 !border-none"
        items={navLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
