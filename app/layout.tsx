import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import { Suspense } from "react";
import Script from "next/script";

export const metadata = {
  title: "mathworkit - Building blocks for your Next.js project",
  description:
    "mathworkit is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  metadataBase: new URL("https://mathworkit.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="node_modules/iink-ts/dist/iink.min.js"></Script>
      <body className={cx(sfPro.variable, inter.variable)}>
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="px-8 py-32">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
