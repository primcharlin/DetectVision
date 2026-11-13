"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { interestOptions, validateDemoRequest, type DemoRequest } from "@/lib/demo-request";

type Errors = Partial<Record<keyof DemoRequest, string>>;

const field =
  "mt-2 block w-full min-h-12 rounded-xl border bg-white px-4 py-3 text-[1rem] text-ink placeholder:text-slate/70 transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/15";

export function DemoForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [plan, setPlan] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const businessRef = useRef<HTMLInputElement>(null);

  // Prefill from links elsewhere on the site: ?email=, ?business=, ?product=&plan=
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const email = q.get("email"), business = q.get("business"), product = q.get("product");
    if (email && emailRef.current) emailRef.current.value = email.slice(0, 200);
    if (business && businessRef.current) {
      businessRef.current.value = business.slice(0, 200);
      setPicked((p) => (p.includes("Free business analysis") ? p : [...p, "Free business analysis"]));
    }
    if (product && (interestOptions as readonly string[]).includes(product)) setPicked((p) => (p.includes(product) ? p : [...p, product]));
    const pl = q.get("plan");
    if (pl === "base" || pl === "pro") setPlan(pl);
  }, []);

  const toggle = (o: string) => setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      business: String(fd.get("business") ?? ""),
      interests: picked,
      plan,
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    const found = validateDemoRequest(data);
    setErrors(found);
    if (Object.keys(found).length) {
      (e.currentTarget.elements.namedItem(Object.keys(found)[0]) as HTMLElement | null)?.focus?.();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Your message didn’t go through. Check the fields above and try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setServerError("You seem to be offline. Check your connection and try again.");
      setStatus("error");
    }
  }

  const err = (k: keyof DemoRequest) => (errors[k] ? <p id={`${k}-error`} className="mt-2 text-sm font-medium text-[#b42318]">{errors[k]}</p> : null);
  const aria = (k: keyof DemoRequest) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `${k}-error` : undefined });
  const border = (k: keyof DemoRequest) => (errors[k] ? "border-[#b42318]" : "border-rule");

  return (
    <div className="rounded-[32px] bg-white p-6 ring-1 ring-rule sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center" role="status">
            <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-white">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><motion.path d="M5 12l5 5L20 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.35, duration: 0.4 }} /></svg>
            </motion.span>
            <h2 className="mt-6 text-3xl tracking-[-0.03em]">Message sent</h2>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-slate">Thanks. We usually reply within one business day.</p>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={onSubmit} noValidate className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-semibold">Full name</label>
                <input id="name" name="name" autoComplete="name" className={clsx(field, border("name"))} {...aria("name")} />
                {err("name")}
              </div>
              <div>
                <label htmlFor="business" className="text-sm font-semibold">Business <span className="font-normal text-slate">(optional)</span></label>
                <input ref={businessRef} id="business" name="business" autoComplete="organization" placeholder="Name and city" className={clsx(field, "border-rule")} />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold">Email</label>
                <input ref={emailRef} id="email" name="email" type="email" autoComplete="email" className={clsx(field, border("email"))} {...aria("email")} />
                {err("email")}
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-semibold">Phone <span className="font-normal text-slate">(optional)</span></label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" className={clsx(field, border("phone"))} {...aria("phone")} />
                {err("phone")}
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold">What are you interested in? <span className="font-normal text-slate">(choose any)</span></legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {interestOptions.map((o) => {
                  const on = picked.includes(o);
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(o)}
                      className={clsx("flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.95rem] font-medium transition-colors", on ? "border-ink bg-ink text-white" : "border-rule hover:border-ink/40")}
                    >
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.svg initial={{ width: 0, opacity: 0 }} animate={{ width: 14, opacity: 1 }} exit={{ width: 0, opacity: 0 }} height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                            <path d="M5 12l5 5L20 7" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                      {o}
                    </button>
                  );
                })}
              </div>
              {plan && <p className="mt-3 text-sm text-slate">Plan selected: <span className="font-semibold text-ink">{plan === "pro" ? "Pro" : "Base"}</span></p>}
            </fieldset>

            <div>
              <label htmlFor="message" className="text-sm font-semibold">How can we help?</label>
              <textarea id="message" name="message" rows={4} placeholder="Tell us what you’re running" className={clsx(field, border("message"), "resize-y")} {...aria("message")} />
              {err("message")}
            </div>

            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {serverError && <p className="rounded-xl bg-[#fef3f2] p-4 text-sm font-medium text-[#b42318]" role="alert">{serverError}</p>}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate">We usually reply within one business day.</p>
              <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
