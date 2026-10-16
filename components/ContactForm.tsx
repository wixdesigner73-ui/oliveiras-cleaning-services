"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS, SERVICES } from "../lib/site";

/**
 * Submission goes to FormSubmit (https://formsubmit.co), which forwards the form to the business email.
 * The first submission ever sent triggers an activation email to the business address — it must be confirmed once.
 * To use a different provider (Formspree, Web3Forms…), set NEXT_PUBLIC_FORM_ENDPOINT at build time.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || `https://formsubmit.co/ajax/${BUSINESS.email}`;

const PROPERTY = ["House", "Apartment / Condo", "Office / Commercial", "Other"];
type Status = "idle" | "sending" | "sent" | "error";

type FieldProps = { name: string; label: string; type?: string; required?: boolean; textarea?: boolean; autoComplete?: string; extra?: object };

// Defined at module level so inputs keep their value and focus across re-renders.
function Field({ name, label, type = "text", required, textarea, autoComplete, extra, error }: FieldProps & { error?: string }) {
  return (
    <div className={`field ${error ? "err" : ""}`}>
      {textarea ? (
        <textarea id={name} name={name} placeholder=" " rows={4} aria-invalid={!!error} aria-describedby={error ? `${name}-e` : undefined} />
      ) : (
        <input id={name} name={name} type={type} placeholder=" " autoComplete={autoComplete} aria-invalid={!!error} aria-describedby={error ? `${name}-e` : undefined} {...extra} />
      )}
      <label htmlFor={name}>
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <span className="bar" />
      {error && (
        <p id={`${name}-e`} className="field-msg" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [service, setService] = useState("");
  const [property, setProperty] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    const q = new URLSearchParams(window.location.search).get("service");
    if (q && SERVICES.some((s) => s.id === q)) setService(q);
  }, []);

  const validate = (d: FormData) => {
    const e: Record<string, string> = {};
    if (!String(d.get("name") || "").trim()) e.name = "Please enter your name.";
    const em = String(d.get("email") || "").trim();
    if (!em) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) e.email = "That email address doesn’t look right.";
    if (!String(d.get("message") || "").trim()) e.message = "Please tell us a little about what you need.";
    return e;
  };

  const mailtoFallback = () => {
    const d = new FormData(form.current!);
    const body = [
      `Name: ${d.get("name")}`,
      `Email: ${d.get("email")}`,
      `Phone: ${d.get("phone") || "—"}`,
      `Service: ${SERVICES.find((s) => s.id === service)?.title || service || "—"}`,
      `Property type: ${property || "—"}`,
      `Preferred date: ${d.get("date") || "—"}`,
      "",
      String(d.get("message") || ""),
    ].join("\n");
    return `mailto:${BUSINESS.email}?subject=${encodeURIComponent("Free quote request")}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    if (data.get("_honey")) return; // bot
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      (ev.currentTarget.querySelector(`[name="${Object.keys(e)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    setErrMsg("");
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone") || "",
      service: SERVICES.find((s) => s.id === service)?.title || service || "Not specified",
      property_type: property || "Not specified",
      preferred_date: data.get("date") || "Not specified",
      message: data.get("message"),
      _subject: `Free quote request from ${data.get("name")}`,
      _replyto: data.get("email"),
      _template: "table",
      _captcha: "false",
    };
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      const ok = res.ok && (json.success === true || json.success === "true" || json.ok === true);
      if (!ok) throw new Error(json.message || `Request failed (${res.status})`);
      setStatus("sent");
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            role="status"
            className="flex min-h-[28rem] flex-col items-start justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="#CBB38B" strokeWidth="1.5" aria-hidden>
              <motion.circle cx="36" cy="36" r="33" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1 }} />
              <motion.path d="M22 37l10 10 18-22" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.7 }} />
            </svg>
            <h3 className="mt-8 font-display text-5xl italic text-emerald-deep">Thank you.</h3>
            <p className="mt-4 max-w-md text-charcoal/80">
              Your request has been sent to {BUSINESS.contact} at Oliveira&rsquo;s Cleaning Services. We&rsquo;ll be in touch about your free quote.
            </p>
            <button className="btn mt-8" onClick={() => { setStatus("idle"); form.current?.reset(); setService(""); setProperty(""); }}>
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" ref={form} onSubmit={submit} noValidate initial={false} exit={{ opacity: 0 }} className="space-y-7" aria-label="Request a free quote">
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />
            <div className="grid gap-7 sm:grid-cols-2">
              <Field error={errors.name} name="name" label="Full name" required autoComplete="name" />
              <Field error={errors.email} name="email" label="Email address" type="email" required autoComplete="email" />
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <Field error={errors.phone} name="phone" label="Phone number" type="tel" autoComplete="tel" />
              <Field error={errors.date} name="date" label="Preferred cleaning date" type="date" extra={{ min: today }} />
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <div className="field">
                <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value)} className={service ? "has-value" : ""}>
                  <option value="" />
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                  <option value="not-sure">Not sure yet</option>
                </select>
                <label htmlFor="service">Cleaning service required</label>
                <span className="bar" />
              </div>
              <div className="field">
                <select id="property" name="property" value={property} onChange={(e) => setProperty(e.target.value)} className={property ? "has-value" : ""}>
                  <option value="" />
                  {PROPERTY.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <label htmlFor="property">Property type</label>
                <span className="bar" />
              </div>
            </div>
            <Field error={errors.message} name="message" label="Message" textarea required />

            {status === "error" && (
              <div role="alert" className="border border-[#a4452c]/40 bg-[#a4452c]/10 p-5 text-sm text-[#7a2f1c]">
                <p className="font-semibold">We couldn’t send your request just now.</p>
                <p className="mt-1 opacity-80">{errMsg}</p>
                <p className="mt-3">
                  You can still reach us directly:{" "}
                  <a className="ulink font-semibold" href={mailtoFallback()}>
                    email us this request
                  </a>{" "}
                  or call{" "}
                  <a className="ulink font-semibold" href={BUSINESS.phoneHref}>
                    {BUSINESS.phone}
                  </a>
                  .
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button type="submit" className="btn btn-gold" disabled={status === "sending"} style={{ opacity: status === "sending" ? 0.7 : 1 }}>
                {status === "sending" ? "Sending…" : "Request a Free Quote"} <span className="arrow">→</span>
              </button>
              <p className="text-xs text-charcoal/60">Fields marked * are required.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
