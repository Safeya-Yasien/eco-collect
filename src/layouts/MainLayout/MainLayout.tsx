import Menu from "@/components/menu/Menu";
import { ScrollToTop } from "@/components/shared";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className=" flex bg-[#F5F5F5] overflow-x-hidden min-h-[100dvh]">
      <ScrollToTop />
      {/* menu bar */}
      <div className="w-[100px] md:w-[340px] ">
        <Menu />
      </div>
      {/* content */}
      <div className="w-[calc(100%-100px)] md:w-[calc(100%-340px)] bg-[#F5F5F5] p-4 pt-16 pb-[85px]">
        {/* weekly overview */}
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
