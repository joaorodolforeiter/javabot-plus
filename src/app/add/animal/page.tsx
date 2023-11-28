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
        className="flex flex-col max-w-md w-full p-6 bg-slate-200 rounded-md shadow-md gap-1"
      >
        <div className="flex justify-between gap-3">
          <label className="flex flex-col gap-1">
            Nome
            <input
              className="p-1 shadow-sm rounded-md w-full"
              type="text"
              name="nome"
              placeholder="Nome do animal..."
              maxLength={150}
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Especie
            <input
              className="p-1 shadow-sm rounded-md w-full"
              type="text"
              name="especie"
              placeholder="Especie do animal..."
              maxLength={150}
              required
            />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          Idade
          <input
            className="p-1 shadow-sm rounded-md w-full"
            type="number"
            name="idade"
            placeholder="Idade do animal..."
            max={500}
            min={0}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Descricao
          <textarea
            className="resize-none p-1 shadow-sm rounded-md w-full"
            rows={4}
            name="descricao"
            placeholder="Descrição do animal..."
            maxLength={150}
            required
          ></textarea>
        </label>
        <label className="flex flex-col gap-1">
          URL da Imagem
          <input
            className="p-1 shadow-sm rounded-md w-full"
            type="text"
            name="imagemURL"
            placeholder="Url da Imagem..."
            maxLength={150}
            required
          />
        </label>
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
