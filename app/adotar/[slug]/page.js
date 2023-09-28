/* eslint-disable @next/next/no-img-element */
import { PrismaClient } from "@prisma/client";

export default async function Page({ params }) {
  const prisma = new PrismaClient();
  const animal = await prisma.animal.findFirst({
    where: { id: Number(params.slug) },
  });

  return (
    <div className="flex justify-center">
      <div className="container">
        <div className="flex text-center justify-center">
          <div className="m-8 space-y-6">
            <div className="text-4xl">{animal.nome}</div>
            <div className="text-lg">
              {animal.especie}, {animal.idade} ano{animal.idade !== 1 && "s"}
            </div>
            <div>
              <div>Adote um animal bunitinho</div>
              <form></form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
