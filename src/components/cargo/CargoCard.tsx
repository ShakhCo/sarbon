"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Cargo } from "@/lib/types/cargo";
import { routeEndpoints } from "@/lib/utils/format";
import {
  CargoCell,
  OrdererCell,
  PlaceCell,
  PriceCell,
  RowActions,
  TransportCell,
} from "./CargoCells";

export function CargoCard({ cargo, index }: { cargo: Cargo; index: number }) {
  const { t } = useI18n();
  const { origin, destination } = routeEndpoints(cargo.route_points);

  return (
    <article
      className="rise overflow-hidden rounded-[var(--radius-card)] border border-line bg-card shadow-card"
      style={{ animationDelay: `${Math.min(index, 10) * 30}ms` }}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line p-4">
        <PriceCell cargo={cargo} />
        <RowActions liked={cargo.is_liked} />
      </div>

      <div className="grid grid-cols-2 gap-4 border-b border-line p-4">
        <div>
          <div className="col-label mb-1.5">{t.table.from}</div>
          <PlaceCell point={origin} />
        </div>
        <div>
          <div className="col-label mb-1.5">{t.table.to}</div>
          <PlaceCell point={destination} />
        </div>
      </div>

      <div className="space-y-3 border-b border-line p-4">
        <div>
          <div className="col-label mb-1.5">{t.table.cargo}</div>
          <CargoCell cargo={cargo} />
        </div>
        <div>
          <div className="col-label mb-1.5">{t.table.transport}</div>
          <TransportCell cargo={cargo} />
        </div>
      </div>

      <div className="p-4">
        <OrdererCell cargo={cargo} />
      </div>
    </article>
  );
}
