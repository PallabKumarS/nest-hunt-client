"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { PasswordInput } from "../ui/password-input";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/services/AuthService";
import { useAppDispatch } from "@/redux/hook";
import { getMe } from "@/services/UserService";
import { Loader2 } from "lucide-react";
import { login } from "@/redux/features/authSlice";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { isSubmitting },
  } = useForm();

  // Demo credentials
  const demoCredentials = {
    admin: {
      email: "admin@admin.com",
      password: "@admin",
    },
    user: {
      email: "pallabkumar26@gmail.com",
      password: "Pallab",
    },
  };

  const fillDemoCredentials = async (type: "admin" | "user") => {
    const credentials = demoCredentials[type];
    form.setValue("email", credentials.email);
    form.setValue("password", credentials.password);
    toast.info(
      `${type.charAt(0).toUpperCase() + type.slice(1)} credentials filled`
    );

    await form.handleSubmit(onSubmit)();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("logging in...");
    try {
      const res = await loginUser(values);
      if (res?.success) {
        const user = await getMe();
        if (user?.success) {
          dispatch(login(user?.data));
        } else {
          toast.error(user?.message, { id: toastId });
        }
        toast.success(res?.message, { id: toastId });
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          router.push("/dashboard/profile");
        }
      } else {
        toast.error(res?.message, { id: toastId });
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        {/* Demo Credentials Section */}
        <div className="bg-muted/50 p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">
            Quick Login (Demo Credentials)
          </h3>
          <div className="flex gap-3 flex-wrap">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fillDemoCredentials("admin")}
              className="flex-1 min-w-[120px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Login as Admin"
              )}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fillDemoCredentials("user")}
              className="flex-1 min-w-[120px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Login as User"
              )}
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  {...field}
                  value={field.value || ""}
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"outline"}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
}
