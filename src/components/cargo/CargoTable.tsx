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

export function CargoTable({ items }: { items: Cargo[] }) {
  const { t } = useI18n();

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1140px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[14%]" />
            <col className="w-[14%]" />
            <col className="w-[12%]" />
            <col className="w-[18%]" />
            <col className="w-[20%]" />
            <col className="w-[17%]" />
            <col className="w-[5%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-line bg-card-2">
              <Th>{t.table.from}</Th>
              <Th>{t.table.to}</Th>
              <Th>{t.table.price}</Th>
              <Th>{t.table.cargo}</Th>
              <Th>{t.table.transport}</Th>
              <Th>{t.table.orderer}</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {items.map((c, idx) => {
              const { origin, destination } = routeEndpoints(c.route_points);
              return (
                <tr
                  key={c.id}
                  className="rise border-b border-line transition-colors last:border-b-0 hover:bg-card-2"
                  style={{ animationDelay: `${Math.min(idx, 12) * 22}ms` }}
                >
                  <Td>
                    <PlaceCell point={origin} />
                  </Td>
                  <Td>
                    <PlaceCell point={destination} />
                  </Td>
                  <Td>
                    <PriceCell cargo={c} />
                  </Td>
                  <Td>
                    <CargoCell cargo={c} />
                  </Td>
                  <Td>
                    <TransportCell cargo={c} />
                  </Td>
                  <Td>
                    <OrdererCell cargo={c} />
                  </Td>
                  <Td className="pr-4">
                    <RowActions liked={c.is_liked} />
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={`col-label whitespace-nowrap px-4 py-3 ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-4 align-top ${className}`}>{children}</td>;
}
