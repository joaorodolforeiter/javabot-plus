import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "../lib/prisma";
import { ProductCard } from "../components/ProductCard";

export default async function Home() {
  const items = await prisma.product.findMany({
    take: 5,
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-5xl mt-12 font-bold">Javabot Plus</div>
      <div>Pode pá! Animal tem codigo também!</div>
      <div className="m-6 p-2 shadow-md rounded-full gap-3 bg-emerald-50 flex max-w-sm w-full">
        <MagnifyingGlass size={24} />
        <input
          className="bg-emerald-50 w-full focus:outline-none"
          type="text"
          name=""
          id=""
          placeholder="Pesquise items para o seu amado pet..."
        />
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            imageURL={item.imagemURL}
            name={item.nome}
            brand={item.marca}
            price={item.preco}
            productId={item.id}
          />
        ))}
      </div>
    </div>
  );
}
