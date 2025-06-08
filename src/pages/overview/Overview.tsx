import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { CustomHeading } from "@/components/shared";
import { StatCard, WasteTypeCard } from "@/components/stateCards";
import { actGetWasteTypes } from "@/store/waste/act/actGetWasteTypes";
import { Skeleton } from "@mui/material";

const Overview = () => {
  const dispatch = useAppDispatch();
  const { wasteTypes, loading, error } = useAppSelector((state) => state.waste);

  useEffect(() => {
    dispatch(actGetWasteTypes());
  }, [dispatch]);

  return (
    <>
      <CustomHeading title="Overview" />

      {loading === "pending" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-5 mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              className="flex flex-col items-center justify-center p-6 gap-[38px] rounded-[12px] border-[2px] border-[#B0BEC5] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]"
              key={i}
            >
              <Skeleton className="h-[32px] w-[70%] rounded-sm" />
              <Skeleton className="w-28 h-28 rounded-md" />
              <Skeleton className="h-[36px] w-[50%] rounded-sm" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center text-red-500" role="alert">
          {error}
          <button
            className="ml-4 px-3 py-1 bg-[#2E7D32] text-white rounded"
            onClick={() => dispatch(actGetWasteTypes())}
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-5">
        {/* state cards */}
        {Object.entries(wasteTypes).map(([type, amount]) => (
          <StatCard key={type} type={type} amount={amount} />
        ))}
      </div>

      <h2 className="text-black text-[20px] md:text-[32px] font-bold capitalize mb-[40px] mt-10">
        types of waste collected
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {loading === "pending"
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center gap-6 w-[213px] p-6 rounded-xl border-[2px] border-[#B0BEC5] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] bg-white"
              >
                <Skeleton className="h-[28px] w-[60%] rounded-sm" />
                <Skeleton className="h-[100px] w-[100px] rounded-md" />
              </div>
            ))
          : Object.entries(wasteTypes).map(([type]) => (
              <WasteTypeCard key={type} type={type} />
            ))}
      </div>
    </>
  );
};
export default Overview;
