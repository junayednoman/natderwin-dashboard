"use client";
import "./Sidebar.css";
import logo from "../../../assets/logos/logo.png";
import icon from "../../../assets/logos/icon.svg";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { ScrollText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import dashboardIcon from "../../../assets/images/dashboard.svg";
import categoryIcon from "../../../assets/images/category.svg";
import reportIcon from "../../../assets/images/report.svg";
import usersIcon from "../../../assets/images/users.svg";
import earningIcon from "../../../assets/images/earnings.svg";
import cashoutIcon from "../../../assets/images/cashout.svg";
import subscriptionsIcon from "../../../assets/images/subscriptions.svg";
import pointsIcon from "../../../assets/images/points.svg";
// import subscriptionIcon from "../../../assets/images/subscriptions.svg";
import settingIcon from "../../../assets/images/settings.svg";
import logoutIcon from "../../../assets/images/logout.svg";

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
      icon: <Image src={dashboardIcon} alt="dashboard" />,
      label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
    },
    {
      key: "categories",
      icon: <Image src={categoryIcon} alt="category" />,
      label: <Link href={"/admin/categories"}>Category</Link>,
    },
    {
      key: "reports",
      icon: <Image src={reportIcon} alt="report" />,
      label: <Link href={"/admin/reports"}>Report Content</Link>,
    },
    {
      key: "account-details",
      icon: <Image src={usersIcon} alt="users" />,
      label: <Link href={"/admin/account-details"}>Account Details</Link>,
    },
    {
      key: "earnings",
      icon: <Image src={earningIcon} alt="earnings" />,
      label: <Link href={"/admin/earnings"}>Earnings</Link>,
    },
    {
      key: "cashout-requests",
      icon: <Image src={cashoutIcon} alt="cashout" />,
      label: <Link href={"/admin/cashout-requests"}>Cashout Requests</Link>,
    },
    {
      key: "manage-subscription",
      icon: <Image src={subscriptionsIcon} alt="subscription" />,
      label: (
        <Link href={"/admin/manage-subscription"}>Manage Subscriptions</Link>
      ),
    },
    {
      key: "Manage Points",
      icon: <Image src={pointsIcon} alt="points" />,
      label: <Link href={"/admin/manage-points"}>Manage Points</Link>,
    },
    {
      key: "settings",
      icon: <Image src={settingIcon} alt="settings" />,
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
      icon: <Image src={logoutIcon} alt="logout" />,
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
      className="scroll-hide pb-8"
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
