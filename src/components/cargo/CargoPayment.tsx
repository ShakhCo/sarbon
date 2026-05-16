"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { CargoPayment as CargoPaymentType } from "@/lib/types/cargo";
import { formatMoney } from "@/lib/utils/format";

export function CargoPayment({
  payment,
  align = "right",
}: {
  payment: CargoPaymentType | null;
  align?: "left" | "right";
}) {
  const { t, lang } = useI18n();
  const a = align === "right" ? "items-end text-right" : "items-start text-left";

  if (!payment || payment.price_request) {
    return (
      <div className={`flex flex-col ${a}`}>
        <span className="data-mono text-sm font-semibold text-ink-soft">
          {t.table.onRequest}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${a}`}>
      <span className="data-mono text-base font-bold text-ink">
        {formatMoney(payment.total_amount, payment.total_currency, lang)}
      </span>
      <div className="mt-1 flex flex-col gap-0.5">
        {payment.is_negotiable && (
          <span className="data-mono text-[11px] text-amber">
            {t.table.negotiable}
          </span>
        )}
        {payment.with_prepayment && payment.prepayment_amount > 0 && (
          <span className="data-mono text-[11px] text-ink-faint">
            {t.table.prepay}:{" "}
            {formatMoney(
              payment.prepayment_amount,
              payment.prepayment_currency,
              lang,
            )}
          </span>
        )}
      </div>
    </div>
  );
}
