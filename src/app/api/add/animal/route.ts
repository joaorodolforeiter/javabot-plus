import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const animal = await prisma.animal.create({
    data: {
      nome: data.name,
      especie: data.especie,
      idade: Number(data.idade),
      descricao: data.descricao,
      imagemURL: data.imageURL,
    },
  });
  console.log(animal);
  return NextResponse.json({ animal });
}
