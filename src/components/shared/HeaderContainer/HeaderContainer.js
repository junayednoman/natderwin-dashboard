"use client";
import { Button } from "antd";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout } from "antd";
import { AlignJustify } from "lucide-react";
import { useGetProfileQuery } from "../../../redux/api/profileApi";
import { selectUser } from "../../../redux/features/authSlice";
import { useAppSelector } from "../../../redux/hooks/hooks";
const { Header } = Layout;

export default function HeaderContainer({ collapsed, setCollapsed }) {
  const user = useAppSelector(selectUser);
  const { data } = useGetProfileQuery("", { skip: !user });
  const admin = data?.data;

  const pathname = usePathname();
  const navbarTitle = pathname.split("/admin")[1].split("/")[1];
  return (
    <Header
      style={{
        backgroundColor: "white",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 0,
        paddingRight: "40px",
      }}
    >
      {/* Collapse Icon */}
      <div className="flex items-center gap-x-2">
        <Button
          type="text"
          icon={<AlignJustify strokeWidth={3} size={25} />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <h1 className="capitalize text-3xl font-semibold font-dmSans">
          {navbarTitle.length > 1
            ? navbarTitle.replaceAll("/", " ").replaceAll("-", " ")
            : "dashboard"}
        </h1>
      </div>

      {/* Right --- notification, user profile */}
      <div className="flex items-center gap-x-6">
        {/* <button>
          <Search color="#1C1B1F" size={22} strokeWidth={2.5} />
        </button> */}

        <Link href="/admin/notification" className="!leading-none relative">
          {/* Notification dot indicator */}
          <div className="bg-[#FE5858] absolute -top-1.5 -right-1 size-3 rounded-full" />

          <Bell fill="#1C1B1F" stroke="#1C1B1F" size={22} />
        </Link>

        {/* User */}
        <Link
          href={"/admin/profile"}
          className="flex items-center gap-x-2 text-black hover:text-primary-blue group"
        >
          <Image
            src={admin?.image}
            alt="Admin avatar"
            width={52}
            height={52}
            className="rounded-full border-2 p-0.5 border-primary-red group-hover:border"
          />

          <h4 className="text-lg font-semibold">{admin?.name}</h4>
        </Link>
      </div>
    </Header>
  );
}
