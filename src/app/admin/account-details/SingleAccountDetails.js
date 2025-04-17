"use client";
import { Pagination } from "antd";
import Image from "next/image";
import PostCard from "./PostCard";
import { useGetSingleUserQuery } from "../../../redux/api/userApi";
import { defaultProfileImg } from "../../../constant/global.constant";
import { format } from "date-fns";
import Spinner from "../../../components/spinner/Spinner";
import ErrorMessage from "../../../components/ErrorMessage/ShowError";
import { useGetAllPostsQuery } from "../../../redux/api/postApi";
import { useState } from "react";

export default function SingleAccountDetails({ id }) {
  const { data, isLoading, error } = useGetSingleUserQuery(id);
  const [page, setPage] = useState(1);
  const user = data?.data;
  const limit = 2;

  // fetch posts
  const params = {
    author: id,
    limit,
    page,
  };

  const {
    data: postData,
    isLoading: postLoading,
    error: postError,
  } = useGetAllPostsQuery(params);
  const posts = postData?.data?.data;
  const total = postData?.data?.meta?.total;

  const handlePagination = (page) => {
    setPage(page);
  };

  return isLoading || postLoading ? (
    <Spinner className="py-44" />
  ) : error || postError ? (
    <ErrorMessage
      className="text-center py-44"
      showBtn
      message={error?.data?.message}
    />
  ) : (
    <div className="bg-[#FE5858] p-6 rounded-lg mb-6">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 items-center">
        <div className="lg:col-span-1 border border-primary-black rounded-lg p-3 bg-light-red h-fit">
          <div className="relative flex items-center flex-col">
            <Image
              src={
                user?.cover_image ||
                "https://worldbirds.com/wp-content/uploads/2020/07/color5.webp"
              }
              className="rounded-lg"
              width={1000}
              height={1000}
              alt="parrot"
            />
            <div className=" absolute -bottom-[70px]">
              <div
                style={{
                  backgroundImage: `url(${user?.image || defaultProfileImg})`,
                }}
                className="w-[150px] h-[150px] rounded-full bg-center bg-cover bg-no-repeat mx-auto"
              ></div>
            </div>
          </div>
          <div className="mt-20">
            <h3 className="text-xl font-bold text-center">{user?.name}</h3>
            <div className="grid grid-cols-2 gap-5 mt-6">
              <div>
                <h6 className="text-base font-semibold">Email</h6>
                <p>{user?.email}</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Location</h6>
                <p>{user?.location}</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Account Type</h6>
                <p className="capitalize">{user?.type}</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Points Purchased</h6>
                <p>{user?.points_purchase}</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Posts</h6>
                <p>{total || 0}</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Joining Date</h6>
                <p>
                  {user?.createdAt &&
                    format(new Date(user?.createdAt), "dd MMM yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 border border-primary-black rounded-lg p-3 bg-light-red h-fit">
          <h3 className="text-3xl font-bold">Posts</h3>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {posts?.map((post) => (
              <PostCard key={post?._id} post={post} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-6 post-pagination">
        <Pagination
          pageSize={limit}
          onChange={handlePagination}
          align="end"
          defaultCurrent={1}
          total={total}
        />
      </div>
    </div>
  );
}
