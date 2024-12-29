import Menu from "@/components/menu/Menu";
import { SidebarProvider } from "@/components/ui/sidebar";

const MainLayout = () => {
  return (
    <div className="h-screen overflow-hidden flex bg-[#F5F5F5]">
      {/* menu bar */}
      <SidebarProvider>
        <Menu />
      </SidebarProvider>
      {/* </div> */}
      {/* content */}
      <div className="w-[80%] bg-[#F5F5F5]">content</div>
    </div>
  );
};
export default MainLayout;
