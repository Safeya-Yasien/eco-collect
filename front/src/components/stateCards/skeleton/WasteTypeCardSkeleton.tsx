import Skeleton from "@mui/material/Skeleton";

const WasteTypeCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 w-[213px] p-6 rounded-xl border-[2px] border-[#B0BEC5] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] bg-white">
      <Skeleton className="h-[28px] w-[60%] rounded-sm" />
      <Skeleton className="h-[100px] w-[100px] rounded-md" />
    </div>
  );
};
export default WasteTypeCardSkeleton;
