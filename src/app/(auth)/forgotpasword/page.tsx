"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"; // For displaying notifications
import { useRouter } from "next/navigation"; // For navigation after successful password reset

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting the default way

    if (!email || !newPassword) {
      toast({
        title: "Error",
        description: "Email and new password are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/forgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: "Error",
          description: result.message || "Something went wrong",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: result.message || "Your password has been updated.",
      });

      router.push("/sign-in"); // Redirect to sign-in page after password reset
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Forgot Password
          </h1>
          <p className="mb-4">Reset your password to regain access</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full"
              required
            />
          </div>
          <Button className="w-full" type="submit">
            Reset Password
          </Button>
        </form>
        <div className="text-center mt-4">
          <p>
            Remember your password?{" "}
            <a href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
