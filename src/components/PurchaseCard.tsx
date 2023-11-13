"use client";

import { cn } from "@/lib/utils";
import { CaretUp } from "@phosphor-icons/react";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

type OrdersWithItems = Prisma.OrderGetPayload<{
  include: { orderItems: { include: { product: true } } };
}>;

export default function PurchaseCard({ order }: { order: OrdersWithItems }) {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <div
      className="bg-slate-200 shadow-sm rounded-md p-3 flex flex-col gap-3 justify-between max-w-xl"
      key={order.id}
      onClick={() => setIsClosed(!isClosed)}
    >
      <div className="pb-3 border-b border-slate-400">{order.status}</div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Image
            className="rounded-md shadow-sm w-16 h-16 aspect-square object-cover bg-white"
            src={order.orderItems[0].product.imagemURL}
            width={128}
            height={128}
            alt=""
          />
          <div
            className={cn(
              "p-2 bg-slate-300 shadow-sm rounded-md flex justify-center items-center h-fit gap-2",
              {
                hidden: !isClosed,
              }
            )}
          >
            {order.orderItems[0].product.nome}{" "}
            <CaretUp size={24} weight="fill" />
          </div>
          <ul
            className={cn("p-3 bg-slate-300 h-fit shadow-sm rounded-md", {
              hidden: isClosed,
            })}
          >
            {order.orderItems.map((item) => (
              <li key={item.id}>{item.product.nome}</li>
            ))}
          </ul>
        </div>
        <div className="text-xl">R${order.totalAmount}</div>
      </div>
    </div>
  );
}
