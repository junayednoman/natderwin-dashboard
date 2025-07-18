"use client";

import FormWrapper from "../../../../components/Form/FormWrapper";
import UInput from "../../../../components/Form/UInput";
import { Button, Modal } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { starPlanSchema } from "../../../../schema/starPlanSchema";
import { useCreateStarPlanMutation } from "../../../../redux/api/starPlanApi";
import handleMutation from "../../../../utils/handleMutation";

export default function CreatePointModal({ open, setOpen }) {
  const [createPlan, { isLoading }] = useCreateStarPlanMutation();
  const onSubmit = (data) => {
    data.price = Number(data.price);
    data.stars = Number(data.stars);
    data.discount_rate = Number(data.discount_rate);
    handleMutation(data, createPlan, "Creating point plan...", () => {
      setOpen(false);
    });
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
      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(starPlanSchema)}>
        <div>
          <UInput
            className={"!mb-3"}
            name="stars"
            label="Star points"
            placeholder="Enter number of stars"
          />
          <div className="!pt-3">
            <UInput name="price" label="Price" placeholder="Enter price" />
          </div>
          <div className="!pt-3">
            <UInput
              name="discount_rate"
              label="Discount Rate (%)"
              placeholder="Enter discount rate"
            />
          </div>

          <Button
            disabled={isLoading}
            htmlType="submit"
            className="common-btn disabled:opacity-60 w-full !mt-5"
            size="large"
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </FormWrapper>
    </Modal>
  );
}
