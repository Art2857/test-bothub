import depfy from "depfy";

import { PrismaClient } from "@prisma/client";

export default depfy.injectable({
  factory: async () => {
    const prisma = new PrismaClient();

    await prisma.$connect();

    return prisma;
  },
});
