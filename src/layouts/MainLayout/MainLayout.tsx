import Menu from "@/components/menu/Menu";
import { SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className=" flex bg-[#F5F5F5] ">
      {/* menu bar */}
      <SidebarProvider>
        <Menu />
      </SidebarProvider>
      {/* </div> */}
      {/* content */}
      <div className="w-[calc(100%-355px)] bg-[#F5F5F5] p-4 pt-16">
        {/* weekly overview */}
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
