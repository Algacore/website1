import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FormCopy {
  interest: string;
  optInvestor: string;
  optPartner: string;
  optOther: string;
  name: string;
  company: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  confirm: string;
  error: string;
}

type Status = "idle" | "sending" | "ok" | "error";

const baseField =
  "font-[inherit] text-base text-ink bg-card border border-line rounded-[var(--radius-sm-card)] px-3.5 py-3 transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--color-phyco-100)]";

export default function ContactForm({ copy, lang }: { copy: FormCopy; lang: "pt" | "en" }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  // Preselect the interest when any [data-interest] trigger (hero CTAs, connect
  // path links) is clicked, mirroring the dual-path flow.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-interest]") as HTMLElement | null;
      if (el && selectRef.current) {
        selectRef.current.value = el.getAttribute("data-interest") || "investor";
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mykaoooz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form).entries()), lang }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="interest-form" className="max-w-[var(--maxw-narrow)] scroll-mt-28">
      <AnimatePresence mode="wait">
        {status === "ok" ? (
          <motion.p
            key="confirm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-[1.1rem] text-ink"
            role="status"
          >
            {copy.confirm}
          </motion.p>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={false}
            exit={{ opacity: 0 }}
            className="card card--sheen grid gap-5 p-[clamp(24px,4vw,36px)]"
          >
            <div className="grid gap-2">
              <label htmlFor="interest" className="font-medium text-[0.92rem] text-ink">
                {copy.interest}
              </label>
              <select ref={selectRef} id="interest" name="interest" className={`${baseField} select-chevron`}>
                <option value="investor">{copy.optInvestor}</option>
                <option value="partner">{copy.optPartner}</option>
                <option value="other">{copy.optOther}</option>
              </select>
            </div>

            <Field id="name" label={copy.name} autoComplete="name" required />
            <Field id="company" label={copy.company} autoComplete="organization" required />
            <Field id="email" type="email" label={copy.email} autoComplete="email" required />

            <div className="grid gap-2">
              <label htmlFor="message" className="font-medium text-[0.92rem] text-ink">
                {copy.message} <span className="text-accent-text font-semibold">*</span>
              </label>
              <textarea id="message" name="message" rows={5} required className={`${baseField} resize-y min-h-[120px]`} />
            </div>

            {status === "error" && (
              <p className="text-[0.95rem] text-[#b3261e]" role="alert">
                {copy.error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="justify-self-start rounded-[3px] px-[26px] py-[14px] text-base font-medium bg-ink text-white transition-colors hover:bg-cyano-800 disabled:opacity-70"
            >
              {status === "sending" ? copy.sending : copy.send}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-medium text-[0.92rem] text-ink">
        {label} {required && <span className="text-accent-text font-semibold">*</span>}
      </label>
      <input id={id} name={id} type={type} autoComplete={autoComplete} required={required} className={baseField} />
    </div>
  );
}
