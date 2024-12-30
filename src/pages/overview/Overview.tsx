import tons from "/src/assets/undraw_order_delivered_re_v4ab 1.svg";
import glass from "/src/assets/Frame 242.svg";

const Overview = () => {
  return (
    <div className="">
      <h2 className="text-black text-[32px] font-bold capitalize mb-[40px]">
        Your Weekly Overview
      </h2>

      <div className="flex gap-5 flex-wrap">
        <div className="flex flex-col items-center justify-center w-[335px] h-[385px] p-6 gap-[38px] rounded-[12px] border-[2px] border-[#B0BEC5] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] ">
          <h3 className="capitalize text-[28px] font-normal ">
            total waste collected
          </h3>
          <img src={tons} alt="tons" loading="lazy" />
          <h3 className="text-[32px] font-bold ">2 Tons</h3>
          <p className="text-[20px] font-normal ">200kg more than last week</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[335px] h-[385px] p-6 gap-[38px] rounded-[12px] border-[2px] border-[#B0BEC5] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] ">
          <h3 className="capitalize text-[28px] font-normal ">
            total waste collected
          </h3>
          <img src={tons} alt="tons" loading="lazy" />
          <h3 className="text-[32px] font-bold ">2 Tons</h3>
          <p className="text-[20px] font-normal ">200kg more than last week</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[335px] h-[385px] p-6 gap-[38px] rounded-[12px] border-[2px] border-[#B0BEC5] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] ">
          <h3 className="capitalize text-[28px] font-normal ">
            total waste collected
          </h3>
          <img src={tons} alt="tons" loading="lazy" />
          <h3 className="text-[32px] font-bold ">2 Tons</h3>
          <p className="text-[20px] font-normal ">200kg more than last week</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[335px] h-[385px] p-6 gap-[38px] rounded-[12px] border-[2px] border-[#B0BEC5] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] ">
          <h3 className="capitalize text-[28px] font-normal ">
            total waste collected
          </h3>
          <img src={tons} alt="tons" loading="lazy" />
          <h3 className="text-[32px] font-bold ">2 Tons</h3>
          <p className="text-[20px] font-normal ">200kg more than last week</p>
        </div>
      </div>

      <h2 className="text-black text-[32px] font-bold capitalize mb-[40px] mt-10">
        types of waste collected
      </h2>

      <div className="flex gap-5 flex-wrap">
        <div className="flex flex-col justify-center items-center gap-6 w-[213px] p-6 rounded-xl border-[2px] border-[#B0BEC5] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]  bg-white">
          <h3 className="capitalize text-[24px] font-normal ">plastic </h3>
          <img src={glass} alt="glass" loading="lazy" />
          <h3 className="text-[p28x] font-bold ">500 kg</h3>
          <p className="text-[12px] font-normal ">200kg more than last week </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 w-[213px] p-6 rounded-xl border-[2px] border-[#B0BEC5] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]  bg-white">
          <h3 className="capitalize text-[24px] font-normal ">plastic </h3>
          <img src={glass} alt="glass" loading="lazy" />
          <h3 className="text-[p28x] font-bold ">500 kg</h3>
          <p className="text-[12px] font-normal ">200kg more than last week </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 w-[213px] p-6 rounded-xl border-[2px] border-[#B0BEC5] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]  bg-white">
          <h3 className="capitalize text-[24px] font-normal ">plastic </h3>
          <img src={glass} alt="glass" loading="lazy" />
          <h3 className="text-[p28x] font-bold ">500 kg</h3>
          <p className="text-[12px] font-normal ">200kg more than last week </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 w-[213px] p-6 rounded-xl border-[2px] border-[#B0BEC5] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]  bg-white">
          <h3 className="capitalize text-[24px] font-normal ">plastic </h3>
          <img src={glass} alt="glass" loading="lazy" />
          <h3 className="text-[p28x] font-bold ">500 kg</h3>
          <p className="text-[12px] font-normal ">200kg more than last week </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 w-[213px] p-6 rounded-xl border-[2px] border-[#B0BEC5] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]  bg-white">
          <h3 className="capitalize text-[24px] font-normal ">plastic </h3>
          <img src={glass} alt="glass" loading="lazy" />
          <h3 className="text-[p28x] font-bold ">500 kg</h3>
          <p className="text-[12px] font-normal ">200kg more than last week </p>
        </div>
      </div>
    </div>
  );
};
export default Overview;
