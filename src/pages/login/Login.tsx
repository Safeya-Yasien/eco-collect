import { Link } from "react-router-dom";

import logo from "@assets/ecoCollect.svg";

const Login = () => {
  return (
    <div className="relative bg-[#f5f5f5] h-screen overflow-hidden">
      {/* logo */}
      <div className="flex items-center justify-center text-center pt-28">
        <img src={logo} alt="ecoCollect" />
      </div>

      {/* wave */}
      <div className="absolute inset-0 top-32 w-full h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1440"
          height="897"
          viewBox="0 0 1440 897"
          fill="none"
          className="w-full "
        >
          <path
            d="M1595 579.157C1595 917.069 1196.53 1191 704.997 1191C213.461 1191 -185.008 901.652 -185.008 563.741C-185.008 225.829 -300.044 480.876 704.996 102.208C1460.34 -203.232 1595 241.245 1595 579.157Z"
            fill="#B0BEC5"
          />
        </svg>
      </div>

      {/* form */}
      <div className="absolute left-1/2 bottom-[40%] transform -translate-x-1/2 translate-y-1/2 z-10">
        <h1 className="text-center text-lg sm:text-[32px] font-bold capitalize mb-16">
          Welcome to EcoCollect!
        </h1>
        <form className="">
          <div className="flex flex-col gap-[22px]">
            {/* email */}
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="email"
                className="capitalize text-[16px] font-normal"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g. example@gmail.com"
                className="border border-[#2E7D32] rounded-[8px] py-[5px] px-3 h-[48px] outline-none"
              />
            </div>

            {/* password */}
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="password"
                className="capitalize text-[16px] font-normal"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password..."
                className="border border-[#2E7D32] rounded-[8px] py-[5px] px-3 h-[48px] outline-none"
              />
              <Link to="/" className="text-xs text-[#2E7D32] text-right">
                Forgot Password?
              </Link>
            </div>

            {/* stay logged in checkbox */}
            <div className="flex items-center gap-[6px]">
              <input
                type="checkbox"
                id="stayLoggedIn"
                className="w-6 h-6 border-[1px] border-[#2E7D32] rounded-sm bg-white 
             appearance-none checked:bg-[#2E7D32] checked:border-[#2E7D32] 
             focus:outline-none focus:ring-0 hover:border-[#2E7D32]"
              />
              <label
                htmlFor="stayLoggedIn"
                className="text-[16px] font-normal text-[#1B212F]"
              >
                Stay logged in
              </label>
            </div>
          </div>

          {/* login button */}
          <button
            type="submit"
            className="w-[240px] h-[46px] flex items-center justify-center rounded-[8px] bg-[#2E7D32] text-white font-bold text-[16px] capitalize mt-[62px] mx-auto"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
