"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { Card, Button } from "@/components/ui";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

function ActivateContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No activation token provided.");
      return;
    }

    const activate = async () => {
      try {
        const response = await apiRequest<{ message: string }>("/auth/activate", {
          method: "POST",
          body: { token },
        });
        setStatus("success");
        setMessage(response.message || "Account activated successfully!");
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Failed to activate account.");
      }
    };

    activate();
  }, [token]);

  return (
    <Card className="p-8 text-center shadow-lg w-full max-w-md">
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <Loader2 className="h-12 w-12 animate-spin text-[#2016a9]" />
          <h2 className="text-xl font-semibold text-gray-900">Activating Account</h2>
          <p className="text-gray-500">Please wait while we verify your token...</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4 py-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900">Account Activated</h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <Link href="/login" className="w-full">
            <Button className="w-full bg-[#2016a9] text-white hover:bg-blue-700">
              Go to Login
            </Button>
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 py-4">
          <XCircle className="h-16 w-16 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900">Activation Failed</h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <Link href="/login" className="w-full">
            <Button className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200" variant="ghost">
              Return to Login
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
}

export default function ActivatePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Suspense fallback={<Loader2 className="h-10 w-10 animate-spin text-[#2016a9]" />}>
        <ActivateContent />
      </Suspense>
    </main>
  );
}
