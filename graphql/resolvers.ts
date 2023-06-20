import prisma from "../lib/prims";

export const resolvers = {
    Query: {
      tasks: async (_parent: any, _args: any, _context: any) => {
        return await prisma.task.findMany();
      },
    },
  };