import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.task.create({
    data: {
        title :"title",
        description: 'desc',
        tomatoes :5,
        userName: 'admin@admin.com',
        dueDate: '21/25/2002'
    },
  });


}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })