import axios from "../utils/axios";
import { useAuthContext } from "../context/authContext";
import { useCookies } from "react-cookie";
import { decryptedData } from "../utils/crypto";

export const useToken = () => {
  const { setAuth } = useAuthContext();
  const [cookies] = useCookies(["refreshToken"]);
  const refreshTokenFn = async () => {
    const response = await axios.post("auth/v1/token/access/", {
      refresh: decryptedData(cookies?.refreshToken),
    });
    setAuth((prev) => ({
      ...prev,
      accessToken: response?.data?.data?.access,
    }));
    return response?.data?.data?.access;
  };
  return refreshTokenFn;
};
