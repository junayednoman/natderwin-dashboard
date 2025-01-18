import { MapPin } from "lucide-react";
import { LocateIcon } from "lucide-react";

export default function MiniProfile() {
  return (
    <div className="flex items-center gap-2">
      <div>
        <div
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/D0Yqt2hn/Bullly-kutta.jpg')",
          }}
          className="w-[52px] h-[52px] rounded-full bg-center bg-cover bg-no-repeat mx-auto"
        ></div>
      </div>
      <div>
        <h5 className="font-semibold text-lg">Kutta The Dog</h5>
        <div className="flex items-center gap-2 mt-[2px]">
          <MapPin size={20} />
          <p>Lost Angeles, USA</p>
        </div>
      </div>
    </div>
  );
}
