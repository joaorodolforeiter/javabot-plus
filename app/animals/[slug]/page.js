/* eslint-disable @next/next/no-img-element */
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export default async function Page({ params }) {
  const prisma = new PrismaClient();
  const animal = await prisma.animal.findFirst({
    where: { id: Number(params.slug) },
  });

  return (
    <div className="flex justify-center">
      <div className="container">
        <div className="flex">
          <img
            className="h-96 w-96 object-cover shadow-lg rounded-lg"
            src={animal.imagemURL}
            alt="Animal Image"
          />
          <div className="m-8 space-y-6">
            <div className="text-4xl">{animal.nome}</div>
            <div className="text-lg">
              {animal.especie}, {animal.idade}{" "}
              {animal.idade !== 1 ? "anos" : "ano"}
            </div>
            <div>{animal.descricao}</div>
            <div>
              <Link
                href={`/adotar/${animal.id}`}
                className="text-lg bg-green-200 hover:bg-green-300 transition-all p-3 rounded-lg shadow-md"
              >
                Adotar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
