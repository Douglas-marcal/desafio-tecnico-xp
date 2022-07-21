/*
  Warnings:

  - You are about to drop the column `username` on the `Cliente` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cliente` DROP COLUMN `username`,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL;
