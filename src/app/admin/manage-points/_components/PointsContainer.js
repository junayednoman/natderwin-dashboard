"use client";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import CreatePointModal from "./CreatePointModal";
import PointCard from "./PointCard";
import EditPointPlanModal from "./EditPointPlanModal";

const subscriptionPlans = [
  {
    stars: 99,
    price: "29.34",
  },
  {
    stars: 99,
    price: "29.34",
  },
  {
    stars: 99,
    price: "29.34",
  },
  {
    stars: 99,
    price: "29.34",
  },
  {
    stars: 99,
    price: "29.34",
  },
  {
    stars: 99,
    price: "29.34",
  },
];

export default function PointsContainer() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div>
      <div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-red w-full rounded-lg py-3 font-semibold text-lg text-white mb-5 flex items-center gap-2 justify-center"
        >
          <CirclePlus size={30} />
          <span>Create New Point Plan</span>
        </button>
        {/* <CreateCategoryModal open={open} setOpen={setOpen} /> */}
      </div>
      <div className="p-8 bg-primary-red rounded-lg mb-6">
        <h5 className="text-white text-2xl font-semibold mb-5">
          Manage Stars{" "}
        </h5>
        <section className="grid grid-cols-6 gap-4">
          {subscriptionPlans.map((data, idx) => (
            <PointCard key={idx} data={data} setShowModal={setShowEditModal} />
          ))}
        </section>

        {/* Create Subscription Plan Modal */}
        <CreatePointModal open={showCreateModal} setOpen={setShowCreateModal} />

        {/* Edit Subscription Plan Modal */}
        <EditPointPlanModal open={showEditModal} setOpen={setShowEditModal} />
      </div>
    </div>
  );
}
