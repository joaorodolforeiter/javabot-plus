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
  });
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          {order.status} - R${order.totalAmount}
        </div>
      ))}
    </div>
  );
}
