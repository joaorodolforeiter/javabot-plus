import { authOptions } from "@/src/lib/authOptions";
import { prisma } from "@/src/lib/prisma";
import { Product } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";
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
    <div className="flex gap-6 justify-between">
      <div className="w-full max-w-screen-sm space-y-4">
        <h2 className="text-2xl mb-8">Checkout</h2>
        <div className="text-1xl mb-4">Endereço</div>
        <div className="flex flex-col bg-slate-100 rounded-md shadow-sm gap-3 p-6">
          <div className="w-full flex justify-between gap-3">
            <input
              className="w-full p-2 shadow-sm rounded-md"
              type="text"
              name=""
              id=""
              placeholder="Nome"
            />
            <input
              className="w-full p-2 shadow-sm rounded-md"
              type="text"
              name=""
              id=""
              placeholder="Sobrenome"
            />
          </div>
          <input
            className="p-2 shadow-sm rounded-md"
            type="text"
            name=""
            id=""
            placeholder="Endereço, número, apartamento"
          />
          <input
            className="p-2 shadow-sm rounded-md"
            type="text"
            name=""
            id=""
            placeholder="Bairro"
          />
          <div className="flex gap-3 justify-between">
            <input
              className="p-2 shadow-sm rounded-md w-full"
              type="text"
              name=""
              id=""
              placeholder="Cidade"
            />
            <input
              className="p-2 shadow-sm rounded-md w-full"
              type="text"
              name=""
              id=""
              placeholder="Estado"
            />
            <input
              className="p-2 shadow-sm rounded-md w-full"
              type="text"
              name=""
              id=""
              placeholder="CEP"
            />
          </div>
        </div>
        <div className="flex flex-col bg-slate-100 rounded-md shadow-sm gap-3 p-6">
          <input
            className="p-2 shadow-sm rounded-md"
            type="text"
            name=""
            id=""
            placeholder="Numero do Cartão"
          />
          <div className="w-full flex justify-between gap-3">
            <input
              className="w-full p-2 shadow-sm rounded-md"
              type="text"
              name=""
              id=""
              placeholder="CVC"
            />
            <input
              className="w-full p-2 shadow-sm rounded-md"
              type="date"
              name=""
              id=""
              placeholder="Validade"
            />
          </div>
          <input
            className="p-2 shadow-sm rounded-md"
            type="text"
            name=""
            id=""
            placeholder="Titular do cartão"
          />
        </div>
      </div>
      <div className="flex flex-col divide-y divide-slate-200">
        {items.map((item) => (
          <CartItem
            key={item.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
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
    <div className="bg-slate-100 items-center flex p-3 py-2 justify-between rounded-md shadow-sm">
      <div className="flex gap-3">
        <Image
          className="rounded-md shadow-sm aspect-square object-cover w-16 h-16"
          width={200}
          height={200}
          src={product.imagemURL}
          alt="product image"
        />
        <div className="flex flex-col justify-evenly">
          <div>{product.nome}</div>
          <div>R${product.preco}</div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 flex-wrap">
        <div className="p-2 bg-slate-50 text-black shadow-sm rounded-md">
          {quantity}
        </div>
        <div className="w-20">R${(quantity * product.preco).toFixed(2)}</div>
      </div>
    </div>
  );
}
