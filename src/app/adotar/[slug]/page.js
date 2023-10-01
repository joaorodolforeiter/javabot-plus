/* eslint-disable @next/next/no-img-element */
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const prisma = new PrismaClient();
  const animal = await prisma.animal.findFirst({
    where: { id: Number(params.slug) },
  });

  if (!animal) {
    redirect("/");
  }

  return (
    <div className="flex justify-center">
      <div className="container">
        <div className="flex justify-center gap-16">
          <div className="m-8 space-y-6">
            <img
              className="sm:max-w-sm aspect-square object-cover shadow-md rounded-lg"
              src={animal.imagemURL}
              alt=""
            />
            <div className="text-4xl">{animal.nome}</div>
            <div className="text-lg">
              {animal.especie}, {animal.idade} ano{animal.idade !== 1 && "s"}
            </div>
          </div>
          <div>
            <div className="text-3xl p-12 text-center">
              Formulario de Adoção
            </div>
            <form className="flex flex-col bg-slate-200 p-6 rounded-lg shadow-md">
              <div className="text-xl mb-6 font-semibold">
                Informações Pessoais
              </div>

              <label htmlFor="">Nome</label>
              <input
                className="mb-3 shadow-md rounded-md p-2"
                placeholder="Nome..."
                type="text"
                name=""
                id=""
              />
              <label htmlFor="">Email</label>
              <input
                className="mb-3 shadow-md rounded-md p-2"
                placeholder="Email..."
                type="text"
                name=""
                id=""
              />
              <label htmlFor="">Endereço</label>
              <input
                className="mb-3 shadow-md rounded-md p-2"
                placeholder="Endereço..."
                type="text"
                name=""
                id=""
              />
              <label htmlFor="">Telefone</label>
              <input
                className="mb-3 shadow-md rounded-md p-2"
                placeholder="Telefone..."
                type="text"
                name=""
                id=""
              />
              <button className="bg-emerald-200 p-3 mt-2 shadow-md rounded-md">
                Enviar Solicitação
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
