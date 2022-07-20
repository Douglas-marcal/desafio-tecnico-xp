/*
  Warnings:

  - A unique constraint covering the columns `[NomeAtivo]` on the table `Ativo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Ativo_NomeAtivo_key` ON `Ativo`(`NomeAtivo`);
