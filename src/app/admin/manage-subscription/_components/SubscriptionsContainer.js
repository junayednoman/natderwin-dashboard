"use client";
import SubscriptionPlanCard from "./SubscriptionPlanCard";
import CreateSubscriptionPlanModal from "./CreateSubscriptionPlanModal";
import { useState } from "react";
import EditSubscriptionPlanModal from "./EditSubscriptionPlanModal";
import { CirclePlus } from "lucide-react";

const subscriptionPlans = [
  {
    title: "Monthly",
    price: "29",
    duration: "month",
    type: "Flexible Monthly Plan",
    feature:
      "Ideal for seller who need short-term access or want to try out our services without a long-term commitment.",
  },
  {
    title: "Quarterly",
    price: "55",
    duration: "quarter",
    type: "Save with a Quarterly Plan",
    feature:
      "Perfect for sellers who want to commit for a few months with added value. Enjoy savings compared to the monthly plan!",
    tag: "Most Popular",
    isHighlighted: true,
  },
  {
    title: "Yearly",
    price: "95",
    duration: "year",
    type: "Best Value Annual Plan",
    feature:
      "Our most cost-effective option, ideal for regular seller. Commit for a year and save big!",
  },
];

export default function SubscriptionsContainer() {
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);

  return (
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
        <section className="grid grid-cols-1 gap-4">
          {subscriptionPlans.map((data, idx) => (
            <SubscriptionPlanCard
              key={idx}
              data={data}
              setShowEditPlanModal={setShowEditPlanModal}
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
          open={showEditPlanModal}
          setOpen={setShowEditPlanModal}
        />
      </div>
    </div>
  );
}
