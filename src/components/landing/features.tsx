import Image from "next/image";
import { TrendingDown, ShieldCheck, Layers, Users } from "lucide-react";

export const FeaturesList = () => {
  const features = [
    { icon: TrendingDown, text: "Cuts click rates within weeks" },
    { icon: ShieldCheck, text: "Sandbox-only, nothing ever leaves the app" },
    { icon: Layers, text: "Progressive difficulty tiers" },
    { icon: Users, text: "Works for teams and individuals alike" },
  ];

  return (
    <div className="rounded-lg py-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <feature.icon className="h-5 w-5 flex-shrink-0 text-[#2b1ec9]" />
            <span className="font-medium text-gray-700">
              {features[index].text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
