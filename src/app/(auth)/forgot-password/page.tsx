"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-7 text-center">
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-saffron/30 animate-pulse" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald text-ivory">
            <Mail className="h-7 w-7" />
          </span>
        </div>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
            Check your inbox
          </p>
          <h1 className="font-display text-3xl italic leading-tight text-foreground">
            Reset link sent.
          </h1>
          <p className="text-sm text-muted-strong">
            We dispatched a password reset link to{" "}
            <strong className="text-foreground">{email}</strong>. The link expires in
            30 minutes.
          </p>
        </div>
        <div className="space-y-2">
          <Link href="/login">
            <Button variant="primary" className="w-full">
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Button>
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setEmail("");
            }}
            className="text-xs font-medium text-emerald hover:text-saffron-deep"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
          Forgotten password
        </p>
        <h1 className="font-display text-3xl italic leading-tight text-foreground sm:text-4xl">
          Let’s get you <span className="not-italic">back in.</span>
        </h1>
        <p className="text-sm text-muted-strong">
          Enter the email tied to your SmoothRent account. We’ll send you a secure
          reset link.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@smoothrent.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Send reset link
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald hover:text-saffron-deep"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </div>
  );
}
