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

    let date;

    if (formData.get("data-nascimento")) {
      date =
        new Date(String(formData.get("data-nascimento"))).toISOString() || null;
    }

    await prisma.user.update({
      where: {
        email: sessionEmail,
      },
      data: {
        endereco: formData.get("endereco")
          ? String(formData.get("endereco"))
          : undefined,
        telefone: formData.get("telefone")
          ? String(formData.get("telefone"))
          : undefined,
        cpf: formData.get("cpf") ? String(formData.get("cpf")) : undefined,
        dataNascimento: date ? date : undefined,
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
        <div className="text-3xl p-12 text-center">Formulario de Adoção</div>
        <form
          action={handleSubmit}
          className="flex flex-col bg-slate-200 p-6 gap-4 rounded-lg shadow-md"
        >
          <div className="text-xl font-semibold">Informações Pessoais</div>

          <label className="flex flex-col">
            Endereço
            <input
              className="shadow-md rounded-md p-2"
              placeholder="Endereço..."
              type="text"
              name="endereco"
              defaultValue={user?.endereco || ""}
              required
            />
          </label>
          <label className="flex flex-col">
            Telefone
            <input
              className="shadow-md rounded-md p-2"
              placeholder="Telefone..."
              type="tel"
              name="telefone"
              defaultValue={user?.telefone || ""}
              required
            />
          </label>
          <label className="flex flex-col">
            CPF
            <input
              className="shadow-md rounded-md p-2"
              placeholder="CPF..."
              type="text"
              name="cpf"
              maxLength={14}
              pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}.[0-9]{2}"
              defaultValue={user?.cpf || ""}
              required
            />
          </label>
          <label className="flex flex-col">
            Data de nascimento
            <input
              className="shadow-md rounded-md p-2"
              placeholder="Data de nascimento..."
              type="date"
              name="data-nascimento"
              defaultValue={user?.dataNascimento
                ?.toISOString()
                .substring(0, 10)}
              required
            />
          </label>

          <button className="bg-emerald-200 hover:bg-emerald-300 hover:shadow-lg transition-all p-3 mt-2 shadow-md rounded-md">
            Enviar Solicitação
          </button>
        </form>
      </div>
    </div>
  );
}
