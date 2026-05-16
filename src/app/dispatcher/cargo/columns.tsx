"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Cargo } from "@/lib/types/cargo";
import { routeEndpoints } from "@/lib/utils/format";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  CargoCell,
  OrdererCell,
  PlaceCell,
  PriceCell,
  RowActions,
  TransportCell,
} from "@/components/cargo/CargoCells";

/**
 * TanStack Table column definitions for the cargo data table.
 * Returned from a hook so headers stay localised (UZ / RU / EN).
 */
export function useCargoColumns(): ColumnDef<Cargo>[] {
  const { t } = useI18n();

  return [
    {
      id: "from",
      header: t.table.from,
      cell: ({ row }) => (
        <PlaceCell point={routeEndpoints(row.original.route_points).origin} />
      ),
    },
    {
      id: "to",
      header: t.table.to,
      cell: ({ row }) => (
        <PlaceCell
          point={routeEndpoints(row.original.route_points).destination}
        />
      ),
    },
    {
      id: "price",
      header: t.table.price,
      cell: ({ row }) => <PriceCell cargo={row.original} />,
    },
    {
      id: "cargo",
      header: t.table.cargo,
      cell: ({ row }) => <CargoCell cargo={row.original} />,
    },
    {
      id: "transport",
      header: t.table.transport,
      cell: ({ row }) => <TransportCell cargo={row.original} />,
    },
    {
      id: "orderer",
      header: t.table.orderer,
      cell: ({ row }) => <OrdererCell cargo={row.original} />,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <RowActions liked={row.original.is_liked} />,
    },
  ];
}
