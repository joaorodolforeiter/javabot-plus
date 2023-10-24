import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    console.log(formData.get("ImagemURL"));
    const animal = await prisma.animal.create({
      data: {
        nome: String(formData.get("nome")),
        especie: String(formData.get("especie")),
        idade: Number(formData.get("idade")),
        descricao: String(formData.get("descricao")),
        imagemURL: String(formData.get("imagemURL")),
      },
    });
    redirect(`/animals/${animal.id}`);
  }

  return (
    <div className="flex justify-center items-center h-full">
      <form
        action={handleSubmit}
        className="flex flex-col max-w-md w-full p-6 bg-slate-200 rounded-lg shadow-lg gap-1"
      >
        <div className="flex">
          <div className="space-y-2">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome do animal..."
              maxLength={150}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="especie">Especie</label>
            <input
              type="text"
              name="especie"
              id="especie"
              placeholder="Especie do animal..."
              maxLength={150}
              required
            />
          </div>
        </div>

        <label className="mt-2" htmlFor="idade">
          Idade
        </label>
        <input
          type="number"
          name="idade"
          id="idade"
          placeholder="Idade do animal..."
          max={500}
          min={0}
          required
        />
        <label className="mt-2" htmlFor="descricao">
          Descricao
        </label>
        <textarea
          className="resize-none"
          rows={4}
          name="descricao"
          id="descricao"
          placeholder="Descrição do animal..."
          maxLength={150}
          required
        ></textarea>
        <label className="mt-2" htmlFor="imagemURL">
          URL da Imagem
        </label>
        <input
          type="text"
          name="imagemURL"
          id="imagemURL"
          placeholder="Url da Imagem..."
          maxLength={150}
          required
        />
        <button
          className="mt-3 w-full bg-slate-300 p-3 rounded-lg shadow-md"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
