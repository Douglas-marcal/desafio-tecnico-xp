/*
  Warnings:

  - You are about to alter the column `Valor` on the `Ativo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.
  - You are about to alter the column `Saldo` on the `Cliente` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.

*/
-- AlterTable
ALTER TABLE `Ativo` MODIFY `Valor` DECIMAL(65, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Cliente` MODIFY `Saldo` DECIMAL(65, 2) NOT NULL;
