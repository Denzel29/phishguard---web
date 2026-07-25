import Link from "next/link";
import { Card } from "@/components/ui";
import { VideoShowcase } from "@/components/video-showcase";
import { Suspense } from "react";
import { HomePage } from "@/components/landing/home-page";

export default function Home() {
  return (
    <Suspense>
      <HomePage></HomePage>;
    </Suspense>
  );
}
