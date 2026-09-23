"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui";
import { DashLogin } from "./dash-login";
import { Registration } from "./registration";

export const LoginForm = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <>
      <section className="space-y-6">
        <div>
          <h2 className="mb-1 flex items-center justify-center space-x-2 text-center text-2xl font-bold">
            <Image
              src="/logo-mini.png"
              alt="Baitline Logo"
              width={26}
              height={26}
              className="text-blue-500"
            />
            <span className="text-[#2016a9]">Baitline</span>
          </h2>
          <p className="text-lg tracking-wide text-[#6D7580]">
            Access your Baitline dashboard
          </p>
        </div>

        <div className="mx-auto flex w-full space-x-1 bg-gray-200 p-1 rounded-md pr-2">
          <Button
            type="button"
            variant="ghost"
            className={`w-1/2 cursor-pointer rounded-md py-1 ${
              activeTab === "login"
                ? "border border-gray-300 bg-white font-bold text-gray-900 shadow-sm hover:bg-white hover:text-gray-900"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </Button>

          <Button
            type="button"
            variant="ghost"
            className={`w-1/2 cursor-pointer rounded-md py-1 ${
              activeTab === "register"
                ? "border border-gray-300 bg-white font-bold text-gray-900 shadow-sm hover:bg-white hover:text-gray-900"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Sign Up
          </Button>
        </div>

        {activeTab === "login" ? <DashLogin /> : <Registration />}
      </section>
    </>
  );
};
