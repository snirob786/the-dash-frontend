"use client";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 ${montserrat.className}`}
    >
      <div className="w-full h-full">
        <h2 className="font-extrabold text-[28px]">The Dash</h2>
        <Button variant="outline">Button</Button>
      </div>
    </main>
  );
}
