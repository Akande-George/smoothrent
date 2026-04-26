"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Loader2, Mail, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  const resend = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setResent(true);
    setTimeout(() => setResent(false), 3500);
  };

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
          One last step
        </p>
        <h1 className="font-display text-3xl italic leading-tight text-foreground">
          Verify your email.
        </h1>
        <p className="text-sm text-muted-strong">
          We just sent a verification link to your inbox. Click it to activate your
          SmoothRent account and unlock your dashboard.
        </p>
      </div>

      <div className="space-y-3">
        <Button onClick={resend} disabled={loading} className="w-full">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : resent ? (
            <>
              <ShieldCheck className="h-4 w-4" /> Sent — check your inbox
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" /> Resend verification email
            </>
          )}
        </Button>
        <Link href="/login">
          <Button variant="ivory" className="w-full">
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-line bg-card p-4 text-left text-xs text-muted-strong">
        <p className="font-mono uppercase tracking-[0.28em] text-muted">
          Didn’t see it?
        </p>
        <p className="mt-2 leading-5">
          Check your spam folder, or write to{" "}
          <a
            href="mailto:hello@smoothrent.ng"
            className="text-emerald underline underline-offset-2"
          >
            hello@smoothrent.ng
          </a>
          . We respond in under 2 hours.
        </p>
      </div>
    </div>
  );
}
