import { BarChartComponent, PieChartComponent } from "@/components";
import { CustomHeading } from "@/components/shared";

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
      <CustomHeading title="analytics" />

      {/* pie charts */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <PieChartComponent
          data={collectedWasteTypesData}
          options={collectedWasteTypesOptions}
        />
        <PieChartComponent
          data={mostContributionsData}
          options={mostContributionsOptions}
        />
      </div>

      {/* Bar Chart - Centered & Reduced Width */}
      <div className="w-full flex flex-col items-center mt-24">
        <h3 className="text-black text-[20px] font-bold">
          Collectors’ Performance
        </h3>
        <BarChartComponent data={collectorsPerformanceData} />
      </div>
    </div>
  );
};
export default Analytics;
