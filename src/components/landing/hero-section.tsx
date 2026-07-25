import { UserType } from "@/types/shared";
import { FeaturesGrid } from "./features-grid";
import { VideoShowcase } from "../video-showcase";
import { FeaturesList } from "./features";
import AuthPage from "../auth/auth-page";

type HeroSectionProps = {
  userType: UserType;
};

export const HeroSection = ({ userType }: HeroSectionProps) => {
  return (
    <div className="lg:flex lg:space-x-20">
      <div className="lg:w-2/4">
        <h2 className="mb-4 text-4xl font-bold tracking-wide lg:text-6xl">
          Learn to spot the <span className="text-orange-500">Hook</span> before
          it's too late
        </h2>
        <p className="mb-2 text-lg tracking-wide text-gray-500 md:text-xl">
          Realistic phishing simulations that run entirely in a sandbox, no real
          emails ever leave this app, whether you&apos;re training a whole org
          or just yourself.
        </p>

        <FeaturesList />

        <FeaturesGrid length={4} lgGrid={2} />
      </div>

      <div className="lg:w-2/4">
        <AuthPage profile={userType} />
      </div>
    </div>
  );
};
