import AnimalCard from "@/src/components/AnimalCard";
import { prisma } from "@/src/lib/prisma";

export const revalidate = 3600;

export const dynamic = "force-dynamic";

export default async function Page() {
  const animals = await prisma.animal.findMany();
  return (
    <div className="flex flex-col gap-12 items-center m-2">
      <h1 className="text-4xl mt-4">Animais para adoção</h1>
      <div className="flex flex-wrap justify-center container gap-4 sm:gap-6">
        {animals.map(
          (animal) =>
            !animal.usuarioId && <AnimalCard key={animal.id} animal={animal} />
        )}
      </div>
    </div>
  );
}
