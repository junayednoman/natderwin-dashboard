"use client";
import { useUpdateCashoutRequestMutation } from "../../../../redux/api/cashoutApi";
import FormWrapper from "../../../../components/Form/FormWrapper";
import UTextArea from "../../../../components/Form/UTextArea";
import { Modal } from "antd";
import handleMutation from "../../../../utils/handleMutation";

export default function RejectModal({ open, setOpen, id }) {
  const [updateRequest, { isLoading }] = useUpdateCashoutRequestMutation();
  // handle reject
  const handleReject = (data) => {
    const payload = {
      status: "rejected",
      rejection_reason: data.reason,
    };
    handleMutation(
      { id, payload },
      updateRequest,
      "Rejecting request...",
      () => {
        setOpen(false);
      }
    );
  };

  return (
    <Modal
      className="small-modal"
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      title="Rejection Reason"
    >
      <div className="flex items-center gap-3 mt-6 reject-modal">
        <FormWrapper onSubmit={handleReject}>
          <UTextArea
            maxLength={200}
            name={"reason"}
            label={"Reason"}
            placeholder={"Enter reason"}
          />
          <button
            disabled={isLoading}
            className="text-sm bg-primary-red disabled:opacity-60 text-white rounded-lg py-3 px-5 w-full mt-7"
          >
            {isLoading ? "Rejecting..." : "Reject"}
          </button>
        </FormWrapper>
      </div>
    </Modal>
  );
}
