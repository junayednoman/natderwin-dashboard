"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button, Modal } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema } from "@/schema/subscriptionSchema";
import USelect from "@/components/Form/USelect";

export default function EditPointPlanModal({ open, setOpen }) {
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
      title="Edit Point Plan"
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
          <div className="!pt-3">
            <USelect
              name={"status"}
              label="Status"
              defaultValue={"Select"}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="text-sm bg-white text-primary-red border border-primary-red rounded-lg py-3 px-5 w-full mt-7 font-semibold hover:bg-primary-red hover:text-white duration-200">
              Delete
            </button>
            <button className="text-sm bg-primary-red border border-primary-red text-white rounded-lg py-3 px-5 w-full mt-7 font-semibold">
              Save
            </button>
          </div>
        </div>
      </FormWrapper>
    </Modal>
  );
}
