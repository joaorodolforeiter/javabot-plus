import { authOptions } from "@/src/lib/authOptions";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  return user?.role === "ADMIN" ? <div>É admin</div> : <div>Não é admin</div>;
}
