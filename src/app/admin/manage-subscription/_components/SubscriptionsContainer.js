"use client";
import SubscriptionPlanCard from "./SubscriptionPlanCard";
import CreateSubscriptionPlanModal from "./CreateSubscriptionPlanModal";
import { useState } from "react";
import EditSubscriptionPlanModal from "./EditSubscriptionPlanModal";
import { CirclePlus } from "lucide-react";
import { useGetAllSubscriptionPlansQuery } from "../../../../redux/api/subscriptionPlanApi";
import Spinner from "../../../../components/spinner/Spinner";
import ErrorMessage from "../../../../components/ErrorMessage/ShowError";

export default function SubscriptionsContainer() {
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [planId, setPlanId] = useState(null);

  const handleShowEditModal = (id) => {
    setShowEditPlanModal(true);
    setPlanId(id);
  };

  const { data, isLoading, error } = useGetAllSubscriptionPlansQuery();
  const subscriptions = data?.data;

  return isLoading ? (
    <Spinner className="py-44" />
  ) : error ? (
    <ErrorMessage
      className="text-center py-44"
      showBtn
      message={error?.data?.message}
    />
  ) : (
    <div>
      <div>
        <button
          onClick={() => setShowCreatePlanModal(true)}
          className="bg-primary-red w-full rounded-lg py-3 font-semibold text-lg text-white mb-5 flex items-center gap-2 justify-center"
        >
          <CirclePlus size={30} />
          <span>Create Subscription Plan</span>
        </button>
      </div>
      <div className="p-8 bg-primary-red rounded-lg mb-6">
        <section className="grid grid-cols-2 gap-4">
          {subscriptions?.map((data, idx) => (
            <SubscriptionPlanCard
              key={idx}
              data={data}
              handleShowEditModal={handleShowEditModal}
            />
          ))}
        </section>

        {/* Create Subscription Plan Modal */}
        <CreateSubscriptionPlanModal
          open={showCreatePlanModal}
          setOpen={setShowCreatePlanModal}
        />

        {/* Edit Subscription Plan Modal */}
        <EditSubscriptionPlanModal
          id={planId}
          open={showEditPlanModal}
          setOpen={setShowEditPlanModal}
        />
      </div>
    </div>
  );
}
