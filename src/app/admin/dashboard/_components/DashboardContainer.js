"use client";
import RecentUserTable from "./RecentUserTable";
import UserOverview from "./UserOverview";
import CustomCountUp from "../../../../components/CustomCountUp/CustomCountUp";
import EarningOverview from "./EarningOverview";
import { Users } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { useGetStatsQuery } from "../../../../redux/api/summaryApi";
import Spinner from "../../../../components/spinner/Spinner";
export default function DashboardContainer() {
  const { data: statData, isLoading } = useGetStatsQuery();
  const stats = statData?.data;


  return isLoading ? (
    <Spinner className="py-44" />
  ) : (
    <div className="space-y-4">
      {/* User Stats Section */}
      <section className="grid grid-cols-2 gap-5">
        <div className="flex-center-start gap-x-4 bg-light-red p-6 rounded-lg">
          <div className="bg-primary-blue flex-center rounded-full p-4">
            <Users size={30} className="text-white" />
          </div>
          <div>
            <p className="font-dmSans text-xl text-primary-black">
              Total Users
            </p>
            <h5 className="text-3xl font-semibold text-primary-black mt-0.5">
              <CustomCountUp end={stats?.totalUsers || 0} />
            </h5>
          </div>
        </div>
        <div className="flex-center-start gap-x-4 bg-light-red p-6 rounded-lg">
          <div className="bg-primary-blue flex-center rounded-full p-4">
            <CircleDollarSign size={33} className="text-white" />
          </div>
          <div>
            <p className="font-dmSans text-xl text-primary-black">
              Total Earnings
            </p>
            <h5 className="text-3xl font-semibold text-primary-black mt-0.5">
              $<CustomCountUp end={stats?.totalEarnings?.toFixed(2) || 0} />
            </h5>
          </div>
        </div>
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
