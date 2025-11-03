"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../../schema/authSchema";
import FormWrapper from "../../../../components/Form/FormWrapper";
import UInput from "../../../../components/Form/UInput";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "antd";
import { useState } from "react";
import handleMutation from "../../../../utils/handleMutation";
import { useSignInMutation } from "../../../../redux/api/authApi";
import { useAppDispatch } from "../../../../redux/hooks/hooks";
import getUserByToken from "../../../../utils/getUserByToken";
import { toast } from "react-toastify";
import { setUser } from "../../../../redux/features/authSlice";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectUrl = params.get("redirect");
  const [remember, setRemember] = useState(false);
  const [login, { isLoading }] = useSignInMutation();
  const dispatch = useAppDispatch();

  const onLoginSuccess = (res) => {
    const accessToken = res.data?.accessToken;
    const user = getUserByToken(accessToken);

    if (user.role === "admin") {
      dispatch(setUser({ token: accessToken, user }));
      router.push(redirectUrl ? redirectUrl : "/admin/dashboard");
    } else {
      toast.warning("Only admin can login to the dashboard!", {
        autoClose: 6000,
      });
    }
  };

  const onLoginSubmit = async (data) => {
    data.is_remember = remember;
    data.fcm_token = "N/A"
    handleMutation(data, login, "Logging in...", onLoginSuccess);
  };

  const handleRemember = (e) => {
    setRemember(e.target.checked);
  };
  return (
    <div className="">
      <div className="w-[600px] mx-auto flex flex-col items-center justify-center h-screen">
        <h4 className="text-4xl font-semibold text-white text-center mb-4">
          Login
        </h4>
        <FormWrapper
          defaultValues={{
            email: "admin@gmail.com",
            password: "admin",
          }}
          onSubmit={onLoginSubmit}
          resolver={zodResolver(loginSchema)}
        >
          <div className="login-form">
            <UInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              size="large"
              className="!h-12"
            />
            <div className="mt-10">
              <UInput
                name="password"
                label="Password"
                type="password"
                placeholder="*************"
                size="large"
                className="!h-12 !mb-0"
              />
            </div>
            <div className="flex items-center justify-between gap-6 mt-10 text-base">
              <Checkbox className="text-base" size="" onChange={handleRemember}>
                Remember Me
              </Checkbox>
              <Link
                href="/forgot-password"
                className="text-primary-blue text-center block mt-2 font-medium hover:text-primary-blue/85"
              >
                I forgot my password
              </Link>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="text-base bg-primary-red border border-primary-red text-white rounded-lg py-3 px-5 mt-5 w-full font-semibold"
            >
              Login
            </button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
}
