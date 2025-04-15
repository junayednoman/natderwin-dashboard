"use client";

import { Modal } from "antd";
import Image from "next/image";
import userImage from "../../../../assets/images/user-avatar-lg.png";
import { useGetSingleEarningQuery } from "../../../../redux/api/summaryApi";
import { format } from "date-fns";
import Spinner from "../../../../components/spinner/Spinner";
import ErrorMessage from "../../../../components/ErrorMessage/ShowError";

export default function EarningModal({ open, setOpen, id }) {
  const { data, isLoading, error } = useGetSingleEarningQuery(id, {
    skip: !open || !id,
  });
  const earning = data?.data;
  console.log("earning", earning);
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
      {isLoading ? (
        <Spinner className="py-20" />
      ) : error ? (
        <ErrorMessage
          black
          className="text-center py-20"
          showBtn
          message={error?.data?.message}
        />
      ) : (
        <>
          <div className="flex-center-between gap-4 rounded-xl text-white bg-primary-red p-3 px-5">
            <div className="flex-center-start gap-x-2">
              <Image
                src={earning?.user?.image || userImage}
                alt="user image"
                height={2400}
                width={2400}
                className="w-14 h-auto rounded-full aspect-square"
              />

              <h4 className="text-lg">{earning?.user?.name}</h4>
            </div>

            <p className="text-xl">${earning?.amount}</p>
          </div>

          <section className="text-lg font-medium space-y-5 px-4 my-4">
            <div className="flex-center-between">
              <span>Payment purpose :</span>
              <span className="capitalize">{earning?.purpose}</span>
            </div>
            <div className="flex-center-between">
              <span>Transaction Id :</span>
              <span>{earning?.transaction_id}</span>
            </div>
            <div className="flex-center-between">
              <span>Payment Date :</span>
              <span>
                {earning?.createdAt &&
                  format(new Date(earning?.createdAt), "dd MMMM yyyy")}
              </span>
            </div>
          </section>
        </>
      )}
    </Modal>
  );
}
