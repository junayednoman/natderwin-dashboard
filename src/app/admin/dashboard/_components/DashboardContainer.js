"use client";

import RecentUserTable from "./RecentUserTable";
import UserOverview from "./UserOverview";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import EarningOverview from "./EarningOverview";
import { Users } from "lucide-react";
import { CircleDollarSign } from "lucide-react";

// Dummy Data
const userStats = [
  {
    key: "users",
    title: "Total Users",
    icon: <Users size={30} className="text-white" />,
    count: 518,
  },
  {
    key: "customers",
    title: "Total Earnings",
    icon: <CircleDollarSign size={33} className="text-white" />,
    count: 118,
  },
];

export default function DashboardContainer() {
  return (
    <div className="space-y-4">
      {/* User Stats Section */}
      <section className="grid grid-cols-2 gap-5">
        {userStats?.map((stat) => (
          <div
            key={stat.key}
            className="flex-center-start gap-x-4 bg-light-red p-6 rounded-lg"
          >
            <div className="bg-primary-blue flex-center rounded-full p-4">
              {stat.icon}
            </div>

            <div>
              <p className="font-dmSans text-xl text-primary-black">
                {stat.title}
              </p>
              <h5 className="text-3xl font-semibold text-primary-black mt-0.5">
                {stat.key !== "earning" ? (
                  <CustomCountUp end={stat.count} />
                ) : (
                  <span>
                    $<CustomCountUp end={stat.count} />
                  </span>
                )}
              </h5>
            </div>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="flex-center-between xl:flex-row flex-col gap-4">
        <UserOverview />
        <EarningOverview />
      </section>

      {/* Recent Users Table */}
      <section>
        <RecentUserTable />
      </section>
    </div>
  );
}
