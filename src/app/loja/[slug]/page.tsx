import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(params.slug) },
  });

  if (!product) {
    redirect("/loja");
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
        <div className="bg-slate-100 rounded-md shadow-sm p-6 flex flex-col gap-3">
          <div className="text-lg">{product.marca}</div>
          <div className="text-3xl">{product.nome}</div>
          <div className="text-2xl">{product.descricao}</div>
          <div>R${product.preco}</div>
          <button className="bg-emerald-200 shadow-md rounded-md p-3">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
