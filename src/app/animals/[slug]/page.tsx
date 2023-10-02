/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export default async function Page({ params }: { params: { slug: string } }) {
  const animal = await prisma.animal.findFirst({
    where: { id: Number(params.slug) },
    include: {
      adocoes: { include: { usuario: true } },
    },
  });

  if (!animal) {
    redirect("/animals");
  }

  return (
    <div className="flex justify-center">
      <div className="container">
        <div className="flex flex-col md:flex-row">
          <img
            className="max-w-sm aspect-square m-6 object-cover shadow-lg rounded-lg"
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
              {animal.adocoes.length == 0 ? (
                <Link
                  href={`/adotar/${animal.id}`}
                  className="max-sm:flex max-sm:w-full max-sm:justify-center text-lg bg-green-200 hover:bg-green-300 transition-all p-3 rounded-lg shadow-md"
                >
                  Adotar
                </Link>
              ) : (
                <div className="flex max-sm:w-full justify-center text-lg bg-slate-200 cursor-not-allowed transition-all p-3 rounded-lg shadow-md">
                  Adotado
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
