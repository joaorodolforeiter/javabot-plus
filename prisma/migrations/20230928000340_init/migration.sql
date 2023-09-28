-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagemURL" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Adocao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataAdocao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "animalId" INTEGER NOT NULL,
    CONSTRAINT "Adocao_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
