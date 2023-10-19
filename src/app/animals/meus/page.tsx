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
    <div className="flex flex-col m-3 items-center gap-3">
      {user?.adocoes.map((adocao) => (
        <Link
          href={`/animals/${adocao.id}`}
          key={String(adocao.id)}
          className="flex max-w-sm w-full bg-slate-200 p-3 gap-3 shadow-md rounded-md"
        >
          <Image
            className="object-cover rounded-md shadow-md aspect-square w-28"
            height={200}
            width={200}
            alt="Imagem do animal"
            src={adocao.imagemURL}
          />
          <div>
            <div className="text-xl">{adocao.nome}</div>
            <div>{adocao.especie}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
