import { Link, NavLink } from "react-router-dom";
import logo from "/src/assets/ecoCollect.svg";
import { cn } from "@/lib/utils";

import { BsFillGridFill } from "react-icons/bs";
import { BiTransferAlt } from "react-icons/bi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { TbPresentationAnalyticsFilled } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";

// Menu items.
const primaryMenuItems = [
  {
    title: "Overview",
    url: "/",
    icon: <BsFillGridFill />,
  },
  {
    title: "Waste Transactions",
    url: "waste-transactions",

    icon: <BiTransferAlt />,
  },
  {
    title: "Collectors",
    url: "collectors",
    icon: <BsFillBoxSeamFill />,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: <HiUsers />,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: <TbPresentationAnalyticsFilled />,
  },
];

const userMenuItems = [
  {
    title: "Logout",
    url: "/logout",
    icon: <IoLogOut />,
  },
];

const Menu = () => {
  return (
    <aside className="bg-[#B0BEC5] md:rounded-tr-[74px] md:rounded-br-[74px] flex flex-col py-[75px] fixed left-0 top-0 h-screen overflow-y-auto scrollbar-hide">
      {/* Logo */}
      <Link
        to="/"
        aria-label="home"
        className="flex flex-col items-center justify-center pb-[40px] "
      >
        <div className="w-[80px] md:w-[200px] h-[58px]">
          <img
            src={logo}
            alt="EcoCollect logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="h-[1px] bg-[#F5F5F5] w-full mt-10" />
      </Link>

      {/* Menu */}
      <div className="flex-1 flex flex-col px-[22px] ">
        <ul className="flex w-full flex-col mb-[120px]">
          {primaryMenuItems.map((item, index) => (
            <li key={index} className="relative">
              <NavLink
                to={item.url}
                end
                className={({ isActive }) =>
                  cn(
                    "text-black text-2xl font-normal capitalize px-4 py-6 flex items-center gap-[4px]",
                    "hover:bg-transparent",
                    isActive ? "border-l-4 rounded-l-[10px]" : ""
                  )
                }
              >
                <span className="">{item.icon}</span>
                <span className="hidden md:flex">{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="h-[1px] bg-[#F5F5F5] w-full" />

        <ul className="flex w-full flex-col mt-[22px] ">
          {userMenuItems.map((item, index) => (
            <li key={index} className="relative">
              <NavLink
                to={item.url}
                end
                className={({ isActive }) =>
                  cn(
                    "text-black text-2xl font-normal capitalize px-4 py-6 flex items-center gap-[4px]",
                    "hover:bg-transparent",
                    isActive ? "border-l-4 rounded-l-[10px]" : ""
                  )
                }
              >
                <span className="">{item.icon}</span>
                <span className="hidden md:flex"> {item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Menu;
