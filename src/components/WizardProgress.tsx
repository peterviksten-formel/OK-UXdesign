import { Icon } from "./Icon";

/**
 * WizardProgress — delad progress-header för multi-step-flöden (guides).
 *
 * En visuell grammatik, tre stilar — välj den som passar flödet:
 *   stepper  — cirklar + etiketter + kopplande linjer (default, bäst för 2–4 steg)
 *   bar      — filled progress-bar + text nedanför (tätast, bäst för mobila)
 *   chips    — pill-chips i rad (bäst när stegen är jämnstora / navigerbara)
 *
 * Alla tre delar samma ARIA-mönster: aria-label="Steg X av Y — [label]"
 * uppdateras live så skärmläsare hör övergången.
 */

export type WizardStep = {
  key: string;
  label: string;
  /** Valfri kortare text som visas under/bredvid huvudetiketten */
  hint?: string;
};

export type WizardVariant = "stepper" | "bar" | "chips";

type Props = {
  steps: WizardStep[];
  /** 1-baserat index för aktuellt steg */
  current: number;
  variant?: WizardVariant;
  /** Valfri titel ovanför progress-raden — t.ex. "Skicka ett ärende" */
  title?: string;
  /** Valfri ingress under titeln */
  subtitle?: string;
};

export function WizardProgress({ steps, current, variant = "stepper", title, subtitle }: Props) {
  const total = steps.length;
  const active = steps[Math.min(Math.max(current, 1), total) - 1];
  const liveLabel = `Steg ${current} av ${total} — ${active?.label ?? ""}`;

  return (
    <div className="mb-5">
      {(title || subtitle) && (
        <header className="mb-3">
          {title && <h3 className="text-h4 font-medium mb-0.5">{title}</h3>}
          {subtitle && <p className="text-sm text-ink-secondary">{subtitle}</p>}
        </header>
      )}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveLabel}
      </p>

      {variant === "stepper" && <StepperBody steps={steps} current={current} />}
      {variant === "bar" && <BarBody steps={steps} current={current} active={active} />}
      {variant === "chips" && <ChipsBody steps={steps} current={current} />}
    </div>
  );
}

/* ─── A: Stepper — connected dots + labels ──────────────────────── */

function StepperBody({ steps, current }: { steps: WizardStep[]; current: number }) {
  return (
    <ol className="flex items-center gap-2 text-xs" aria-label="Stegöversikt">
      {steps.map((s, i) => {
        const n = i + 1;
        const done = current > n;
        const isActive = current === n;
        const dotClasses = done
          ? "bg-brand-accent text-white"
          : isActive
          ? "bg-brand-primary text-white"
          : "bg-border-subtle text-ink-muted";
        return (
          <li key={s.key} className="flex items-center gap-2 flex-1">
            <span
              className={`shrink-0 w-7 h-7 rounded-full grid place-items-center font-medium text-xs transition-colors motion-reduce:transition-none ${dotClasses}`}
              aria-current={isActive ? "step" : undefined}
            >
              {done ? <Icon name="check" size={14} /> : n}
            </span>
            <span className={`${isActive ? "font-medium text-ink" : "text-ink-muted"}`}>
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span
                className={`flex-1 h-px transition-colors motion-reduce:transition-none ${
                  done ? "bg-brand-accent" : "bg-border-subtle"
                }`}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ─── B: Bar — filled progress bar + current label ──────────────── */

function BarBody({
  steps,
  current,
  active,
}: {
  steps: WizardStep[];
  current: number;
  active?: WizardStep;
}) {
  const total = steps.length;
  const pct = Math.round(((current - 1) / (total - 1 || 1)) * 100);
  return (
    <div>
      <div
        className="relative w-full h-1.5 rounded-full bg-border-subtle overflow-hidden"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={`Steg ${current} av ${total}`}
      >
        <div
          className="absolute inset-y-0 left-0 bg-brand-accent transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${Math.max(pct, 6)}%` }}
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 mt-2 text-xs">
        <span className="font-medium text-ink">
          Steg {current} av {total}
          {active?.label && <span className="text-ink-muted font-normal"> · {active.label}</span>}
        </span>
        {active?.hint && <span className="text-ink-muted truncate">{active.hint}</span>}
      </div>
    </div>
  );
}

/* ─── C: Chips — pill-chips in a row ────────────────────────────── */

function ChipsBody({ steps, current }: { steps: WizardStep[]; current: number }) {
  return (
    <ol className="flex flex-wrap gap-1.5 text-xs" aria-label="Stegöversikt">
      {steps.map((s, i) => {
        const n = i + 1;
        const done = current > n;
        const isActive = current === n;
        const pillClasses = done
          ? "bg-brand-accent text-white border-brand-accent"
          : isActive
          ? "bg-brand-primary text-white border-brand-primary"
          : "bg-surface text-ink-muted border-border-subtle";
        return (
          <li key={s.key}>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors motion-reduce:transition-none ${pillClasses}`}
              aria-current={isActive ? "step" : undefined}
            >
              <span className="shrink-0 w-4 h-4 rounded-full bg-white/20 grid place-items-center font-bold text-[10px]">
                {done ? <Icon name="check" size={10} /> : n}
              </span>
              <span className="font-medium">{s.label}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
