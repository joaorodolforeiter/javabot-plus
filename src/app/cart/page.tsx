import { authOptions } from "@/src/lib/authOptions";
import { prisma } from "@/src/lib/prisma";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { Prisma, Product } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
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
    <div className="flex flex-col">
      <div className="text-2xl mb-16">Meu Carrinho de Compras</div>
      <div className="flex justify-between gap-8 flex-wrap">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </div>
        <div className="bg-slate-100 rounded-md flex flex-col gap-3 h-fit flex-1 p-6">
          <div className="flex justify-between text-xl">
            <div>Total</div>
            R$
            {items
              .reduce(
                (acc, item) => acc + item.product.preco * item.quantity,
                0
              )
              .toFixed(2)}
          </div>
          <Link
            className="p-3 shadow-md rounded-md bg-yellow-100 text-center"
            href={"/loja/checkout"}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

type ShoppingCartItemsWithProducts = Prisma.ShoppingCartItemGetPayload<{
  include: { product: true };
}>;

function CartItem({ cartItem }: { cartItem: ShoppingCartItemsWithProducts }) {
  async function deleteCartItemAction() {
    "use server";

    await prisma.shoppingCartItem.delete({ where: { id: cartItem.id } });

    revalidatePath("/cart");
  }

  return (
    <form className="bg-slate-100 items-center flex p-3 justify-between rounded-md shadow-sm max-md:flex-wrap gap-3">
      <div className="flex gap-3 w-full">
        <Image
          className="rounded-md shadow-sm aspect-square object-cover w-28"
          width={200}
          height={200}
          src={cartItem.product.imagemURL}
          alt="product image"
        />
        <div className="flex flex-col justify-evenly w-full">
          <div className="text-sm font-bold">{cartItem.product.marca}</div>
          <div>{cartItem.product.nome}</div>
          <div>R${cartItem.product.preco}</div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 w-full">
        <div className="w-16 p-2 bg-slate-50 text-black shadow-md rounded-md">
          {cartItem.quantity}
        </div>
        <div className="w-20">
          R${(cartItem.quantity * cartItem.product.preco).toFixed(2)}
        </div>
        <button
          className="bg-red-400 shadow-md rounded-md p-2 self-start"
          formAction={deleteCartItemAction}
        >
          <Trash className="text-white" weight="fill" size={20} />
        </button>
      </div>
    </form>
  );
}
