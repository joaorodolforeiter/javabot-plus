/*
  Warnings:

  - Added the required column `usuarioId` to the `Adocao` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "endereco" TEXT,
    "telefone" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adocao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataAdocao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "animalId" INTEGER NOT NULL,
    CONSTRAINT "Adocao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Adocao_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Adocao" ("animalId", "dataAdocao", "id") SELECT "animalId", "dataAdocao", "id" FROM "Adocao";
DROP TABLE "Adocao";
ALTER TABLE "new_Adocao" RENAME TO "Adocao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
