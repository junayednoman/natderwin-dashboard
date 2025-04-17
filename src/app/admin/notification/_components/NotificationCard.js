import { Trash2 } from "lucide-react";
import Image from "next/image";
import userAvatar from "../../../../assets/images/user-avatar-lg.png";

export default function NotificationCard({ notification }) {
  return (
    <div className="flex-center-start gap-x-4">
      <Image
        src={notification?.image || userAvatar}
        alt="user avatar"
        height={1200}
        width={1200}
        className="w-[65px] h-auto aspect-square rounded-full"
      />

      <div className="space-y-1">
        <p className="text-xl">
          <span className="text-[21px] font-semibold">
            {notification.title}
          </span>
        </p>
        <p className="text-lg font-medium">{notification.body}</p>
        <p className="text-[#ffffffb9]">{notification.date}</p>
      </div>

      <div className="flex-center-between w-max whitespace-nowrap gap-x-6 mb-7 ml-10">
        <button>
          <Trash2 size={18} color="#F16365" />
        </button>
      </div>
    </div>
  );
}
