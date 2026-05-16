"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Cargo } from "@/lib/types/cargo";
import { routeEndpoints } from "@/lib/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CargoCell,
  OrdererCell,
  PlaceCell,
  PriceCell,
  RowActions,
  TransportCell,
} from "./CargoCells";

export function CargoTable({ items }: { items: Cargo[] }) {
  const { t } = useI18n();

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <Table className="min-w-[1100px]">
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="px-4 uppercase tracking-wide">
                {t.table.from}
              </TableHead>
              <TableHead className="px-4 uppercase tracking-wide">
                {t.table.to}
              </TableHead>
              <TableHead className="px-4 uppercase tracking-wide">
                {t.table.price}
              </TableHead>
              <TableHead className="px-4 uppercase tracking-wide">
                {t.table.cargo}
              </TableHead>
              <TableHead className="px-4 uppercase tracking-wide">
                {t.table.transport}
              </TableHead>
              <TableHead className="px-4 uppercase tracking-wide">
                {t.table.orderer}
              </TableHead>
              <TableHead className="px-4" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((c) => {
              const { origin, destination } = routeEndpoints(c.route_points);
              return (
                <TableRow key={c.id}>
                  <TableCell className="px-4 py-4 align-top">
                    <PlaceCell point={origin} />
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top">
                    <PlaceCell point={destination} />
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top">
                    <PriceCell cargo={c} />
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top">
                    <CargoCell cargo={c} />
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top">
                    <TransportCell cargo={c} />
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top">
                    <OrdererCell cargo={c} />
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top">
                    <RowActions liked={c.is_liked} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
