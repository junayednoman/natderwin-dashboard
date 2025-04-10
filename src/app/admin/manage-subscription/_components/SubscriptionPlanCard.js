import CustomConfirm from "../../../../components/CustomConfirm/CustomConfirm";

export default function SubscriptionPlanCard({ data, setShowEditPlanModal }) {
  const handleDeletePackage = () => {
    message.success("deleted");
  };

  return (
    <div className="bg-light-red p-4 rounded-lg flex flex-col justify-between">
      <h5 className="text-2xl font-bold text-[#8C6D17]">{data.title}</h5>
      <div className="flex items-center gap-1 mt-5">
        <span className="text-xl font-semibold">{data.duration}</span> -{" "}
        <span className="text-4xl font-bold">${data.price}</span>
      </div>
      <div className="mt-4">
        <p className="text-[#727272] text-lg">{data.feature}</p>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={() => setShowEditPlanModal(true)}
          className="text-sm bg-white text-primary-red border border-primary-red rounded-lg py-3 px-5 w-full mt-7 font-semibold hover:bg-primary-red hover:text-white duration-200"
        >
          Edit
        </button>
        <CustomConfirm
          title="Delete plan"
          description="Are you sure to delete this plan?"
          onConfirm={handleDeletePackage}
        >
          <button className="text-sm bg-primary-red border border-primary-red text-white rounded-lg py-3 px-5 w-full mt-7 font-semibold">
            Delete
          </button>
        </CustomConfirm>
      </div>
    </div>
  );
}
