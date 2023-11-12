import { authOptions } from "@/src/lib/authOptions";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function page() {
  const session = await getServerSession(authOptions);
  const orders = await prisma.order.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
    include: {
      orderItems: { include: { product: true } },
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {orders.map((order) => (
        <div
          className="bg-slate-200 shadow-sm rounded-md p-3 flex gap-3"
          key={order.id}
        >
          <Image
            className="rounded-md shadow-sm w-16 h-16 aspect-square object-cover bg-white"
            src={order.orderItems[0].product.imagemURL}
            width={128}
            height={128}
            alt=""
          />
          <ul>
            {order.orderItems.map((item) => (
              <li key={item.id}>{item.product.nome}</li>
            ))}
          </ul>
          {order.status} - R${order.totalAmount}
        </div>
      ))}
    </div>
  );
}
