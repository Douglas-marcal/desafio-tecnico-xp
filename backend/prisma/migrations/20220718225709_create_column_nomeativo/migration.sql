/*
  Warnings:

  - Added the required column `NomeAtivo` to the `Ativo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ativo` ADD COLUMN `NomeAtivo` VARCHAR(191) NOT NULL;
