"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { mainTheme } from "../theme/mainTheme";
import { Toaster } from "react-hot-toast";
import NextJsTopLoader from "../components/NextTopLoader/NextTopLoader";
export default function Providers({ children }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>

      <NextJsTopLoader />

      <Toaster />
    </AntdRegistry>
  );
}
