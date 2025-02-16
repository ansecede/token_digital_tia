/* lib/db.js */
import { PrismaClient } from "@prisma/client";

// @ts-expect-error Trying to extend global module
if (!global.prisma) {
    // @ts-expect-error Trying to extend global module
    global.prisma = new PrismaClient();
}

// @ts-expect-error Trying to extend global module
export default global.prisma as PrismaClient;
