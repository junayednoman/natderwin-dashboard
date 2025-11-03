"use client";
import { useEffect } from "react";
import NotificationCard from "./NotificationCard";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { selectUser } from "../../../../redux/features/authSlice";
import Cookies from "js-cookie";
import getSocket from "../../../../socket";
import { useGetNotificationsQuery } from "../../../../redux/api/notificationApi";
import Spinner from "../../../../components/spinner/Spinner";
import ErrorMessage from "../../../../components/ErrorMessage/ShowError";
import { Bell } from "lucide-react";
import { baseApi } from "../../../../redux/api/baseApi";
import { toast } from "react-toastify";

export default function NotificationContainer() {
  const token = Cookies.get("adminAccessToken");
  const socket = getSocket(token);
  const user = useAppSelector(selectUser);
  const [limit, setLimit] = useState(8);
  const dispatch = useAppDispatch();

  // fetch notifications initially
  const params = {
    receiver: user?.id,
    limit,
  };

  const { data, isLoading, error, refetch } = useGetNotificationsQuery(params);
  const notifications = data?.data?.data;
  const total = data?.data?.meta?.total;

  const handleLoadMore = () => {
    setLimit(limit + 8);
  };

  useEffect(() => {
    // Listen for admin's notifications
    socket.on(`receive-notification::${user?.id}`, ({ notification }) => {
      dispatch(baseApi.util.invalidateTags(["notification"]));
      toast.info(notification.title, { autoClose: 6000 });
    });

    return () => {
      socket.off(`receive-notification::${user?.id}`);
    };
  }, [notifications, user?.id, socket]);

  const handleReadAll = () => {
    socket.emit("read-notification", user?.id);
    dispatch(baseApi.util.invalidateTags(["notification"]));
    refetch();
  };

  return isLoading ? (
    <Spinner className="py-56" />
  ) : error ? (
    <ErrorMessage
      className="text-center py-56"
      showBtn
      message={error?.data?.message}
    />
  ) : (
    <div className="mx-auto mb-10 bg-primary-red rounded-lg p-6 px-8 text-white">
      <section className="flex-center-between mb-5">
        <h4 className="text-3xl font-semibold">Notifications</h4>
        <button
          onClick={handleReadAll}
          className="text-sm = border  text-white rounded-lg py-3 px-8 w-auto font-semibold"
        >
          Mark all as read
        </button>

        {/* <div className="flex items-center gap-5 w-[300px]">
        <button className="text-sm bg-white text-primary-red border-2 border-white rounded-lg py-3 px-5 w-full mt-7 font-semibold hover:bg-primary-red hover:text-white duration-200">
          Delete
        </button>
        <button className="text-sm bg-primary-red border-2 border-white text-white rounded-lg py-3 px-5 w-full mt-7 font-semibold">
          Save
        </button>
      </div> */}
      </section>

      {notifications?.length > 0 ? (
        <section className="space-y-8">
          {notifications?.map((notification) => (
            <NotificationCard
              key={notification.key}
              notification={notification}
            />
          ))}
          <div>
            {total > limit && total > limit && (
              <button
                onClick={handleLoadMore}
                className="text-sm = border  text-white rounded-lg py-3 px-8 w-auto mt-7 font-semibold"
              >
                Load more
              </button>
            )}
          </div>
        </section>
      ) : (
        <div className="text-center py-56 flex flex-col items-center">
          <Bell className="text-center text-slate-200" size={80} />
          <p className="text-center text-lg mt-3  text-slate-200">
            No notifications yet!
          </p>
        </div>
      )}
    </div>
  );
}
