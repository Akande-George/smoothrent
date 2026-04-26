"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMockAuth } from "@/hooks/use-mock-auth";
import { mockUsers } from "@/lib/mock-data";
import type { UserRole } from "@/types/user";

const QUICK_LOGINS: { role: UserRole; label: string; email: string }[] = [
  { role: "customer", label: "Tenant", email: "chinedu@gmail.com" },
  { role: "landlord", label: "Landlord", email: "aisha@gmail.com" },
  { role: "agent", label: "Agent", email: "emeka@gmail.com" },
  { role: "admin", label: "Admin", email: "fatima@smoothrent.io" },
];

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginSkeleton() {
  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <div className="h-3 w-32 animate-pulse rounded-full bg-line" />
        <div className="h-10 w-3/4 animate-pulse rounded-xl bg-line" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-line" />
      </div>
      <div className="space-y-3">
        <div className="h-12 animate-pulse rounded-xl bg-line" />
        <div className="h-12 animate-pulse rounded-xl bg-line" />
        <div className="h-12 animate-pulse rounded-full bg-line" />
      </div>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useMockAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = searchParams.get("next");

  const handleSignIn = async (overrideEmail?: string, overridePassword?: string) => {
    setError(null);
    const e = (overrideEmail ?? email).trim().toLowerCase();
    const p = overridePassword ?? password;

    if (!e) {
      setError("Please enter your email address.");
      return;
    }
    if (!overrideEmail && p.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 650));
    const user = mockUsers.find((u) => u.email.toLowerCase() === e);
    setLoading(false);

    if (!user) {
      setError("No SmoothRent account matches that email. Try a quick login below.");
      return;
    }

    signIn(user.role);
    router.push(next || `/${user.role}`);
  };

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
          Welcome back
        </p>
        <h1 className="font-display text-3xl italic leading-tight text-foreground sm:text-4xl">
          Sign in to <span className="not-italic">SmoothRent.</span>
        </h1>
        <p className="text-sm text-muted-strong">
          New here?{" "}
          <Link
            href="/register"
            className="font-medium text-emerald underline underline-offset-4 hover:text-saffron-deep"
          >
            Create an account →
          </Link>
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@smoothrent.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <Input
            id="password"
            label="Password"
            hint="Min. 4 characters"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {error && (
          <div className="rounded-xl border border-clay/40 bg-clay/10 px-4 py-3 text-sm text-clay-deep">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-muted-strong">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-line text-emerald accent-emerald"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-emerald hover:text-saffron-deep"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="editorial-rule" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-3 font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
          Or continue with
        </span>
      </div>

      <Button variant="ivory" className="w-full" type="button">
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="rounded-2xl border border-dashed border-line bg-card/60 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
          Demo · One-tap dashboard preview
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {QUICK_LOGINS.map((q) => (
            <button
              key={q.role}
              type="button"
              onClick={() => {
                setEmail(q.email);
                handleSignIn(q.email, "demo");
              }}
              disabled={loading}
              className="rounded-full border border-line bg-paper px-3 py-2 text-xs font-medium text-foreground transition hover:border-emerald hover:bg-emerald hover:text-ivory"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
