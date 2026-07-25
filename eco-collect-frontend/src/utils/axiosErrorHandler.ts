import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    const responseData = error.response?.data;
    return {
      message: responseData?.message || "Something went wrong",
      errors: responseData?.errors || {},
    };
  } else {
    return {
      message: "Something went wrong",
      errors: {},
    };
  }
};

export default axiosErrorHandler;
