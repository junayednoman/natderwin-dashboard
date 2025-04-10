"use client";

import { Modal } from "antd";
import Image from "next/image";
import userImage from "../../../../assets/images/user-avatar-lg.png";

export default function CashoutRequestModal({
  open,
  setOpen,
  setShowRejectModal,
}) {
  const handleShowRejectModal = () => {
    setShowRejectModal(true);
    setOpen(false);
  };
  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      title="Points Details Details"
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
          <span>Points Purchase : </span>
          <span>343</span>
        </div>

        <div className="flex-center-between">
          <span>Points Spent : </span>
          <span>34</span>
        </div>

        <div className="flex-center-between">
          <span>Remaining Points : </span>
          <span>3482</span>
        </div>
        <div className="flex-center-between">
          <span>Cashout Request : </span>
          <span>$34</span>
        </div>
        <div className="flex-center-between">
          <span>Status : </span>
          <span>Pending</span>
        </div>
      </section>
      <div className="flex items-center gap-3 mt-6">
        <button className="text-sm bg-[#1A8588] text-white rounded-lg py-3 px-5 w-full">
          Approve
        </button>
        <button
          onClick={handleShowRejectModal}
          className="text-sm bg-primary-red text-white rounded-lg py-3 px-5 w-full"
        >
          Reject
        </button>
      </div>
    </Modal>
  );
}
