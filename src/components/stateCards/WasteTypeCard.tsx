import glass from "/src/assets/Frame 242.svg";

const WasteTypeCard = ({
  type,
  percentage,
}: {
  type: string;
  percentage: number;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full md:w-[213px] p-6 rounded-xl border-[2px] border-[#B0BEC5] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]  bg-white">
      <h3 className="capitalize text-[24px] font-normal ">{type}</h3>
      <img src={glass} alt="glass" loading="lazy" />
      <p className="text-xl  ">{percentage}%</p>
    </div>
  );
};
export default WasteTypeCard;
