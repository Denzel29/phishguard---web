"use client";

import { LoginSchema, loginSchema } from "@/app/schemas/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

export const DashLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    setIsLoading(true);
    try {
      // const response = await axios.post("/api/login", data);
      console.log(data);
    } catch (error) {
      console.log(error);
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
                          width={20}
                          height={20}
                          className={`absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer ${
                            showPassword ? "hidden" : ""
                          }`}
                        />
                        <Image
                          src="/eye-close.svg"
                          alt="hide password"
                          width={20}
                          height={20}
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
            className="mb-[0px] mb-[5px] cursor-pointer text-right text-sm text-orange-500 transition-all duration-200 hover:underline"
            onClick={() => {
              // const params = new URLSearchParams({
              //   profile: profile ? String(profile) : "",
              // });
              // router.push(`auth/forgot-password?${params}` as never);
            }}
          >
            Forgot Password?
          </p>
          <Button className="w-full cursor-pointer rounded-xl" type="submit">
            Sign In
          </Button>
        </form>
      </Form>
    </>
  );
};
