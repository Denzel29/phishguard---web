"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/api";
import { Button, Input } from "@/components/ui";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui";
import Image from "next/image";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  if (!token) {
    return (
      <Card className="p-8 text-center shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid Link</h2>
        <p className="text-gray-600 mb-6">
          This password reset link is invalid or missing the required token.
        </p>
        <Link href="/login" className="w-full">
          <Button className="w-full bg-[#2016a9] text-white hover:bg-blue-700">
            Return to Login
          </Button>
        </Link>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className="p-8 text-center shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center gap-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900">Password Reset!</h2>
          <p className="text-gray-600 mb-4">
            Your password has been changed successfully. You can now log in with your new password.
          </p>
          <Link href="/login" className="w-full">
            <Button className="w-full bg-[#2016a9] text-white hover:bg-blue-700">
              Go to Login
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  const onSubmit = async (data: ResetPasswordSchema) => {
    setIsLoading(true);
    try {
      await apiRequest("/auth/reset-password", {
        method: "POST",
        body: { token, newPassword: data.password },
      });
      setIsSuccess(true);
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 shadow-lg w-full max-w-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose a new password</h2>
        <p className="text-sm text-gray-600 mt-1">Make sure it&apos;s at least 8 characters.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  New Password<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      disabled={isLoading}
                    />
                    <div onClick={togglePasswordVisibility}>
                      <Image
                        src="/eye-open.svg"
                        alt="show password"
                        width={24}
                        height={24}
                        className={`absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer ${
                          showPassword ? "hidden" : ""
                        }`}
                      />
                      <Image
                        src="/eye-closed.svg"
                        alt="hide password"
                        width={24}
                        height={24}
                        className={`absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer ${
                          showPassword ? "" : "hidden"
                        }`}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Confirm Password<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                      disabled={isLoading}
                    />
                    <div onClick={toggleConfirmPasswordVisibility}>
                      <Image
                        src="/eye-open.svg"
                        alt="show password"
                        width={24}
                        height={24}
                        className={`absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer ${
                          showConfirmPassword ? "hidden" : ""
                        }`}
                      />
                      <Image
                        src="/eye-closed.svg"
                        alt="hide password"
                        width={24}
                        height={24}
                        className={`absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer ${
                          showConfirmPassword ? "" : "hidden"
                        }`}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full cursor-pointer rounded-xl flex items-center justify-center gap-2 bg-[#2016a9] text-white hover:bg-blue-600 mt-6"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Reset Password"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Suspense fallback={<Loader2 className="h-10 w-10 animate-spin text-[#2016a9]" />}>
        <ResetPasswordContent />
      </Suspense>
    </main>
  );
}
