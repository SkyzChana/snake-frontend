"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // บังคับใช้ธีม light
  useEffect(() => {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <NextUIProvider>
      <main className="bg-gray-50 text-gray-900 min-h-screen">{children}</main>
    </NextUIProvider>
  );
}
