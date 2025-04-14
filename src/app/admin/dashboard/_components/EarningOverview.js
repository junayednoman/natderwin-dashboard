"use client";

import { Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useGetEarningOverviewQuery } from "../../../../redux/api/summaryApi";
import { years } from "../../../../data/global.data";

const EarningOverview = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  // fetch data
  const params = {
    year: selectedYear,
  };
  const { data } = useGetEarningOverviewQuery(params);
  const growth = data?.data?.growth;
  const overview = data?.data?.data;
  const handleChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <div className="rounded-xl p-6 w-full xl:w-1/2 bg-light-red">
      <div className="flex lg:flex-wrap xl:flex-nowrap justify-between items-center mb-10 gap-2">
        <h1 className="text-xl font-medium">Earning Overview</h1>

        <div className="space-x-3 flex items-center gap-1">
          <h1 className="font-medium bg-white rounded-lg px-3 py-1.5 text-sm border">
            Monthly Growth:
            <span
              className={`ml-2 font-semibold ${
                growth === 0
                  ? "text-black"
                  : growth > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {growth}%
            </span>
          </h1>
          <Select
            value={selectedYear}
            style={{ width: 120 }}
            onChange={handleChange}
            options={years}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={overview}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} />

          <Tooltip
            formatter={(value) => [`Earning: $${value.toFixed(2)}`]}
            contentStyle={{
              color: "#010101",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
          />

          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Bar
            barSize={18}
            radius={5}
            background={false}
            dataKey="earning"
            fill="#FE5858"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningOverview;
