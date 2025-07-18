"use client";

import FormWrapper from "../../../../components/Form/FormWrapper";
import UInput from "../../../../components/Form/UInput";
import UTextArea from "../../../../components/Form/UTextArea";
import { Modal } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema } from "../../../../schema/subscriptionSchema";
import {
  useGetSubscriptionPlanQuery,
  useUpdateSubscriptionPlanMutation,
} from "../../../../redux/api/subscriptionPlanApi";
import Spinner from "../../../../components/spinner/Spinner";
import ErrorMessage from "../../../../components/ErrorMessage/ShowError";
import handleMutation from "../../../../utils/handleMutation";

export default function EditSubscriptionPlanModal({ open, setOpen, id }) {
  const [updatePlan, { isLoading: isPlanUpdating }] =
    useUpdateSubscriptionPlanMutation();
  const { data, isLoading, error } = useGetSubscriptionPlanQuery(id, {
    skip: !open || !id,
  });

  const plan = data?.data;
  const planData = {
    name: plan?.name,
    duration: plan?.duration?.toString(),
    price: plan?.price,
    description: plan?.description,
  };
  const onSubmit = (payload) => {
    payload.duration = Number(payload.duration);
    handleMutation(
      { id, payload },
      updatePlan,
      "Updating subscription plan...",
      () => {
        setOpen(false);
      }
    );
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
        <FormWrapper
          onSubmit={onSubmit}
          defaultValues={planData}
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

            <div className="flex items-center gap-4 !mt-12">
              <button
                disabled={isPlanUpdating}
                className="text-sm disabled:opacity-60 bg-primary-red border border-primary-red text-white rounded-lg py-3 px-5 w-full font-semibold"
              >
                {isPlanUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </FormWrapper>
      )}
    </Modal>
  );
}
