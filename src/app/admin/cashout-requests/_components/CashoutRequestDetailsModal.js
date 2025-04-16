"use client";

import { Modal } from "antd";
import Image from "next/image";
import userImage from "../../../../assets/images/user-avatar-lg.png";
import { useGetSingleCashoutRequestQuery } from "../../../../redux/api/cashoutApi";
import Spinner from "../../../../components/spinner/Spinner";
import ErrorMessage from "../../../../components/ErrorMessage/ShowError";

export default function CashoutRequestModal({
  open,
  setOpen,
  setShowRejectModal,
  id,
}) {
  const { data, isLoading, error } = useGetSingleCashoutRequestQuery(id, {
    skip: !open || !id,
  });
  const cashout = data?.data;

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
      {isLoading ? (
        <Spinner className="py-44" />
      ) : error ? (
        <ErrorMessage
          black
          className="text-center py-44"
          showBtn
          message={error?.data?.message}
        />
      ) : (
        <>
          <div className="flex-center-between gap-4 rounded-xl text-white bg-primary-red p-3 px-5">
            <div className="flex-center-start gap-x-2">
              <Image
                src={cashout?.user?.image || userImage}
                alt="user image"
                height={2400}
                width={2400}
                className="w-14 h-auto rounded-full aspect-square"
              />

              <h4 className="font-semibold text-lg">{cashout?.user?.name}</h4>
            </div>

            <p className="text-xl font-semibold">${cashout?.amount}</p>
          </div>

          <section className="text-lg font-medium space-y-5 px-4 my-4">
            <div className="flex-center-between">
              <span>Points Purchase : </span>
              <span>{cashout?.user?.points_purchase}</span>
            </div>

            <div className="flex-center-between">
              <span>Points Spent : </span>
              <span>{cashout?.user?.points_spent}</span>
            </div>

            <div className="flex-center-between">
              <span>Remaining Points : </span>
              <span>{cashout?.user?.star_balance || 0}</span>
            </div>
            <div className="flex-center-between">
              <span>Cashout Request : </span>
              <span>{cashout?.stars}</span>
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
        </>
      )}
    </Modal>
  );
}
