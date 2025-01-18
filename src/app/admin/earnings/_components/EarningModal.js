"use client";

import { Modal } from "antd";
import Image from "next/image";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Tag } from "antd";

export default function EarningModal({ open, setOpen }) {
  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      title="Transaction Details"
    >
      <div className="flex-center-between gap-4 rounded-xl text-white bg-primary-red p-3 px-5">
        <div className="flex-center-start gap-x-2">
          <Image
            src={userImage}
            alt="user image"
            height={2400}
            width={2400}
            className="w-14 h-auto rounded-full aspect-square"
          />

          <h4 className="font-semibold text-lg">Justina Ojuyluv</h4>
        </div>

        <p className="text-xl font-semibold">$86.03</p>
      </div>

      <section className="text-lg font-medium space-y-5 px-4 my-4">
        <div className="flex-center-between">
          <span>Status :</span>
          <Tag color="green" className="!m-0 !text-sm">
            Successful
          </Tag>
        </div>

        <div className="flex-center-between">
          <span>Plan :</span>
          <Tag className="!m-0 !text-sm" color="blue">
            Monthly
          </Tag>
        </div>

        <div className="flex-center-between">
          <span>Transaction ID :</span>
          <span>#0000008f</span>
        </div>
        <div className="flex-center-between">
          <span>Transaction type :</span>
          <span>Credit Card</span>
        </div>
        <div className="flex-center-between">
          <span>A/C number :</span>
          <span>*** **** **** *545</span>
        </div>
        <div className="flex-center-between">
          <span>Date :</span>
          <span>11 Oct, 2024</span>
        </div>
      </section>
    </Modal>
  );
}
