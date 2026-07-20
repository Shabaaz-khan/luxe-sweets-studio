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

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string()
      .trim()
      .email("Enter a valid email"),

    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid phone number"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

function RegisterPage() {
  const navigate = useNavigate();

  const { register: registerCustomer } = useCustomerAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterForm) => {
    const result = await registerCustomer(
      values.name.trim(),
      values.email.trim().toLowerCase(),
      values.phone.trim(),
      values.password
    );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

toast.success("Account created successfully");

const returnUrl = sessionStorage.getItem("checkout-return");

if (returnUrl) {
  sessionStorage.removeItem("checkout-return");

  navigate({
    to: returnUrl as any,
  });

  return;
}

navigate({
  to: "/",
});
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
                  Create Account
                </h1>

                <p className="text-muted-foreground mt-2">
                  Join Saatvik Sweets & Savouries
                </p>

              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >

                <div>
                  <Label>Full Name</Label>

                  <Input
                    placeholder="Enter your full name"
                    {...register("name")}
                  />

                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

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
                  <Label>Phone Number</Label>

                  <Input
                    placeholder="9876543210"
                    {...register("phone")}
                  />

                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Password</Label>

                  <div className="relative">

                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
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

                <div>
                  <Label>Confirm Password</Label>

                  <div className="relative">

                    <Input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center text-sm">
                  Already have an account?{" "}

                  <Link
                    to="/auth/login"
                    className="text-primary font-medium hover:underline"
                  >
                    Login
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