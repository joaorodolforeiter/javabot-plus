import { ProductCard } from "@/src/components/ProductCard";
import { prisma } from "@/src/lib/prisma";

export default async function Loja() {
  const products = await prisma.product.findMany();

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-4xl mt-4">Produtos compraveis</h1>
      <div className="py-14 flex justify-center flex-wrap gap-6">
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
