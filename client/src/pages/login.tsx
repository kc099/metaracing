import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden" data-testid="page-login">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/hero-bg.png" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 racing-grid opacity-10" />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <a href="/" data-testid="link-back-home">
            <img src="/images/metaracing-logo.png" alt="MetaRacing" className="h-16 w-16 object-contain mb-3" />
          </a>
          <span className="font-racing text-2xl font-bold tracking-widest uppercase glow-red text-foreground">
            Meta<span className="text-primary">Racing</span>
          </span>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
        </div>

        <Card className="border-border/50" data-testid="login-card">
          <CardHeader className="pb-2">
            <h1 className="font-racing text-xl font-bold uppercase tracking-wide text-foreground">Welcome Back</h1>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest font-racing">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} data-testid="input-login-email" />
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
                      <FormLabel className="text-xs uppercase tracking-widest font-racing">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPw ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            data-testid="input-login-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPw(!showPw)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            data-testid="button-toggle-password"
                          >
                            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full font-racing uppercase tracking-widest"
                  disabled={loading}
                  data-testid="button-login-submit"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>

            <div className="mt-5 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="/register" className="text-primary underline underline-offset-2 font-medium" data-testid="link-to-register">
                  Create one
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center mt-4">
          <a href="/" className="text-xs text-muted-foreground" data-testid="link-back-home-bottom">
            &larr; Back to MetaRacing
          </a>
        </p>
      </div>
    </div>
  );
}
