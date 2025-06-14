import { useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { CustomHeading } from "@/components/shared";
import { CardGrid, ErrorBanner } from "@/components/common";
import { StatCard, WasteTypeCard } from "@/components/stateCards";

import { actGetWasteTypes } from "@/store/waste/act/actGetWasteTypes";

import WasteTypeCardSkeleton from "@/components/stateCards/skeleton/WasteTypeCardSkeleton";
import StatCardSkeleton from "@/components/stateCards/skeleton/StatCardSkeleton";

const Overview = () => {
  const dispatch = useAppDispatch();
  const { wasteTypes, loading, error } = useAppSelector((state) => state.waste);

  const hasData = Object.keys(wasteTypes).length > 0;

  const stateCards = useMemo(
    () =>
      Object.entries(wasteTypes).map(([type, data]) => (
        <StatCard key={type} type={type} total_quantity={data.total_quantity} />
      )),
    [wasteTypes]
  );

  const wasteTypesCards = useMemo(
    () =>
      Object.entries(wasteTypes).map(([type, data]) => (
        <WasteTypeCard key={type} type={type} percentage={data.percentage} />
      )),
    [wasteTypes]
  );

  useEffect(() => {
    if (!hasData) {
      dispatch(actGetWasteTypes());
    }
  }, [dispatch, hasData, wasteTypes]);

  return (
    <>
      <CustomHeading title="Overview" />

      {/* state cards */}
      {loading === "pending" ? (
        <CardGrid>
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </CardGrid>
      ) : (
        <CardGrid>{stateCards}</CardGrid>
      )}

      {error && (
        <ErrorBanner
          error={error}
          onRetry={() => dispatch(actGetWasteTypes())}
        />
      )}

      <h2 className="text-black text-[20px] md:text-[32px] font-bold capitalize mb-[40px] mt-10">
        types of waste collected
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {loading === "pending"
          ? Array.from({ length: 5 }).map((_, i) => (
              <WasteTypeCardSkeleton key={i} />
            ))
          : wasteTypesCards}
      </div>
    </>
  );
};
export default Overview;
