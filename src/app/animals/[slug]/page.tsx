import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";
import Image from "next/image";
import { revalidatePath } from "next/cache";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email!,
    },
  });

  const animal = await prisma.animal.findFirst({
    where: { id: Number(params.slug) },
    include: { usuario: true },
  });

  async function acceptAdoptionAction() {
    "use server";

    await prisma.animal.update({
      where: { id: animal?.id },
      data: { status: "Confirmada" },
    });

    revalidatePath("/animals/[slug]", "page");
  }

  if (!animal) {
    redirect("/animals");
  }

  return (
    <div className="flex justify-center bg-slate-100 p-3 rounded-md shadow-sm">
      <div className="flex flex-col md:flex-row items-center">
        <Image
          className="h-80 w-80 aspect-square object-cover shadow-lg rounded-lg"
          src={animal.imagemURL}
          width={200}
          height={200}
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
            {!animal.usuario ? (
              <Link
                href={`/adotar/${animal.id}`}
                className="max-sm:flex max-sm:w-full max-sm:justify-center text-lg bg-green-200 hover:bg-green-300 transition-all p-3 rounded-lg shadow-md"
              >
                Adotar
              </Link>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex w-full justify-center text-lg bg-slate-200 cursor-not-allowed transition-all p-3 rounded-lg shadow-sm">
                  Adotado
                </div>
                {session?.user && user?.role === "ADMIN" && (
                  <form className="flex justify-center flex-wrap items-center bg-slate-200 p-6 rounded-md shadow-sm gap-6">
                    <Image
                      className="rounded-full shadow-sm object-cover bg-white"
                      src={animal.usuario?.image || ""}
                      width={200}
                      height={200}
                      alt=""
                    />
                    <div>
                      <div className="font-semibold">
                        Adotado por {animal.usuario?.name}
                      </div>
                      <div> {animal.usuario?.email}</div>
                      <div> {animal.usuario?.telefone}</div>
                      <div> {animal.usuario?.cpf}</div>
                      {animal.status === "Pendente" ? (
                        <button
                          formAction={acceptAdoptionAction}
                          className="p-2 shadow-md bg-emerald-50 rounded-md w-full"
                        >
                          Aprovar Adoção
                        </button>
                      ) : (
                        <div className="p-2 shadow-sm bg-slate-200 rounded-md w-full flex justify-center items-center">
                          Adoção Aprovada
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
