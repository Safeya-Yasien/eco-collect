import { Link, Outlet, useLocation } from "react-router-dom";
import { SlashIcon } from "lucide-react";

import { CustomHeading } from "@/components/shared";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbMap: Record<string, string> = {
  "/settings": "Settings",
  "/settings/faq": "FAQ",
  "/settings/terms": "Terms",
};

const SettingsLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  const segments = location.pathname.split("/").filter(Boolean);
  const pageName = breadcrumbMap[path] || "Settings";

  return (
    <div className="">
      <CustomHeading title={pageName} />

      {/* Show breadcrumb only if not on /settings */}
      {segments.length > 1 && (
        <Breadcrumb className="mb-8 -mt-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/settings">Settings</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{breadcrumbMap[path]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      {/* content */}
      <div className="w-full md:w-[60%]">
        <Outlet />
      </div>
    </div>
  );
};
export default SettingsLayout;
