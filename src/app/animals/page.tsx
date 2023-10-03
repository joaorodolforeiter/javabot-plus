import AnimalCard from "../../components/AnimalCard";
import { prisma } from "../../lib/prisma";

export const revalidate = 3600;

export const dynamic = "force-dynamic";

export default async function Page() {
  const animals = await prisma.animal.findMany({ include: { adocoes: true } });
  return (
    <div className="flex flex-col gap-12 items-center m-2">
      <h1 className="text-4xl mt-4">Animais Adotaveis</h1>
      <div className="flex flex-wrap justify-center md:justify-normal container gap-4 sm:gap-6">
        {animals.map(
          (animal) =>
            animal.adocoes.length === 0 && (
              <AnimalCard
                key={animal.id}
                id={animal.id}
                name={animal.nome}
                image={animal.imagemURL}
              />
            )
        )}
      </div>
    </div>
  );
}
