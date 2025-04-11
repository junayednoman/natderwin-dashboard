"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { mainTheme } from "../theme/mainTheme";
import { Toaster } from "react-hot-toast";
import NextJsTopLoader from "../components/NextTopLoader/NextTopLoader";
import { Provider } from "react-redux";
import { store } from "../app/store";
export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AntdRegistry>
        <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>
        <NextJsTopLoader />
        <Toaster />
      </AntdRegistry>
    </Provider>
  );
}
