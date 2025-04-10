import userAvatar from "../../../../assets/images/user-avatar-lg.png";
import NotificationCard from "./NotificationCard";
import { Button } from "antd";

// Dummy Data
const notifications = Array.from({ length: 6 }).map((_, inx) => ({
  key: inx + 1,
  userName: "Maddie Johnson",
  userImg: userAvatar,
  message:
    "registered as a customer looking for professional bridal makeup services near Los Angeles, CA",
  date: "Fri, 12:30pm",
}));

export default function NotificationContainer() {
  return (
    <div className="mx-auto mb-10 bg-primary-red rounded-lg p-6 px-8 text-white">
      <section className="mb-10 flex-center-between">
        <h4 className="text-3xl font-semibold">Notifications</h4>

        {/* <div className="flex items-center gap-5 w-[300px]">
          <button className="text-sm bg-white text-primary-red border-2 border-white rounded-lg py-3 px-5 w-full mt-7 font-semibold hover:bg-primary-red hover:text-white duration-200">
            Delete
          </button>
          <button className="text-sm bg-primary-red border-2 border-white text-white rounded-lg py-3 px-5 w-full mt-7 font-semibold">
            Save
          </button>
        </div> */}
      </section>

      <section className="space-y-8">
        {notifications?.map((notification) => (
          <NotificationCard
            key={notification.key}
            notification={notification}
          />
        ))}
      </section>
    </div>
  );
}
