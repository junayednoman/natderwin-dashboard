"use client";
import { Select } from "antd";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", earning: 1200 },
  { month: "Feb", earning: 1402 },
  { month: "Mar", earning: 1525 },
  { month: "Apr", earning: 1222 },
  { month: "May", earning: 1553 },
  { month: "Jun", earning: 1634 },
  { month: "Jul", earning: 1923 },
  { month: "Aug", earning: 1324 },
  { month: "Sep", earning: 1834 },
  { month: "Oct", earning: 1256 },
  { month: "Nov", earning: 1634 },
  { month: "Dec", earning: 2105 },
];

const UserOverview = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <div className="rounded-xl p-6 w-full xl:w-1/2 bg-light-red">
      <div className="text-parimaryWhite flex justify-between items-center mb-10">
        <h1 className="text-xl font-medium">Users Overview</h1>

        <div className="flex-center-start gap-x-4">
          <h1 className="font-medium bg-white rounded-lg px-3 py-1.5 text-sm border">
            Monthly Growth: <span className="ml-2 font-semibold">35.80%</span>
          </h1>

          <Select
            value={selectedYear}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "2024", label: "2024" },
              { value: "2023", label: "2023" },
              { value: "2022", label: "2022" },
              { value: "2021", label: "2021" },
            ]}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#FE5858" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.4} />
            </linearGradient>
          </defs>

          <XAxis
            tickMargin={10}
            axisLine={false}
            tickLine={false}
            dataKey="month"
          />

          <YAxis tickMargin={20} axisLine={false} tickLine={false} />

          <CartesianGrid
            opacity={0.19}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Tooltip
            formatter={(value) => [`Monthly Earning: $${value}`]}
            contentStyle={{
              color: "#010101",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
            itemStyle={{ color: "#FE5858" }}
          />

          <Area
            activeDot={{ fill: "#1B70A6" }}
            type="monotone"
            dataKey="earning"
            strokeWidth={0}
            stroke="blue"
            fill="url(#color)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserOverview;
