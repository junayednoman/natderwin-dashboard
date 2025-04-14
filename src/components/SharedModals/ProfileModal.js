"use client";

import { Modal } from "antd";
import userImage from "../../assets/images/user-avatar-lg.png";
import Image from "next/image";
import { Tag } from "antd";
import { useGetSingleUserQuery } from "../../redux/api/userApi";
import Spinner from "../spinner/Spinner";

export default function ProfileModal({ open, setOpen, id }) {
  const { data, isLoading } = useGetSingleUserQuery(id, { skip: !open || !id });
  const user = data?.data;
  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
    >
      {isLoading ? (
        <Spinner className="py-44" />
      ) : (
        <>
          <div className="flex flex-col items-center gap-4 rounded-lg bg-primary-blue py-4">
            <Image
              src={user?.image || userImage}
              alt="user image"
              height={2400}
              width={2400}
              className="w-[30%] h-auto rounded-full aspect-square"
            />
            <h4 className="text-3xl font-bold text-white">{user?.name}</h4>
          </div>

          <div className=" grid grid-cols-1 gap-7 px-12 py-8 md:grid-cols-2 ">
            <div className="text-black">
              <h5 className=" font-bold">Name</h5>
              <p className="font-dmSans text-base">{user?.name}</p>
            </div>
            <div className="text-black">
              <h5 className=" font-bold">Email</h5>
              <p className="font-dmSans text-base">{user?.email}</p>
            </div>
            <div className="text-black">
              <h5 className=" font-bold">Contact</h5>
              <p className="font-dmSans text-base">{user?.phone}</p>
            </div>
            <div className="text-black">
              <h5 className=" font-bold">Account Type</h5>
              <p className="font-dmSans">
                <Tag color="cyan" className="!text-sm !mt-1 !font-semibold">
                  {user?.type}
                </Tag>
              </p>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
