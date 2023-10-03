import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../../../lib/authOptions";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const adocoes = await prisma.adocao.findMany({
    where: {
      usuario: { email: session?.user?.email },
    },
    include: {
      animal: true,
    },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      {adocoes.map((adocao) => (
        <div
          key={String(adocao.dataAdocao)}
          className="flex bg-slate-200 p-3 gap-3 shadow-md rounded-md"
        >
          <Image
            className="object-cover rounded-md shadow-md aspect-square w-28"
            height={200}
            width={200}
            alt="Imagem do animal"
            src={adocao.animal.imagemURL}
          />
          <div>
            <div className="text-xl">{adocao.animal.nome}</div>
            <div>{String(adocao.dataAdocao)}</div>
            <div>{adocao.animal.especie}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
