import { Link } from "react-router-dom";

import { FaBell, FaLink, FaUser } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoMdMan } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { ImExit } from "react-icons/im";
import { IoDocumentText } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";

const Settings = () => {
  return (
    <div>
      <h2 className="text-black text-[32px] font-bold capitalize mb-[40px]">
        settings
      </h2>

      <div className="w-full md:w-[60%] flex flex-col gap-[22px]">
        {/* user management */}
        <div className="">
          <h3 className="text-sm font-bold text-[#2E7D32] mb-[6px]">
            User Management
          </h3>

          <ul className="flex flex-col rounded-[8px] bg-[#B0BEC5] ">
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px] border-b border-b-[#2E7D32]">
              <div className="flex items-center gap-2">
                <span>
                  <FaUser />
                </span>
                Collectors
              </div>
              <Link to={"/collectors"}>
                <FiEdit className="" />
              </Link>
            </li>
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px] border-b border-b-[#2E7D32]">
              <div className="flex items-center gap-2">
                <span>
                  <FaUser />
                </span>
                Customers
              </div>
              <Link to={"/customers"}>
                <FiEdit className="" />
              </Link>
            </li>
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px] border-b border-b-[#2E7D32]">
              <div className="flex items-center gap-2">
                <span>
                  <FaLink />
                </span>
                Linked Accounts
              </div>
            </li>
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px]">
              <div className="flex items-center gap-2">
                <span>
                  <IoKey />
                </span>
                Password Management
              </div>
            </li>
          </ul>
        </div>

        {/* App Settings */}
        <div className="">
          <h3 className="text-sm font-bold text-[#2E7D32] mb-[6px]">
            App Settings{" "}
          </h3>

          <ul className="flex flex-col rounded-[8px] bg-[#B0BEC5] ">
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px] border-b border-b-[#2E7D32]">
              <div className="flex items-center gap-2">
                <span>
                  <FaBell />
                </span>
                Notifications
              </div>
            </li>
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px] border-b border-b-[#2E7D32]">
              <div className="flex items-center gap-2">
                <span>
                  <AiOutlineGlobal />
                </span>
                Language
              </div>
            </li>
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px]">
              <div className="flex items-center gap-2">
                <span>
                  <IoMdMan />
                </span>
                Accessibility{" "}
              </div>
            </li>
          </ul>
        </div>

        {/* Privacy */}
        <div className="">
          <h3 className="text-sm font-bold text-[#2E7D32] mb-[6px]">
            Privacy{" "}
          </h3>

          <ul className="flex flex-col rounded-[8px] bg-[#B0BEC5] ">
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px] border-b border-b-[#2E7D32]">
              <div className="flex items-center gap-2">
                <span>
                  <FaLocationDot />
                </span>
                Location
              </div>
            </li>
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px]">
              <div className="flex items-center gap-2">
                <span>
                  <FaShieldAlt />
                </span>
                Privacy Policy
              </div>
            </li>
          </ul>
        </div>

        {/* Other */}
        <div className="">
          <h3 className="text-sm font-bold text-[#2E7D32] mb-[6px]">Other</h3>

          <ul className="flex flex-col rounded-[8px] bg-[#B0BEC5] ">
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px] border-b border-b-[#2E7D32]">
              <div className="flex items-center gap-2">
                <span>
                  <IoIosHelpCircle />
                </span>
                Help & FAQ
              </div>
            </li>
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px] border-b border-b-[#2E7D32]">
              <div className="flex items-center gap-2">
                <span>
                  <RiCustomerService2Fill />
                </span>
                Customer Support
              </div>
            </li>
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px] border-b border-b-[#2E7D32]">
              <div className="flex items-center gap-2">
                <span>
                  <IoDocumentText />
                </span>
                Terms & Conditions{" "}
              </div>
            </li>
            <li className="flex py-[5px] px-4 items-center justify-between text-[16px] font-semibold h-[48px]">
              <div className="flex items-center gap-2">
                <span>
                  <ImExit />
                </span>
                Log Out{" "}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Settings;
