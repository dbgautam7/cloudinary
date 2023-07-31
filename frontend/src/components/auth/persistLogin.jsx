import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  initialAuthState,
  useAuthContext,
} from "../../components/context/authContext";
import { useToken } from "../../components/hooks/useToken";
import { message } from "antd";
import { ShimmerBadge } from "react-shimmer-effects";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refreshTokenFn = useToken();
  const { auth, setAuth } = useAuthContext();
  const [cookies, _setCookie, removeCookie] = useCookies(["refreshToken"]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refreshTokenFn();
      } catch (error) {
        message.error("Session Expired!");
        setAuth(initialAuthState);
        removeCookie("refreshToken");
        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && cookies.refreshToken
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [refreshTokenFn, auth, cookies?.refreshToken]);

  return isLoading ? (
    <div>
      <ShimmerBadge />
    </div>
  ) : (
    <Outlet />
  );
};

export default PersistLogin;
