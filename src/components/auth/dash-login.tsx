"use client";

import { LoginSchema, loginSchema } from "@/app/schemas/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../ui";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { useAuth, getDashboardRoute } from "@/providers/auth-provider";
import type { LoginResponse } from "@/types/shared";

interface DashLoginProps {
  onForgotPassword: () => void;
}

export const DashLogin = ({ onForgotPassword }: DashLoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPendingActivation, setIsPendingActivation] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    setIsPendingActivation(false);
    try {
      const result = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: { email: data.email, password: data.password },
      });

      login(result);
      toast.success("Logged in successfully");

      const dashboardRoute = getDashboardRoute(result.user);
      router.push(dashboardRoute);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
      
      if (message.includes("pending activation")) {
        setIsPendingActivation(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendActivation = async () => {
    const email = form.getValues("email");
    if (!email) return;

    setIsLoading(true);
    try {
      await apiRequest("/auth/resend-activation", {
        method: "POST",
        body: { email },
      });
      toast.success("Activation email resent. Please check your inbox.");
      setIsPendingActivation(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to resend activation email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="password"
                        disabled={isLoading}
                      />
                      <div onClick={togglePasswordVisibility}>
                        <Image
                          src="/eye-open.svg"
                          alt="show password"
                          width={30}
                          height={30}
                          className={`absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer ${
                            showPassword ? "hidden" : ""
                          }`}
                        />
                        <Image
                          src="/eye-closed.svg"
                          alt="hide password"
                          width={30}
                          height={30}
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
          </div>
          {/* <FormError message="" />
          <FormSuccess message="" /> */}
          <p
            className="mb-[0px] mb-[5px] cursor-pointer text-right text-sm text-[#2016a9] transition-all duration-200 hover:underline"
            onClick={onForgotPassword}
          >
            Forgot Password?
          </p>

          {isPendingActivation && (
            <div className="rounded-lg bg-orange-50 p-4 border border-orange-200 mt-4">
              <p className="text-sm text-orange-800 mb-3 text-center">
                Your account is not activated yet.
              </p>
              <Button
                type="button"
                className="w-full cursor-pointer rounded-xl flex items-center justify-center gap-2 bg-orange-600 text-white hover:bg-orange-700"
                onClick={handleResendActivation}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Resend Activation Email"}
              </Button>
            </div>
          )}

          <Button
            className="w-full cursor-pointer rounded-xl flex items-center justify-center gap-2 bg-[#2016a9] text-white hover:bg-blue-600"
            type="submit"
            disabled={isLoading || isPendingActivation}
          >
            {isLoading && !isPendingActivation ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </Form>
    </>
  );
};
