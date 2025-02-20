import { PieChart } from "@/components";
import Chart from "react-google-charts";
// import React, { PureComponent } from "react";
// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Rectangle,
// } from "recharts";

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
    ["Rate", "Deals", "Expenses"],
    ["1", 10, 90],
    ["2", 5, 98],
    ["3", 15, 100],
    ["4", 8, 90],
  ];

  // //  chart options
  const collectorsPerformanceOptions = {
    chart: {
      title: "Collectors’ Performance",
    },
    backgroundColor: "transparent", // Removes the chart container background
    chartArea: {
      left: "10%",
      width: "80%",
      height: "80%",
      backgroundColor: "none", // Ensures the plot area itself is transparent
    },
    legend: {
      position: "bottom",
      textStyle: { color: "#000" },
    },
    colors: ["#2E7D32", "#FFEB3B"],
    vAxis: {
      title: "Performance Rate",
      format: "0",
      gridlines: { count: 20 },
    },
  };

  // const collectorsPerformanceData = [
  //   {
  //     name: "1",
  //     uv: 10,
  //     pv: 90,
  //     amt: 2400,
  //   },
  //   {
  //     name: "2",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "3",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "4",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  // ];

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

      {/* bar char */}
      <Chart
        // Note the usage of Bar and not BarChart for the material version
        chartType="Bar"
        loader={<div>Loading Chart...</div>}
        data={collectorsPerformanceData}
        options={collectorsPerformanceOptions}
        height={"400px"}
        width={"600px"}
      />

      {/* <div className="flex justify-center items-center w-full">
        <ResponsiveContainer width="80%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={collectorsPerformanceData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /><YAxis 
  domain={[0, 100]} 
  ticks={[0, 20, 40, 60, 80, 100]} 
  scale="linear" // Use linear scale
  interval={0} // Ensure all ticks are visible
/>

            <Tooltip />
            <Legend />
            <Bar
              dataKey="pv"
              fill="#2E7D32"
              // "#2E7D32", "#FFEB3B"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="uv"
              fill="#FFEB3B"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};
export default Analytics;
