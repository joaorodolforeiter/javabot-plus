/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export default async function Page({ params }: { params: { slug: string } }) {
  const animal = await prisma.animal.findFirst({
    where: { id: Number(params.slug) },
  });

  async function handleSubmit(formData: FormData) {
    "use server";

    const user = await prisma.usuario.create({
      data: {
        nome: String(formData.get("nome")),
        email: String(formData.get("email")),
        endereco: String(formData.get("endereco")),
        telefone: String(formData.get("telefone")),
        cpf: String(formData.get("cpf")),
        dataNascimento: new Date(
          String(formData.get("data-nascimento"))
        ).toISOString(),
        adocoes: {
          create: {
            animalId: Number(params.slug),
          },
        },
      },
    });
    console.log(user);
  }

  if (!animal) {
    redirect("/");
  }

  return (
    <div className="flex  justify-center">
      <div className="container">
        <div className="flex max-md:flex-col justify-center gap-16">
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
            <form
              action={handleSubmit}
              className="flex flex-col bg-slate-200 p-6 rounded-lg shadow-md"
            >
              <div className="text-xl mb-6 font-semibold">
                Informações Pessoais
              </div>

              <label htmlFor="nome">Nome</label>
              <input
                className="mb-3 shadow-md rounded-md p-2"
                placeholder="Nome..."
                type="text"
                name="nome"
                id="nome"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                className="mb-3 shadow-md rounded-md p-2"
                placeholder="Email..."
                type="email"
                name="email"
                id="email"
                required
              />
              <label htmlFor="endereco">Endereço</label>
              <input
                className="mb-3 shadow-md rounded-md p-2"
                placeholder="Endereço..."
                type="text"
                name="endereco"
                id="endereco"
                required
              />
              <label htmlFor="telefone">Telefone</label>
              <input
                className="mb-3 shadow-md rounded-md p-2"
                placeholder="Telefone..."
                type="tel"
                name="telefone"
                id="telefone"
                required
              />
              <label htmlFor="cpf">CPF</label>
              <input
                className="mb-3 shadow-md rounded-md p-2"
                placeholder="CPF..."
                type="text"
                name="cpf"
                id="cpf"
                required
              />
              <label htmlFor="data-nascimento">Data de nascimento</label>
              <input
                className="mb-3 shadow-md rounded-md p-2"
                placeholder="Data de nascimento..."
                type="date"
                name="data-nascimento"
                id="data-nascimento"
                required
              />
              <button className="bg-emerald-200 hover:bg-emerald-300 hover:shadow-lg transition-all p-3 mt-2 shadow-md rounded-md">
                Enviar Solicitação
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
