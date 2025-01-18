"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useRouter } from "next/navigation";
import { Checkbox } from "antd";

export default function LoginForm() {
  const router = useRouter();

  const onLoginSubmit = (data) => {
    console.log(data);

    router.push("/admin/dashboard");
  };

  const handleRemember = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="">
      <div className="w-[600px] mx-auto flex flex-col items-center justify-center h-screen">
        <h4 className="text-4xl font-semibold text-white text-center mb-4">Login</h4>
        <FormWrapper
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
            <UInput
              name="password"
              label="Password"
              type="password"
              placeholder="*************"
              size="large"
              className="!h-12 !mb-0"
            />
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
