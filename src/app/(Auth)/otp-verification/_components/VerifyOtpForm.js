"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../../schema/authSchema";
import FormWrapper from "../../../../components/Form/FormWrapper";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import UOtpInput from "../../../../components/Form/UOtpInput";

export default function VerifyOtpForm() {
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
      <div className="w-[500px] mx-auto flex flex-col justify-center h-screen">
        <h4 className="text-4xl font-semibold text-white text-center mb-10">
          Verify Code
        </h4>
        <FormWrapper
          onSubmit={onLoginSubmit}
          resolver={zodResolver(loginSchema)}
        >
          <div className="otp-form">
            <div className="w-full mx-auto text-center">
              <UOtpInput className={"w-full"} name="otp" />
            </div>
            <button
              type="submit"
              className="text-base bg-primary-red border border-primary-red text-white rounded-lg py-3 px-5 mt-5 w-full font-semibold"
            >
              Verify
            </button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
}
