"use client";

import FormWrapper from "../../../../components/Form/FormWrapper";
import UInput from "../../../../components/Form/UInput";
import { Modal } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import USelect from "../../../../components/Form/USelect";
import {
  useDeleteStarPlanMutation,
  useGetSingleStarPlanQuery,
  useUpdateStarPlanMutation,
} from "../../../../redux/api/starPlanApi";
import { starPlanSchema } from "../../../../schema/starPlanSchema";
import Spinner from "../../../../components/spinner/Spinner";
import ErrorMessage from "../../../../components/ErrorMessage/ShowError";
import handleMutation from "../../../../utils/handleMutation";
import CustomConfirm from "../../../../components/CustomConfirm/CustomConfirm";

export default function EditPointPlanModal({ open, setOpen, id }) {
  const [updatePlan, { isLoading: isPlanUpdating }] =
    useUpdateStarPlanMutation();
  const [deletePlan, { isLoading: isPlanDeleting }] =
    useDeleteStarPlanMutation();
  const { data, isLoading, error } = useGetSingleStarPlanQuery(id, {
    skip: !open || !id,
  });
  const plan = data?.data;

  const planData = {
    stars: plan?.stars?.toString(),
    price: plan?.price?.toString(),
    discount_rate: plan?.discount_rate?.toString(),
    status: plan?.status,
  };

  // update point plan
  const onSubmit = (payload) => {
    payload.stars = Number(payload.stars);
    payload.price = Number(payload.price);
    payload.discount_rate = Number(payload.discount_rate);
    handleMutation(
      { id, payload },
      updatePlan,
      "Updating point plan...",
      () => {
        setOpen(false);
      }
    );
  };

  // delete plan
  const handleDeletePlan = () => {
    handleMutation(id, deletePlan, "Deleting point plan...", () => {
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
      title="Edit Point Plan"
      onCancel={() => {
        setOpen(false);
      }}
    >
      {isLoading ? (
        <Spinner className="py-36" />
      ) : error ? (
        <ErrorMessage
          black
          className="text-center py-36"
          showBtn
          message={error?.data?.message}
        />
      ) : (
        <>
          <FormWrapper
            onSubmit={onSubmit}
            defaultValues={planData}
            resolver={zodResolver(starPlanSchema)}
          >
            <div>
              <UInput
                className={"!mb-3"}
                name="stars"
                label="Star points"
                placeholder="Enter number of points"
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
              <div className="!pt-3">
                <USelect
                  name={"status"}
                  label="Status"
                  // defaultValue={plan?.status}
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                />
              </div>

              <div className="flex items-center gap-5">
                <button
                  disabled={isPlanUpdating}
                  className="text-sm bg-primary-red border border-primary-red text-white rounded-lg py-3 px-5 w-full mt-6 font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          </FormWrapper>

          <CustomConfirm
            title="Delete plan!"
            description="Are you sure to delete this plan?"
            onConfirm={handleDeletePlan}
          >
            <button
              disabled={isPlanDeleting}
              className="text-sm bg-white text-primary-red border border-primary-red rounded-lg py-3 px-5 w-full mt-3 font-semibold hover:bg-primary-red hover:text-white duration-200"
            >
              Delete
            </button>
          </CustomConfirm>
        </>
      )}
    </Modal>
  );
}
