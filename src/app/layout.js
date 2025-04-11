import { Urbanist } from "next/font/google";
import "./globals.css";
import Providers from "../lib/Providers";
import { ToastContainer } from "react-toastify";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "TAILSDATE",
    template: "%s | TAILSDATE",
  },
  description: "TAILSDATE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={`${urbanist.className} box-border antialiased`}>
        <Providers>{children}</Providers>
        <ToastContainer
          position="top-right"
          autoClose={1800}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
