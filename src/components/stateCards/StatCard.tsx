import { memo } from "react";

import tons from "/src/assets/undraw_order_delivered_re_v4ab 1.svg";

const StatCard = memo(({ type, amount }: { type: string; amount: number }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-[38px] rounded-[12px] border-[2px] border-[#B0BEC5] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] ">
      <h3 className="capitalize text-[18px] md:text-[28px] font-normal ">
        total {type} collected
      </h3>
      <img
        src={tons}
        loading="lazy"
        alt={`Icon representing ${type} waste collection`}
        className="w-28 h-28"
      />
      <p className="text-[32px] font-bold ">{amount} kg</p>
    </div>
  );
});
export default StatCard;
