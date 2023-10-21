import { prisma } from "@/src/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Loja() {
  const products = await prisma.product.findMany();

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-4xl mt-4">Produtos compraveis</h1>
      <div className="p-14 flex flex-wrap gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            brand={product.marca}
            name={product.nome}
            price={product.preco}
            imageURL={product.imagemURL}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  name,
  brand,
  imageURL,
  price,
  productId,
}: {
  name: string;
  brand: string;
  imageURL: string;
  price: number;
  productId: number;
}) {
  return (
    <Link
      href={`/loja/${productId}`}
      className="bg-slate-50 shadow-sm rounded-md gap-3 flex flex-col p-6 w-64"
    >
      <Image
        className="shadow-sm object-cover aspect-square rounded-md w-full bg-white"
        src={imageURL}
        height={200}
        width={200}
        alt=""
      />
      <div className="flex flex-col justify-between h-full gap-1">
        <div className="font-bold text-sm">{brand}</div>
        <div>{name}</div>
        <div className="text-xl">R${price}</div>
        <button className="bg-emerald-200 mt-3 p-3 shadow-md rounded-md">
          Adicionar ao carrinho
        </button>
      </div>
    </Link>
  );
}
