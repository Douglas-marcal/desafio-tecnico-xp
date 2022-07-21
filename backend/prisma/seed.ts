import { PrismaClient } from '@prisma/client';

import assets from './assets';

const prisma = new PrismaClient();

async function main() {
  assets.forEach(async (asset) => {
    await prisma.ativo.create({
      data: asset,
    });
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
