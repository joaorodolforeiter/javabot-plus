import { getServerSession } from "next-auth";
import { prisma } from "@/src/lib/prisma";
import { authOptions } from "@/src/lib/authOptions";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    include: {
      adocoes: true,
    },
  });

  return (
    <div className="flex flex-wrap justify-center m-3 items-center gap-5">
      {user?.adocoes.map((adocao) => (
        <Link
          href={`/animals/${adocao.id}`}
          key={String(adocao.id)}
          className="flex max-w-sm w-full bg-slate-100 p-3 gap-3 shadow-md rounded-md"
        >
          <Image
            className="object-cover rounded-md shadow-md aspect-square w-28"
            height={200}
            width={200}
            alt="Imagem do animal"
            src={adocao.imagemURL}
          />
          <div className="flex flex-col gap-1">
            <div className="text-xl">{adocao.nome}</div>
            <div>{adocao.especie}</div>
            {adocao.status === "Pendente" ? (
              <div className="bg-red-300 p-2 rounded-md">Adoção Pendente</div>
            ) : (
              <div className="bg-emerald-50 p-2 rounded-md">
                Adoção Confirmada
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
