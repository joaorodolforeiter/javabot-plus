import PurchaseCard from "@/src/components/PurchaseCard";
import { authOptions } from "@/src/lib/authOptions";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";

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
        <PurchaseCard key={order.id} order={order} />
      ))}
    </div>
  );
}
