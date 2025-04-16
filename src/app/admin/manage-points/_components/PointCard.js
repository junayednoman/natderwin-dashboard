import starIcon from "../../../../assets/images/star.svg";
import Image from "next/image";

export default function PointCard({ data, handleShowModal }) {
  return (
    <div className="bg-light-red p-4 rounded-lg text-center">
      <Image
        src={starIcon}
        alt="star icon"
        width={40}
        height={40}
        className="mx-auto text-center mb-1"
      />
      <p className="text-lg">{data.stars} Stars</p>
      <h4 className="text-3xl font-bold mt-4">${data.price}</h4>
      <div className="flex items-center gap-5">
        <button
          onClick={() => handleShowModal(data?._id)}
          className="text-sm bg-primary-red border border-primary-red text-white rounded-lg py-[10px] px-5 w-full mt-6 font-semibold"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
