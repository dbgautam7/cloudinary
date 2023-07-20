import { message } from "antd";
import useAxiosPrivate from "../../components/hooks/useAxiosPrivate";
import { useAuthContext } from "../../components/context/authContext";
import Cookies from "universal-cookie";

const useHandleLogout = () => {
  const backendApi = useAxiosPrivate();
  const { setAuth } = useAuthContext();
  const cookie = new Cookies();
  const logout = async () => {
    setAuth({});
    cookie.remove("refreshToken");
    cookie.remove("userDetails");
    try {
      const response = await backendApi.post("api/v1/auth/logout/");
      const result = response.data;
      console.log(result, "result");
      if (result.errors?.error) {
        message.error(result.errors.error, [2]);
      } else {
        message.success("Logout Successfully", [2]);
      }
    } catch (error) {
      message.error(JSON.stringify(error), [2]);
    }
  };
  return logout;
};

export default useHandleLogout;
