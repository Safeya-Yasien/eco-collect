import { PieChart } from "@/components";

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

  return (
    <div>
      <h2 className="text-black text-[32px] font-bold capitalize mb-[40px]">
        analytics
      </h2>

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
    </div>
  );
};
export default Analytics;
