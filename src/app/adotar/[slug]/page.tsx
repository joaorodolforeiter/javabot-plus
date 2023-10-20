/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  const animal = await prisma.animal.findFirst({
    where: { id: Number(params.slug) },
  });

  async function handleSubmit(formData: FormData) {
    "use server";

    const sessionEmail = session?.user?.email!;

    await prisma.user.update({
      where: {
        email: sessionEmail,
      },
      data: {
        endereco: String(formData.get("endereco")),
        telefone: String(formData.get("telefone")),
        cpf: String(formData.get("cpf")),
        dataNascimento: new Date(
          String(formData.get("data-nascimento"))
        ).toISOString(),
        adocoes: {
          connect: [animal!],
        },
      },
    });
    redirect("/animals/meus");
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
              className="flex flex-col bg-slate-200 p-6 gap-4 rounded-lg shadow-md"
            >
              <div className="text-xl font-semibold">Informações Pessoais</div>

              {!user?.endereco && (
                <label className="flex flex-col">
                  Endereço
                  <input
                    className="shadow-md rounded-md p-2"
                    placeholder="Endereço..."
                    type="text"
                    name="endereco"
                    required
                  />
                </label>
              )}
              {!user?.telefone && (
                <label className="flex flex-col">
                  Telefone
                  <input
                    className="shadow-md rounded-md p-2"
                    placeholder="Telefone..."
                    type="tel"
                    name="telefone"
                    required
                  />
                </label>
              )}
              {!user?.cpf && (
                <label className="flex flex-col">
                  CPF
                  <input
                    className="shadow-md rounded-md p-2"
                    placeholder="CPF..."
                    type="text"
                    name="cpf"
                    pattern="/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/"
                    required
                  />
                </label>
              )}
              {!user?.dataNascimento && (
                <label className="flex flex-col">
                  Data de nascimento
                  <input
                    className="shadow-md rounded-md p-2"
                    placeholder="Data de nascimento..."
                    type="date"
                    name="data-nascimento"
                    required
                  />
                </label>
              )}

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
