"use client";
import { Pagination } from "antd";
import Image from "next/image";
import PostCard from "./PostCard";


export default function SingleAccountDetails() {
  const handlePagination = (page, pageSize) => {
    console.log("page", page, "pageSize", pageSize);
  };
  return (
    <div className="bg-[#FE5858] p-6 rounded-lg mb-6">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 items-center">
        <div className="lg:col-span-1 border border-primary-black rounded-lg p-3 bg-light-red h-fit">
          <div className="relative flex items-center flex-col">
            <Image
              src={
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
                  backgroundImage:
                    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBkpGO-67sIdjEU1sUdPmMRZt0m75S6Rjfyw&s')",
                }}
                className="w-[150px] h-[150px] rounded-full bg-center bg-cover bg-no-repeat mx-auto"
              ></div>
            </div>
          </div>
          <div className="mt-20">
            <h3 className="text-xl font-bold text-center">Kallu_Kutta</h3>
            <div className="grid grid-cols-2 gap-5 mt-6">
              <div>
                <h6 className="text-base font-semibold">Email</h6>
                <p>Kallu_Man</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Contact</h6>
                <p>Kallu_Man</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Location</h6>
                <p>
                  <a
                    href="#"
                    className="text-primary-blue hover:text-primary-blue/85 underline"
                  >
                    Cute pet post
                  </a>
                </p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Account Type</h6>
                <p>Subscriber</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Subscription Plan</h6>
                <p>Kallu_Man</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Points Purchased</h6>
                <p>Kallu_Man</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Posts</h6>
                <p>23</p>
              </div>
              <div>
                <h6 className="text-base font-semibold">Joining Date</h6>
                <p>11 Dec, 2025</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 border border-primary-black rounded-lg p-3 bg-light-red h-fit">
          <h3 className="text-3xl font-bold">Posts</h3>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-6 post-pagination">
        <Pagination
          pageSize={4}
          onChange={handlePagination}
          align="end"
          defaultCurrent={1}
          total={20}
        />
      </div>
    </div>
  );
}
