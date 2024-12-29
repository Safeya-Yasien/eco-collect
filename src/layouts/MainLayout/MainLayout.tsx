
import Menu from "@/components/menu/Menu";
import { SidebarProvider } from "@/components/ui/sidebar";

const MainLayout = () => {
  return (
    <div className="h-screen overflow-hidden flex bg-[#F5F5F5]">
      {/* menu bar */}
      {/* <div className="w-[20%] bg-[#B0BEC5] rounded-tr-[74px] rounded-br-[74px] p-6"> */}
        <SidebarProvider >
        
          <Menu />
        </SidebarProvider>
      {/* </div> */}
      {/* content */}
      <div className="w-[80%] bg-[#F5F5F5]">content</div>
    </div>
  );
};
export default MainLayout;
