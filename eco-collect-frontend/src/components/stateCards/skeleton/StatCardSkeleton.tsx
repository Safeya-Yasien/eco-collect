import Skeleton from "@mui/material/Skeleton";

const StatCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-[38px] rounded-[12px] border-[2px] border-[#B0BEC5] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <Skeleton className="h-[32px] w-[70%] rounded-sm" />
      <Skeleton className="w-28 h-28 rounded-md" />
      <Skeleton className="h-[36px] w-[50%] rounded-sm" />
    </div>
  );
};
export default StatCardSkeleton;
