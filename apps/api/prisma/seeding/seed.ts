import { PrismaClient } from "@prisma/client";
import { createDefaultUsers } from "./usuarios.factory";

const prisma = new PrismaClient();
async function main() {
    await createDefaultUsers(prisma);
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
