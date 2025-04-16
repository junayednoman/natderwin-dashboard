"use client";
import FormWrapper from "../../../../components/Form/FormWrapper";
import UTextArea from "../../../../components/Form/UTextArea";
import { Modal } from "antd";

export default function RejectModal({ open, setOpen, handleReject, id }) {
  const handleFormSubmit = (data) => {
    handleReject(id, data.reason);
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
        <FormWrapper onSubmit={handleFormSubmit}>
          <UTextArea
            maxLength={200}
            name={"reason"}
            label={"Reason"}
            placeholder={"Enter reason"}
          />
          <button className="text-sm bg-primary-red text-white rounded-lg py-3 px-5 w-full mt-7">
            Submit
          </button>
        </FormWrapper>
      </div>
    </Modal>
  );
}
