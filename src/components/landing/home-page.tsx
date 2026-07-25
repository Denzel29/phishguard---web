"use client";

import { useState } from "react";
import { UserType } from "@/types/shared";
import { HorizontalNav } from "../nav-bar/hor-nav";
import { HeroSection } from "./hero-section";

export const HomePage = () => {
  const [userType, setUserType] = useState<UserType>(UserType.Individual);

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <HorizontalNav
          activeProfile={userType}
          onProfileChange={handleUserTypeChange}
        />
      </header>
      <section className="mx-auto my-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection userType={userType} />
        {/* <ChooseUsSection /> */}
      </section>
    </>
  );
};
