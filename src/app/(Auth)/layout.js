import React from "react";
import image from "@/assets/images/login-side.png";
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <main className="h-screen w-full">
      <div className="flex items-center">
        <Image
          src={image}
          alt="Login side"
          width={1000}
          height={1000}
          className="max-w-full w-auto h-screen"
        />
        <div className="w-full bg-primary-black h-screen">{children}</div>
      </div>
    </main>
  );
}
