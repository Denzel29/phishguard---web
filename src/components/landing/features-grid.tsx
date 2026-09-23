import { MailWarning, Library, BarChart3, Lightbulb } from "lucide-react";

export const FeaturesGrid = ({
  length,
  lgGrid,
}: {
  length: number;
  lgGrid: number;
}) => {
  const features = [
    {
      icon: MailWarning,
      title: "Realistic Simulations",
      description:
        "Lures modeled on real phishing patterns, run entirely inside the sandbox",
    },
    {
      icon: Library,
      title: "Scenario Library",
      description:
        "A growing set of lures across every difficulty tier, from obvious to subtle",
    },
    {
      icon: BarChart3,
      title: "Risk Reporting",
      description:
        "See click rates and reporting rates by person, team, or organization",
    },
    {
      icon: Lightbulb,
      title: "In-the-Moment Lessons",
      description:
        "Whoever clicks sees exactly what they missed, right where they missed it",
    },
  ];

  return (
    <div className="rounded-lg py-4">
      <div
        className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-${lgGrid}`}
      >
        {Array.from({ length }).map((_, index) => {
          const feature = features[index % features.length];
          return (
            <div
              key={index}
              className="space-y-2 rounded-xl bg-white p-2 transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <feature.icon className="h-5 w-5 flex-shrink-0 text-[#2b1ec9]" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="ml-1 leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
