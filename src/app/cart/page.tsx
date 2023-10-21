import { authOptions } from "@/src/lib/authOptions";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/loja");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
    include: {
      shoppingCart: { include: { items: { include: { product: true } } } },
    },
  });

  const items = user?.shoppingCart?.items!;

  return (
    <div>
      <div className="text-2xl">Meu Carrinho de Compras</div>
      {items.map((item) => (
        <div key={item.id}>
          {item.product.nome} - {item.quantity}
        </div>
      ))}
    </div>
  );
}
