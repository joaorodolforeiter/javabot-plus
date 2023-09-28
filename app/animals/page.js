import AnimalCard from "@/components/AnimalCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const animals = await prisma.animal.findMany();

export default function Page() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <h1 className="text-4xl mt-4">Animais Adotaveis</h1>
      <div className="flex flex-wrap justify-center md:justify-normal container gap-8">
        {animals.map((animal) => (
          <AnimalCard
            key={animal.id}
            id={animal.id}
            name={animal.nome}
            image={animal.imagemURL}
          />
        ))}
      </div>
    </div>
  );
}
