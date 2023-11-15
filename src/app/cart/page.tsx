import { authOptions } from "@/src/lib/authOptions";
import { prisma } from "@/src/lib/prisma";
import { Product } from "@prisma/client";
import { getServerSession } from "next-auth";
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

  if (items.length == 0) {
    redirect("/loja");
  }

  return (
    <div className="flex flex-col">
      <div className="text-2xl mb-16">Meu Carrinho de Compras</div>
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem
              key={item.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </div>
        <div className="bg-slate-100 rounded-md flex flex-col gap-3 p-6 h-fit flex-1">
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

function CartItem({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  return (
    <div className="bg-slate-100 items-center flex p-3 justify-between rounded-md shadow-sm">
      <div className="flex gap-3">
        <Image
          className="rounded-md shadow-sm aspect-square object-cover w-28"
          width={200}
          height={200}
          src={product.imagemURL}
          alt="product image"
        />
        <div className="flex w-56 flex-col justify-evenly">
          <div className="text-sm font-bold">{product.marca}</div>
          <div>{product.nome}</div>
          <div>R${product.preco}</div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 flex-wrap">
        <select
          className="w-16 p-2 bg-slate-50 text-black shadow-md rounded-md"
          name="quantity"
          defaultValue={quantity}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10+</option>
        </select>
        <div className="w-20">R${(quantity * product.preco).toFixed(2)}</div>
      </div>
    </div>
  );
}
