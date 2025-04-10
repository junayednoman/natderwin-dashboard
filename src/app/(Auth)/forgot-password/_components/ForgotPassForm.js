"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../../schema/authSchema";
import FormWrapper from "../../../../components/Form/FormWrapper";
import UInput from "../../../../components/Form/UInput";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function ForgotPassword() {
  const router = useRouter();

  const onLoginSubmit = (data) => {
    console.log(data);

    router.push("/admin/dashboard");
  };

  return (
    <div className="relative">
      <div className="text-white text-lg font-semibold flex items-center gap-2 absolute top-12 left-20">
        <Link
          className="flex items-center gap-2 justify-start text-left"
          href={"/login"}
        >
          <MoveLeft />
          Back to login
        </Link>
      </div>
      <div className="w-[600px] mx-auto flex flex-col justify-center h-screen">
        <h4 className="text-4xl font-semibold text-white text-center mb-5">
          Forgot Password
        </h4>
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
            <button
              type="submit"
              className="text-base bg-primary-red border border-primary-red text-white rounded-lg py-3 px-5 mt-5 w-full font-semibold"
            >
              Send Code
            </button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
}
