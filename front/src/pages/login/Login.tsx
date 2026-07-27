import { Link, useNavigate } from "react-router-dom";
import logo from "@assets/ecoCollect.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import actAuthLogin from "@/store/auth/act/actAuthLogin";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { Spinner } from "@/components/feedback";
import { clearAuthError } from "@/store/auth/authSlice";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // Redirect if accessToken exists
  useEffect(() => {
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);

  const isMockMode = import.meta.env.VITE_ENABLE_MOCKS === "true";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: isMockMode
      ? {
          email: "demo@ecocollect.com",
          password: "demo1234",
        }
      : undefined,
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const fixedCredentials = {
      name: "Admin2 Name",
      email: data.email,
      password: data.password,
      phone: "12344256799",
      password_confirmation: "password1234",
    };

    const resultAction = await dispatch(actAuthLogin(fixedCredentials));
    if (actAuthLogin.fulfilled.match(resultAction)) {
      dispatch(clearAuthError());
      navigate("/");
    }
  };

  return (
    <div className="relative bg-[#f5f5f5] h-screen overflow-hidden">
      {loading === "pending" && <Spinner />}

      {/* logo */}
      <div className="flex items-center justify-center text-center pt-28">
        <img src={logo} alt="ecoCollect" />
      </div>

      {/* wave */}
      <div className="absolute inset-0 w-full h-full top-32">
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
        {isMockMode && (
          <div className="mb-6 mx-auto max-w-[320px] bg-[#E8F5E9] border border-[#2E7D32] rounded-[8px] px-4 py-3 text-center">
            <p className="text-sm font-semibold text-[#2E7D32]">🔑 Demo Mode</p>
            <p className="text-xs text-[#1B212F] mt-1">
              Credentials are pre-filled — just click "Log in" to explore the
              dashboard
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Show error if login fails */}
          {error?.message && (
            <p className="mb-4 font-medium text-center text-red-600">
              {error.message}
            </p>
          )}

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
                {...register("email")}
                type="email"
                id="email"
                placeholder="e.g. example@gmail.com"
                className="border border-[#2E7D32] rounded-[8px] py-[5px] px-3 h-[48px] outline-none"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
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
                {...register("password")}
                type="password"
                id="password"
                placeholder="Enter your password..."
                className="border border-[#2E7D32] rounded-[8px] py-[5px] px-3 h-[48px] outline-none"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <Link to="/" className="text-xs text-[#2E7D32] text-right">
                Forgot Password?
              </Link>
            </div>

            {/* stay logged in checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#2E7D32] w-5 h-5 cursor-pointer"
              />
              <span className="text-[16px] text-[#1B212F]">Stay logged in</span>
            </label>
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
