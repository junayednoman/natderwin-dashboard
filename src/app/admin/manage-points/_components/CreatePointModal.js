"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button, Modal } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema } from "@/schema/subscriptionSchema";

export default function CreatePointModal({ open, setOpen }) {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      className="small-modal"
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      title="Create Point Plan"
      onCancel={() => {
        setOpen(false);
      }}
    >
      <FormWrapper
        onSubmit={onSubmit}
        resolver={zodResolver(createSubscriptionSchema)}
      >
        <div>
          <UInput
            className={"!mb-3"}
            name="points"
            label="Points"
            placeholder="Enter number of points"
          />
          <div className="!pt-3">
            <UInput
              type="number"
              name="price"
              label="Price"
              placeholder="Enter price"
            />
          </div>
          <div className="!pt-3">
            <UInput
              type="number"
              name="discount_rate"
              label="Discount Rate (%)"
              placeholder="Enter discount rate"
            />
          </div>

          <Button
            htmlType="submit"
            className="common-btn w-full !mt-5"
            size="large"
          >
            Submit
          </Button>
        </div>
      </FormWrapper>
    </Modal>
  );
}
