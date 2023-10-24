import Image from "next/image";
import Link from "next/link";

export function ProductCard({
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
      className="bg-slate-100 shadow-md rounded-md gap-3 flex flex-col p-6 w-64"
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
        <div className="text-xl">R${price.toFixed(2)}</div>
        <button className="bg-emerald-100 mt-3 p-3 shadow-md rounded-md">
          Adicionar ao carrinho
        </button>
      </div>
    </Link>
  );
}
