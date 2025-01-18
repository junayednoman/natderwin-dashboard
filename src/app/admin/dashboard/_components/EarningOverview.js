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

// dummy data
const data = [
  { month: "Jan", user: 120 },
  { month: "Feb", user: 140 },
  { month: "Mar", user: 152 },
  { month: "Apr", user: 122 },
  { month: "May", user: 153 },
  { month: "Jun", user: 164 },
  { month: "Jul", user: 193 },
  { month: "Aug", user: 134 },
  { month: "Sep", user: 184 },
  { month: "Oct", user: 126 },
  { month: "Nov", user: 164 },
  { month: "Dec", user: 100 },
];

const EarningOverview = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedUserType, setSelectedUserType] = useState("customer");

  const handleChange = (value) => {
    setSelectedYear(value);
  };
  const handleUserChange = (value) => {
    setSelectedUserType(value);
  };

  return (
    <div className="rounded-xl p-6 w-full xl:w-1/2 bg-light-red">
      <div className="flex lg:flex-wrap xl:flex-nowrap justify-between items-center mb-10 gap-2">
        <h1 className="text-xl font-medium">Earning Overview</h1>

        <div className="space-x-3 flex items-center gap-1">
          <h1 className="font-medium bg-white rounded-lg px-3 py-1.5 text-sm border">
            Monthly Growth: <span className="font-semibold">35.80%</span>
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
        <BarChart
          data={data}
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
            formatter={(value) => [`Monthly Users Joined: ${value}`]}
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
            dataKey="user"
            fill="#FE5858"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningOverview;
