"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Cargo } from "@/lib/types/cargo";
import { routeEndpoints } from "@/lib/utils/format";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CargoCell,
  OrdererCell,
  PlaceCell,
  PriceCell,
  RowActions,
  TransportCell,
} from "./CargoCells";

export function CargoCard({ cargo }: { cargo: Cargo }) {
  const { t } = useI18n();
  const { origin, destination } = routeEndpoints(cargo.route_points);

  return (
    <Card className="gap-0 p-0">
      <div className="flex items-start justify-between gap-3 p-4">
        <PriceCell cargo={cargo} />
        <RowActions liked={cargo.is_liked} />
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-4 p-4">
        <div>
          <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {t.table.from}
          </div>
          <PlaceCell point={origin} />
        </div>
        <div>
          <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {t.table.to}
          </div>
          <PlaceCell point={destination} />
        </div>
      </div>
      <Separator />
      <div className="space-y-3 p-4">
        <div>
          <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {t.table.cargo}
          </div>
          <CargoCell cargo={cargo} />
        </div>
        <div>
          <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {t.table.transport}
          </div>
          <TransportCell cargo={cargo} />
        </div>
      </div>
      <Separator />
      <div className="p-4">
        <OrdererCell cargo={cargo} />
      </div>
    </Card>
  );
}
