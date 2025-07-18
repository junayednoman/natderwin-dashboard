"use client";
import MiniProfile from "../../../components/MiniProfile/MiniProfile";
import { Button } from "antd";
import Image from "next/image";
import {
  useGetSingleReportQuery,
  useUpdateReportStatusMutation,
} from "../../../redux/api/reportApi";
import Spinner from "../../../components/spinner/Spinner";
import { format } from "date-fns";
import { Radio } from "antd";
import { useState } from "react";
import handleMutation from "../../../utils/handleMutation";
import { defaultCoverImg, defaultProfileImg } from "../../../data/global.data";

export default function SingleReportDetails({ id }) {
  const [updateReportStatus, { isLoading: isUpdating }] =
    useUpdateReportStatusMutation();
  const { data, isLoading } = useGetSingleReportQuery(id);
  const report = data?.data;
  const [status, setStatus] = useState(report?.status || "pending");
  const post = report?.post;

  const handleUpdateStatus = () => {
    handleMutation({ id, status }, updateReportStatus, "Updating status...");
  };

  const onChange = (value) => {
    setStatus(value);
  };

  return isLoading ? (
    <Spinner className="h-[80vh] text-center" white />
  ) : (
    <div className="grid xl:grid-cols-3 grid-cols-1 gap-6 items-center">
      <div className="xl:col-span-1 border border-primary-black rounded-lg p-3 bg-light-red h-fit">
        <div className="relative flex items-center flex-col">
          <Image
            src={report?.reporter?.cover_image || defaultCoverImg}
            className="rounded-lg"
            width={1000}
            height={1000}
            alt="parrot"
          />
          <div className=" absolute -bottom-[70px]">
            <div
              style={{
                backgroundImage: `url(${
                  report?.reporter?.image || defaultProfileImg
                })`,
              }}
              className="w-[150px] h-[150px] rounded-full bg-center bg-cover bg-no-repeat mx-auto"
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-24 gap-5">
          <div>
            <h6 className="text-base font-semibold">Reported By</h6>
            <p>{report?.reporter?.name}</p>
          </div>
          <div>
            <h6 className="text-base font-semibold">User Reporting</h6>
            <p>{post?.author?.name}</p>
          </div>
          <div>
            <h6 className="text-base font-semibold">Reason For Report</h6>
            <p>{report?.reason}</p>
          </div>
          <div>
            <h6 className="text-base font-semibold">Date</h6>
            <p>{format(new Date(report?.createdAt), "dd MMMM YYY")}</p>
          </div>
        </div>
        <div className="mt-5">
          <h6 className="text-base font-semibold">Status</h6>
          <Radio.Group
            onChange={(e) => onChange(e.target.value)}
            defaultValue={report?.status || "pending"}
          >
            <Radio value="pending">Pending</Radio>
            <Radio value="resolved">Resolved</Radio>
            <Radio value="user_blocked">Block User</Radio>
            <Radio value="post_removed">Remove Post</Radio>
          </Radio.Group>
        </div>
        <div className="mt-4">
          <Button
            disabled={isUpdating}
            onClick={handleUpdateStatus}
            className="w-full !bg-primary-black !text-white !font-semibold !text-base disabled:opacity-60 !py-6 !rounded-lg !border-none"
          >
            {isUpdating
              ? "Updating..."
              : status === "user_blocked"
              ? "Block user"
              : status === "post_removed"
              ? "Remove post"
              : status === "pending"
              ? "Mark as Pending"
              : "Mark as Resolved"}
          </Button>
        </div>
      </div>
      <div className="xl:col-span-2 border border-primary-black rounded-lg p-3 bg-light-red">
        <MiniProfile
          data={{
            name: post?.author?.name,
            image: post?.author?.image,
            location: post?.location,
          }}
        />
        <div className="mt-4">
          <p className="text-lg">{post?.caption}</p>
        </div>
        <div className="mt-4">
          {post?.images?.length > 0 && (
            <div
              className={`grid gap-2
            ${post.images.length === 1 ? "grid-cols-1" : ""}
            ${post.images.length === 2 ? "grid-cols-2" : ""}
            ${post.images.length >= 3 ? "grid-cols-2" : ""}`}
            >
              {post.images.slice(0, 4).map((image, index) => (
                <div
                  key={image}
                  className={
                    post.images.length === 3 && index === 0 ? "col-span-2" : ""
                  }
                >
                  <div className="relative">
                    <Image
                      src={image}
                      className="rounded-lg w-full h-[300px] object-cover"
                      width={600}
                      height={300}
                      alt="post image"
                      onError={() =>
                        console.log(`Failed to load image: ${image}`)
                      }
                    />
                    {/* Show "Show more" overlay for 5+ images */}
                    {index === 3 && post.images.length > 4 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                        <span className="text-white text-lg font-bold">
                          +{post.images.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
