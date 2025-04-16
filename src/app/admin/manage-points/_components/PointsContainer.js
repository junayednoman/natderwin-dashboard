"use client";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import CreatePointModal from "./CreatePointModal";
import PointCard from "./PointCard";
import EditPointPlanModal from "./EditPointPlanModal";
import { useGetAllStarPlansQuery } from "../../../../redux/api/starPlanApi";
import Spinner from "../../../../components/spinner/Spinner";
import ErrorMessage from "../../../../components/ErrorMessage/ShowError";

export default function PointsContainer() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [planId, setPlanId] = useState(null);
  const { data, isLoading, error } = useGetAllStarPlansQuery();
  const plans = data?.data;

  const handleShowModal = (id) => {
    setPlanId(id);
    setShowEditModal(true);
  };

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
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-red w-full rounded-lg py-3 font-semibold text-lg text-white mb-5 flex items-center gap-2 justify-center"
        >
          <CirclePlus size={30} />
          <span>Create New Point Plan</span>
        </button>
        {/* <CreateCategoryModal open={open} setOpen={setOpen} /> */}
      </div>
      <div className="p-8 bg-primary-red rounded-lg mb-6">
        <h5 className="text-white text-2xl font-semibold mb-5">Manage Stars</h5>
        <section className="grid grid-cols-6 gap-4">
          {plans.map((data, idx) => (
            <PointCard
              key={idx}
              data={data}
              handleShowModal={handleShowModal}
            />
          ))}
        </section>

        {/* Create Subscription Plan Modal */}
        <CreatePointModal open={showCreateModal} setOpen={setShowCreateModal} />

        {/* Edit Subscription Plan Modal */}
        <EditPointPlanModal
          id={planId}
          open={showEditModal}
          setOpen={setShowEditModal}
        />
      </div>
    </div>
  );
}
