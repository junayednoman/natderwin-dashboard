"use client";
import { useEffect } from "react";
import userAvatar from "../../../../assets/images/user-avatar-lg.png";
import NotificationCard from "./NotificationCard";
import { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks/hooks";
import { selectUser } from "../../../../redux/features/authSlice";
import Cookies from "js-cookie";
import getSocket from "../../../../socket";
import { useGetNotificationsQuery } from "../../../../redux/api/notificationApi";

export default function NotificationContainer() {
  const token = Cookies.get("adminAccessToken");
  const socket = getSocket(token);
  const [socketNotifications, setSocketNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const user = useAppSelector(selectUser);

  // fetch notifications initially
  const { data } = useGetNotificationsQuery();
  const notificationsData = data?.data?.data;

  useEffect(() => {
    // Listen for admin's notifications
    socket.on(`receive-notification::${user?.id}`, (notification) => {
      console.log("📢 Notification received:", notification);
      setSocketNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off(`receive-notification::${user?.id}`);
    };
  }, []);

  useEffect(() => {
    if (socketNotifications.length > 0) {
      setNotifications(socketNotifications);
    } else {
      setNotifications(notificationsData);
    }
  }, [socketNotifications, notificationsData]);

  console.log('notifications', notifications);

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
