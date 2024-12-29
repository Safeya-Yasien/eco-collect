import Menu from "@/components/menu/Menu";
import { SidebarProvider } from "@/components/ui/sidebar";

import tons from "/src/assets/undraw_order_delivered_re_v4ab 1.svg";

const MainLayout = () => {
  return (
    <div className="h-screen overflow-hidden flex bg-[#F5F5F5]">
      {/* menu bar */}
      <SidebarProvider>
        <Menu />
      </SidebarProvider>
      {/* </div> */}
      {/* content */}
      <div className="w-[calc(100% - 355px)] bg-[#F5F5F5] p-4 pt-16">
        {/* weekly overview */}
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
              <p className="text-[20px] font-normal ">
                200kg more than last week
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-[335px] h-[385px] p-6 gap-[38px] rounded-[12px] border-[2px] border-[#B0BEC5] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] ">
              <h3 className="capitalize text-[28px] font-normal ">
                total waste collected
              </h3>
              <img src={tons} alt="tons" loading="lazy" />
              <h3 className="text-[32px] font-bold ">2 Tons</h3>
              <p className="text-[20px] font-normal ">
                200kg more than last week
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-[335px] h-[385px] p-6 gap-[38px] rounded-[12px] border-[2px] border-[#B0BEC5] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] ">
              <h3 className="capitalize text-[28px] font-normal ">
                total waste collected
              </h3>
              <img src={tons} alt="tons" loading="lazy" />
              <h3 className="text-[32px] font-bold ">2 Tons</h3>
              <p className="text-[20px] font-normal ">
                200kg more than last week
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-[335px] h-[385px] p-6 gap-[38px] rounded-[12px] border-[2px] border-[#B0BEC5] bg-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] ">
              <h3 className="capitalize text-[28px] font-normal ">
                total waste collected
              </h3>
              <img src={tons} alt="tons" loading="lazy" />
              <h3 className="text-[32px] font-bold ">2 Tons</h3>
              <p className="text-[20px] font-normal ">
                200kg more than last week
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainLayout;
