"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type LoginFormInputs = {
  email: string;
  password: string;
  remember?: boolean;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { toast } = useToast();

  const router = useRouter();

  const onSubmit = (data: LoginFormInputs) => {
    const { email, password, remember } = data;

    // Example logic:
    if (remember) {
      localStorage.setItem("rememberedEmail", email);
    }

    // Mock login call
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.ok) {
        router.push("/admin/product");
        reset({
          email: "",
          password: "",
        });
        console.log("Redirect or show success");
      } else {
        toast({
          title: "Error!",
          description: "Failed to Login. Please try again.",
          variant: "destructive",
        });
        console.log("this is an error");
        // Show error
      }
    });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Admin page
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:border-gray-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:border-gray-400"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("remember")}
                className="form-checkbox text-blue-500"
              />
              Remember me
            </label>
            <a href="#" className="text-gray-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        {/* <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="#" className="text-blue-600 hover:underline">Register</a>
        </p> */}
      </div>
    </div>
  );
}
