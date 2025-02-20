import { PieChart } from "@/components";

import {
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const Analytics = () => {
  const collectedWasteTypesData = [
    ["Task", "Collected Waste Types"],
    ["Plastic", 50],
    ["Paper", 20],
    ["Glass", 10],
    ["Carton", 10],
    ["Organic", 10],
  ];

  const collectedWasteTypesOptions = {
    title: "Collected Waste Types",
    titleTextStyle: {
      color: "#000",
      fontSize: "20",
      fontStyle: "normal",
      fontWeight: "700",
      textTransform: "capitalize",
    },
    pieHole: 0.4,
    is3D: true,
    sliceVisibilityThreshold: 0.02,

    chartArea: {
      left: 50,
      top: 40,
      width: "100%",
      height: "100%",
    },

    backgroundColor: "transparent",
    legend: {
      position: "right",
      alignment: "start",
      textStyle: {
        color: "#222222",
        fontSize: 14,
      },
    },
    colors: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099"],
  };

  const mostContributionsData = [
    ["Task", "Areas With The Most Contributions"],
    ["Cairo", 47.6],
    ["Alexandria", 28.6],
    ["Other", 23.6],
  ];

  const mostContributionsOptions = {
    title: "Areas With The Most Contributions",
    titleTextStyle: {
      color: "#000",
      fontSize: "20",
      fontStyle: "normal",
      fontWeight: "700",
      textTransform: "capitalize",
    },
    pieHole: 0.4,
    is3D: true,
    sliceVisibilityThreshold: 0.02,

    backgroundColor: "transparent",
    chartArea: {
      left: 50,
      top: 40,
      width: "100%",
      height: "100%",
    },

    legend: {
      position: "right",
      alignment: "start",
      textStyle: {
        color: "#222222",
        fontSize: 14,
      },
    },
    colors: ["#3366CC", "#DC3912", "#FF9900"],
  };

  // bar char
  const collectorsPerformanceData = [
    { name: "1", Deals: 10, Expenses: 90 },
    { name: "2", Deals: 5, Expenses: 98 },
    { name: "3", Deals: 15, Expenses: 100 },
    { name: "4", Deals: 8, Expenses: 90 },
  ];

  return (
    <div>
      <h2 className="text-black text-[32px] font-bold capitalize mb-[40px]">
        analytics
      </h2>

      {/* pie charts */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <PieChart
          data={collectedWasteTypesData}
          options={collectedWasteTypesOptions}
        />
        <PieChart
          data={mostContributionsData}
          options={mostContributionsOptions}
        />
      </div>

      {/* Bar Chart - Centered & Reduced Width */}
      <div className="flex flex-col items-center mt-24">
        <h3 className="text-black text-[20px] font-bold">
          Collectors Performance
        </h3>
        <ResponsiveContainer width="70%" height={400}>
          <BarChart
            data={collectorsPerformanceData}
            margin={{ right: 30, left: 20, bottom: 5 }}
            barGap={1}
          >
            <CartesianGrid stroke="#ccc" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tick={{ fill: "#222222", fontSize: 13 }}
            />
            <YAxis
              domain={[0, "dataMax"]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#444444", fontSize: 14 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              style={{ color: "#000" }}
              wrapperStyle={{
                color: "#000",
              }}
            />

            <ReferenceLine y={10} stroke="#EBEBEB" />
            <ReferenceLine y={30} stroke="#EBEBEB" />
            <ReferenceLine y={50} stroke="#EBEBEB" />
            <ReferenceLine y={70} stroke="#EBEBEB" />
            <ReferenceLine y={90} stroke="#EBEBEB" />
            <ReferenceLine y={110} stroke="#EBEBEB" />

            <Bar dataKey="Deals" fill="#2E7D32" barSize={40} />
            <Bar dataKey="Expenses" fill="#FFEB3B" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Analytics;
