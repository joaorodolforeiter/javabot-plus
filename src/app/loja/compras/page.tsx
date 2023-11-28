import PurchaseCard from "@/src/components/PurchaseCard";
import { authOptions } from "@/src/lib/authOptions";
import { prisma } from "@/src/lib/prisma";
import { SmileySad } from "@phosphor-icons/react/dist/ssr";
import { getServerSession } from "next-auth";
import Link from "next/link";
import colors from "tailwindcss/colors";

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

  if (orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-3">
        <SmileySad size={120} weight="fill" color={colors.slate[300]} />
        <div>Sem Compras</div>
        <Link href="/loja" className="shadow-md bg-emerald-100 rounded-md p-3">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {orders.map((order) => (
        <PurchaseCard key={order.id} order={order} />
      ))}
    </div>
  );
}
