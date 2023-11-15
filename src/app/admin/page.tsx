import { authOptions } from "@/src/lib/authOptions";
import { prisma } from "@/src/lib/prisma";
import { Person } from "@phosphor-icons/react/dist/ssr";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  const users = await prisma.user.findMany({
    include: { orders: true, adocoes: true },
  });

  return (
    <div className="flex">
      <div className="flex-1">
        {user?.role === "ADMIN" ? <div>É admin</div> : <div>Não é admin</div>}
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
