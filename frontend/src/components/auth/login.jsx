import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import AntdCheckbox from "../../components/UI/antdCheckbox";
import ForgotPassword from "./forgotPassword";
import InputFileld from "../../components/inputFiled/inputField";
import { useAuthMutation } from "../../components/hooks/useMutateData";
import { useAuthContext } from "../../components/context/authContext";
import { useCookies } from "react-cookie";
import { encryptData } from "../../components/utils/crypto";

const loginSchema = Yup.object().shape({
  identity: Yup.string()
    .required("Required")
    .min(5, "Too Short!")
    .max(50, "Must be 50 characters or less"),

  password: Yup.string()
    .required("Required")
    .min(5, "Too Short!")
    .max(50, "Too Long!"),
});

const Login = () => {
  const { setAuth } = useAuthContext();
  const authMutation = useAuthMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  console.log(from, "from login");
  const setCookie = useCookies()[1];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmitHandler = async (data) => {
    try {
      const result = await authMutation.mutateAsync(["post", "", data]);
      if (result?.success) {
        message.success("Login Successfully", [2]);
        setAuth({
          accessToken: result?.data?.access,
          user: { ...result?.data?.user },
        });
        setCookie("refreshToken", encryptData(result?.data?.refresh), {
          path: "/",
        });
        setCookie("userDetails", encryptData({ ...result?.data?.user }), {
          path: "/",
        });
        reset();
        navigate(from, { replace: true });
      } else {
        message.error(result?.response?.data?.errors?.error.toString(), [2]);
      }
    } catch (error) {
      let errorMessage = error?.response?.data?.errors?.error
        ? error?.response?.data?.errors?.error?.toString()
        : error?.message?.toString();
      message.error(errorMessage, [2]);
    }
  };

  return (
    <div className="sm:bg-white w-full h-full flex flex-col sm:gap-16  sm:px-6 sm:py-16">
      <div className="hidden sm:block px-4  ">
        <ImArrowLeft2 />
      </div>
      <div className=" sm:w-full items-center justify-center flex flex-col sm:gap-16">
        <div className="flex-col bg-white sm:w-full px-4 py-8 sm:py-0 rounded-lg sm:border-none space-y-6 sm:space-y-16">
          <div className="text-2xl sm:text-5xl font-bold">
            Login to your <span className="block sm:mt-1">Account</span>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="flex flex-col space-y-4 sm:space-y-4 w-72"
            >
              <div className="rounded-md">
                <InputFileld
                  {...register("identity")}
                  name="identity"
                  type="text"
                  placeholder="Your Identity"
                  prefixIcon={<MailOutlined />}
                />
                <p className="text-red text-sm">{errors?.identity?.message}</p>
              </div>
              <div className="rounded-md">
                <InputFileld
                  {...register("password")}
                  name="password"
                  type="password"
                  placeholder="Password"
                  prefixIcon={<LockOutlined />}
                />
                <p className="text-red text-sm">{errors?.password?.message}</p>
              </div>
              <div className="flex flex-row items-center justify-between space-x-6 py-[10px]">
                <AntdCheckbox />
                <Link to="/forgotPassword">
                  <ForgotPassword />
                </Link>
              </div>
              <button
                disabled={!isValid}
                type="submit"
                className={`flex justify-center items-center gap-2 rounded-full ${
                  isValid
                    ? "bg-blue-light text-white"
                    : "bg-gray-100 sm:bg-gray-dark text-neutral sm:text-white"
                }  sm:p-4 p-2 `}
              >
                Sign In <ImArrowRight2 />
              </button>
            </form>
          </div>
        </div>
        <div>
          <Divider orientation="center" plain>
            or continue with
          </Divider>
          <div className="flex flex-row items-center justify-center gap-8">
            <div className="px-6 py-1 sm:px-6 sm:py-4 border sm:rounded-2xl rounded-full border-zinc-300">
              <Link to="https://www.facebook.com/">
                <FaFacebook className="text-blue-500" size={24} />
              </Link>
            </div>
            <div className="px-6 py-1 sm:px-6 sm:py-4 border sm:rounded-2xl rounded-full border-zinc-300">
              <Link to="https://www.google.com/">
                <FcGoogle size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="my-4 text-center">
          <span className="text-black">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan ">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
