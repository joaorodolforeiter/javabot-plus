import AnimalCard from "@/src/components/AnimalCard";
import { authOptions } from "@/src/lib/authOptions";
import { prisma } from "@/src/lib/prisma";
import { Person, Plus } from "@phosphor-icons/react/dist/ssr";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    include: { orders: true, adocoes: true },
  });

  const pendingAnimals = await prisma.animal.findMany({
    where: { status: "Pendente", NOT: { usuario: null } },
  });

  return (
    <div className="flex gap-8">
      <div className="flex-1 flex flex-col gap-3">
        <Link
          className="flex p-6 shadow-sm rounded-md justify-center gap-3 items-center text-lg bg-slate-200 w-full"
          href={"/add/animal/"}
        >
          <Plus size={32} /> Adicionar um animal
        </Link>
        <h1 className="text-3xl mb-4 mt-6">Adoções não confirmadas</h1>
        <div className="flex flex-wrap gap-3">
          {pendingAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {users.map((user) => (
          <div
            className="flex rounded-md shadow-sm p-3 bg-slate-100 gap-3"
            key={user.id}
          >
            <Image
              className="w-16 h-16 object-cover rounded-md shadow-sm bg-white"
              src={String(user.image)}
              height={128}
              width={128}
              alt=""
            />
            <div>
              <div className="font-bold">{user.name}</div>
              <div className="text-sm">Compras: {user.orders.length}</div>
              <div className="text-sm">
                Animais alugados: {user.adocoes.length}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
