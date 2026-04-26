"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Compass,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMockAuth } from "@/hooks/use-mock-auth";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/user";

const roleOptions: {
  value: UserRole;
  label: string;
  description: string;
  icon: typeof Compass;
  perks: string[];
}[] = [
  {
    value: "customer",
    label: "Tenant",
    description: "Browse and rent verified Nigerian homes.",
    icon: Compass,
    perks: ["Free forever", "KYC reuse", "Escrowed rent"],
  },
  {
    value: "landlord",
    label: "Landlord",
    description: "List your property with screening built in.",
    icon: Building2,
    perks: ["Tenant screening", "Digital leases", "₦15k/mo Pro"],
  },
  {
    value: "agent",
    label: "Agent",
    description: "Close deals, keep your commissions.",
    icon: KeyRound,
    perks: ["100% retention", "Pipeline tools", "Verified badge"],
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { signIn } = useMockAuth();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.email.includes("@")) next.email = "Enter a valid email.";
    if (form.phone.replace(/\D/g, "").length < 10)
      next.phone = "Enter a valid phone number.";
    if (form.password.length < 6)
      next.password = "Use at least 6 characters.";
    if (form.password !== form.confirmPassword)
      next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 750));
    signIn(role);
    setLoading(false);
    router.push("/verify-email");
  };

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
          Step {step} of 2 · {step === 1 ? "Choose role" : "Your details"}
        </p>
        <h1 className="font-display text-3xl italic leading-tight text-foreground sm:text-4xl">
          {step === 1 ? (
            <>
              How will you be using <span className="not-italic">SmoothRent?</span>
            </>
          ) : (
            <>
              A few details and <span className="not-italic">you’re in.</span>
            </>
          )}
        </h1>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] transition-colors",
                step >= s
                  ? "bg-emerald text-ivory"
                  : "border border-line bg-paper text-muted"
              )}
            >
              {step > s ? <Check className="h-3.5 w-3.5" /> : `0${s}`}
            </span>
            {s === 1 && (
              <span
                className={cn(
                  "h-px w-10 transition-colors",
                  step >= 2 ? "bg-emerald" : "bg-line"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <div className="space-y-3">
            {roleOptions.map((option) => {
              const active = role === option.value;
              const Icon = option.icon;
              return (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setRole(option.value)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                    active
                      ? "border-emerald bg-emerald text-ivory shadow-[0_18px_40px_-30px_rgba(12,31,23,0.6)]"
                      : "border-line bg-card hover:-translate-y-0.5 hover:border-emerald/40"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                      active
                        ? "bg-ivory text-emerald-deep"
                        : "bg-emerald text-ivory"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p
                      className={cn(
                        "font-display text-xl",
                        active ? "text-ivory" : "text-foreground"
                      )}
                    >
                      {option.label}
                    </p>
                    <p
                      className={cn(
                        "text-sm",
                        active ? "text-ivory/80" : "text-muted-strong"
                      )}
                    >
                      {option.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {option.perks.map((perk) => (
                        <span
                          key={perk}
                          className={cn(
                            "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]",
                            active
                              ? "bg-ivory/10 text-ivory/85"
                              : "bg-paper text-muted-strong"
                          )}
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2 transition",
                      active
                        ? "border-saffron bg-saffron text-emerald-deep"
                        : "border-line"
                    )}
                  >
                    {active && <Check className="h-3.5 w-3.5" />}
                  </span>
                </button>
              );
            })}
          </div>

          <Button className="w-full" onClick={() => setStep(2)}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-center text-sm text-muted-strong">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-emerald underline underline-offset-4 hover:text-saffron-deep"
            >
              Sign in
            </Link>
          </p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="firstName"
              label="First name"
              placeholder="Chinedu"
              value={form.firstName}
              error={errors.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
            <Input
              id="lastName"
              label="Last name"
              placeholder="Okafor"
              value={form.lastName}
              error={errors.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@smoothrent.io"
            value={form.email}
            error={errors.email}
            onChange={(e) => update("email", e.target.value)}
          />
          <Input
            id="phone"
            label="Phone"
            type="tel"
            placeholder="+234 801 234 5678"
            value={form.phone}
            error={errors.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
          <div className="relative">
            <Input
              id="password"
              label="Password"
              hint="Min. 6 characters"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={form.password}
              error={errors.password}
              onChange={(e) => update("password", e.target.value)}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-emerald/[0.06] hover:text-emerald"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <Input
            id="confirmPassword"
            label="Confirm password"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={form.confirmPassword}
            error={errors.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
          />

          <label className="flex items-start gap-2.5 rounded-xl border border-line bg-card/60 p-3 text-xs text-muted-strong">
            <input
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 rounded border-line accent-emerald"
            />
            I agree to SmoothRent’s{" "}
            <Link href="#" className="text-emerald underline underline-offset-2">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-emerald underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </label>

          <div className="grid grid-cols-[auto_1fr] gap-3">
            <Button
              variant="ivory"
              type="button"
              size="md"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-strong">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-emerald underline underline-offset-4 hover:text-saffron-deep"
            >
              Sign in
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
