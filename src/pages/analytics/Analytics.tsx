import { useEffect, useMemo } from "react";

import { CustomHeading } from "@/components/shared";
import { BarChartComponent, PieChartComponent } from "@/components";
import { useIsMobile } from "@/hooks/use-mobile";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actGetMostContributedLocation from "@/store/analytics/act/actGetMostContributedLocation";
import actGetCollectorsPerformance from "@/store/analytics/act/actGetCollectorsPerformance";
import { actGetWasteTypes } from "@/store/waste/act/actGetWasteTypes";

const Analytics = () => {
  const isMobile = useIsMobile();

  const collectedWasteTypesOptions = {
    title: "Collected Waste Types",
    titleTextStyle: {
      color: "#000",
      fontSize: isMobile ? 16 : 20,
      fontStyle: "normal",
      fontWeight: "700",
      textTransform: "capitalize",
    },
    pieHole: 0.4,
    is3D: true,
    sliceVisibilityThreshold: 0.02,

    chartArea: {
      left: isMobile ? "20" : "50",
      top: "40",
      width: "100%",
      height: isMobile ? "80%" : "100%",
    },

    backgroundColor: "transparent",
    legend: {
      position: isMobile ? "bottom" : "right",
      alignment: "start",
      textStyle: {
        color: "#222222",
        fontSize: 14,
      },
    },
    colors: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099"],
  };

  const mostContributionsOptions = {
    title: "Areas With The Most Contributions",
    titleTextStyle: {
      color: "#000",
      fontSize: isMobile ? 16 : 20,
      fontStyle: "normal",
      fontWeight: "700",
      textTransform: "capitalize",
    },
    pieHole: 0.4,
    is3D: true,
    sliceVisibilityThreshold: 0.02,

    backgroundColor: "transparent",
    chartArea: {
      left: isMobile ? "20" : "50",
      top: "40",
      width: "100%",
      height: isMobile ? "80%" : "100%",
    },

    legend: {
      position: isMobile ? "bottom" : "right",
      alignment: "start",
      textStyle: {
        color: "#222222",
        fontSize: 14,
      },
    },
    colors: ["#3366CC", "#DC3912", "#FF9900"],
  };

  const dispatch = useAppDispatch();
  const { mostContributedLocations, collectorsPerformance, loading, error } =
    useAppSelector((state) => state.analytics);

  const { wasteTypes } = useAppSelector((state) => state.waste);

  useEffect(() => {
    dispatch(actGetMostContributedLocation());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actGetCollectorsPerformance());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actGetWasteTypes());
  }, [dispatch]);

  // most contributed locations data
  const mostContributionsData = useMemo(() => {
    if (
      Array.isArray(mostContributedLocations) &&
      mostContributedLocations.length > 0
    ) {
      return [
        ["Task", "Areas With The Most Contributions"],
        ...mostContributedLocations.map((item) => [
          item.location_name,
          item.percentage,
        ]),
      ];
    }
    return [["Task", "Areas With The Most Contributions"]];
  }, [mostContributedLocations]);

  // collectors performance data
  const collectorsPerformanceData = useMemo(() => {
    return collectorsPerformance;
  }, [collectorsPerformance]);

  // waste types data
  const collectedWasteTypesData = useMemo(() => {
    if (wasteTypes && Object.keys(wasteTypes).length > 0) {
      return [
        ["Task", "Collected Waste Types"],
        ...Object.entries(wasteTypes).map(([key, value]) => [
          key,
          value.percentage,
        ]),
      ];
    }
    return [["Task", "Collected Waste Types"]];
  }, [wasteTypes]);

  return (
    <div>
      <CustomHeading title="analytics" />

      {/* pie charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
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
        <BarChartComponent
          collectorsPerformanceData={collectorsPerformanceData}
        />
      </div>
    </div>
  );
};
export default Analytics;
