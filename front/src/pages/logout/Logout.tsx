import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/feedback";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(logout());
      navigate("/login", { replace: true });
    }, 800);
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return <Spinner />;
};
export default Logout;
