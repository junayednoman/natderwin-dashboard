"use client";

import FormWrapper from "../../../../components/Form/FormWrapper";
import UInput from "../../../../components/Form/UInput";
import UTextArea from "../../../../components/Form/UTextArea";
import { Button, Modal } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema } from "../../../../schema/subscriptionSchema";
import { useCreateSubscriptionPlanMutation } from "../../../../redux/api/subscriptionPlanApi";
import handleMutation from "../../../../utils/handleMutation";

export default function CreateSubscriptionPlanModal({ open, setOpen }) {
  const [createPlan, { isLoading }] = useCreateSubscriptionPlanMutation();
  const onSubmit = (data) => {
    data.duration = Number(data.duration);
    handleMutation(data, createPlan, "Creating subscription plan...", () => {
      setOpen(false);
    });
  };

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      title="Create Subscription Plan"
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
            name="name"
            label="Subscription Name"
            placeholder="Enter subscription plan name"
          />
          <UInput
            type="number"
            className={"!mb-3"}
            name="duration"
            label="Duration (months)"
            placeholder="Monthly/Yearly/Quarterly or 6 months/12 months"
          />
          <div className="!mb-6">
            <UTextArea
              minRows={5}
              name="description"
              label="Short Description"
              placeholder="Enter description"
            />
          </div>
          <div className="!pt-3">
            <UInput
              type="number"
              name="price"
              label="Price"
              placeholder="Enter price"
            />
          </div>

          <Button
            disabled={isLoading}
            htmlType="submit"
            className="common-btn w-full !mt-5 disabled:opacity-60"
            size="large"
          >
            {isLoading ? "Creating..." : "Create Plan"}
          </Button>
        </div>
      </FormWrapper>
    </Modal>
  );
}
