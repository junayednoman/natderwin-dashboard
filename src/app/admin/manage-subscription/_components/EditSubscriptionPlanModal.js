"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UTextArea from "@/components/Form/UTextArea";
import { Modal } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema } from "@/schema/subscriptionSchema";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";

export default function EditSubscriptionPlanModal({ open, setOpen }) {
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleDeletePackage = () => {
    message.success("deleted");
  };

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      title="Edit Subscription Plan"
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
            label="Name"
            placeholder="Enter subscription plan name"
          />
          <UInput
            className={"!mb-3"}
            name="duration"
            label="Duration"
            placeholder="Monthly/Yearly/Quarterly or 6 months/12 months"
          />
          <div className="!mb-6">
            <UTextArea
              minRows={5}
              name="description"
              label="Description"
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

          <div className="flex items-center gap-4 !mt-12">
            <CustomConfirm
              title="Delete plan"
              description="Are you sure to delete this plan?"
              onConfirm={handleDeletePackage}
            >
              <button className="text-sm bg-white text-primary-red border border-primary-red rounded-lg py-3 px-5 w-full font-semibold hover:bg-primary-red hover:text-white duration-200">
                Delete
              </button>
            </CustomConfirm>

            <button className="text-sm bg-primary-red border border-primary-red text-white rounded-lg py-3 px-5 w-full font-semibold">
              Save
            </button>
          </div>
        </div>
      </FormWrapper>
    </Modal>
  );
}
