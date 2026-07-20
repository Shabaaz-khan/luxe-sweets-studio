import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useCustomerAuth } from "@/context/CustomerAuthContext";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useCustomerAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginForm) => {
    try {
const result = await login(
  values.email.trim().toLowerCase(),
  values.password
);

if (!result.success) {
  toast.error(result.message);
  return;
}

toast.success("Login Successful");

const returnUrl = sessionStorage.getItem("checkout-return");

if (returnUrl) {
  sessionStorage.removeItem("checkout-return");

  navigate({
    to: returnUrl as any,
  });

  return;
}

navigate({
  to: "/account",
});

    //   toast.success("Login successful");

    //   navigate({
    //     to: "/",
    //   });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <>
      <Nav />

      <main className="min-h-screen pt-36 pb-20 px-5">
        <div className="mx-auto max-w-md">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">
                  Welcome Back
                </h1>

                <p className="text-muted-foreground mt-2">
                  Login to your Saatvik account
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div>
                  <Label>Email</Label>

                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                  />

                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Password</Label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...register("password")}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="text-primary font-medium hover:underline"
                  >
                    Register
                  </Link>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}