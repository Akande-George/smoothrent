"use client";

import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@smoothrent.ng",
    href: "mailto:hello@smoothrent.ng",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 801 234 5678",
    href: "tel:+2348012345678",
  },
  {
    icon: MapPin,
    label: "HQ",
    value: "Victoria Island, Lagos",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+234 901 555 0102",
    href: "https://wa.me/2349015550102",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes("@") || !form.message.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <section className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-saffron-deep">
            Contact
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
            Real humans,
            <br />
            <span className="italic text-emerald">real responses.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-strong">
            Press a button. Send a message. Our team in Lagos and Abuja replies in
            under two hours, every working day.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {contacts.map((c) => {
            const inner = (
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-line bg-paper p-5 transition hover:-translate-y-0.5 hover:border-emerald/50">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald text-ivory">
                  <c.icon className="h-4 w-4" />
                </span>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                  {c.label}
                </p>
                <p className="font-display text-lg text-foreground">{c.value}</p>
              </div>
            );
            return c.href ? (
              <a key={c.label} href={c.href}>
                {inner}
              </a>
            ) : (
              <div key={c.label}>{inner}</div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <article className="relative overflow-hidden rounded-[24px] border border-line bg-paper p-6 sm:p-8 md:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full sun-gradient opacity-50" />
          <div className="relative">
            <p className="tag-eyebrow">Send a note</p>
            <h2 className="mt-3 font-display text-3xl text-foreground">
              We read every message.
            </h2>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="name"
                  label="Full name"
                  placeholder="Chinedu Okafor"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@smoothrent.ng"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="phone"
                  label="Phone"
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
                <Input
                  id="subject"
                  label="Subject"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                />
              </div>
              <Textarea
                id="message"
                label="Message"
                rows={5}
                placeholder="Tell us a little more…"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted">We reply within 2 hours, Mon–Fri.</p>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : sent ? (
                    <>
                      Sent · thank you
                      <Send className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </article>

        <aside className="relative overflow-hidden rounded-[24px] border border-emerald-deep bg-emerald p-6 text-ivory sm:p-8">
          <div className="grain-soft mix-blend-overlay" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full canopy-gradient opacity-70" />
          <p className="relative font-mono text-[11px] uppercase tracking-[0.32em] text-saffron">
            Office hours
          </p>
          <h3 className="relative mt-3 font-display text-3xl italic leading-tight">
            Mon–Fri · 9am to 6pm WAT
          </h3>
          <p className="relative mt-4 text-sm leading-6 text-ivory/85">
            We answer urgent maintenance and trust issues 24/7. For everything else,
            our office hours run on Lagos time.
          </p>
          <div className="relative mt-6 grid grid-cols-3 gap-3 border-t border-ivory/15 pt-5 text-center">
            {[
              { stat: "<2 hrs", label: "Avg reply" },
              { stat: "98%", label: "Resolved in 24h" },
              { stat: "4.9", label: "Support rating" },
            ].map((m) => (
              <div key={m.label}>
                <p className="font-display text-2xl">{m.stat}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/65">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
