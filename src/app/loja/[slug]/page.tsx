import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);

  const productId = Number(params.slug);

  const product = await prisma.product.findFirst({
    where: { id: productId },
  });

  if (!product) {
    redirect("/loja");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  const shoppingCart = await prisma.shoppingCart.upsert({
    where: { userId: user!.id },
    update: {},
    create: {
      userId: user!.id,
    },
    include: { items: { include: { product: true } } },
  });

  async function handleAddtoCart(formData: FormData) {
    "use server";

    const quantity = Number(formData.get("quantity"));

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    const shoppingCart = await prisma.shoppingCart.upsert({
      where: { userId: user!.id },
      update: {},
      create: {
        userId: user!.id,
      },
    });

    // Create a new shopping cart item
    const newShoppingCartItem = await prisma.shoppingCartItem.create({
      data: {
        productId,
        quantity,
        shoppingCartId: shoppingCart.id,
      },
    });

    redirect("/cart");
  }

  return (
    <div className="h-full flex justify-center">
      <div className="w-xl flex justify-center items-center gap-8 flex-wrap">
        <Image
          className="bg-slate-50 rounded-md shadow-sm p-6"
          src={product.imagemURL}
          width={400}
          height={400}
          alt=""
        />
        <div className="bg-slate-100 rounded-md shadow-sm p-10 flex flex-col gap-3">
          <div className="text-lg">{product.marca}</div>
          <div className="text-3xl">{product.nome}</div>
          <div className="text-2xl">{product.descricao}</div>
          <div>R${product.preco}</div>
          <form className="flex flex-col gap-3" action={handleAddtoCart}>
            <select
              className="w-16 p-2 bg-slate-50 text-black shadow-md rounded-md"
              name="quantity"
              defaultValue={"1"}
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
            {shoppingCart.items.some((item) => item.product.id == productId) ? (
              <Link
                className="bg-yellow-50 w-fit shadow-md rounded-md p-3"
                href="/cart"
              >
                Ver no carrinho
              </Link>
            ) : (
              <button className="bg-emerald-200 shadow-md rounded-md p-3">
                Adicionar ao carrinho
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
