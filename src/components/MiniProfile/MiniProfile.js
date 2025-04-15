import { defaultProfileImg } from "../../constant/global.constant";
import { MapPin } from "lucide-react";
export default function MiniProfile({ data }) {
  console.log("data", data);
  return (
    <div className="flex items-center gap-2">
      <div>
        <div
          style={{
            backgroundImage: `url(${data?.image || defaultProfileImg})`,
          }}
          className="w-[52px] h-[52px] rounded-full bg-center bg-cover bg-no-repeat mx-auto"
        ></div>
      </div>
      <div>
        <h5 className="font-semibold text-lg">{data?.name}</h5>
        <div className="flex items-center gap-2 mt-[2px]">
          <MapPin size={20} />
          <p>{data?.location}</p>
        </div>
      </div>
    </div>
  );
}
