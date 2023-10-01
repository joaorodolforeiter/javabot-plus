import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  prisma.animal.create({
    data: {
      nome: data.name,
      especie: data.especie,
      idade: data.idade,
      descricao: data.descricao,
      imagemURL: data.imageURL,
    },
  });
  return NextResponse.json({ data });
}
