import { PrismaClient } from "@prisma/client";
import { createDefaultUsers } from "./usuarios.factory";
import { createTokenUsageTypes } from "./tipoUsoToken.factory";

const prisma = new PrismaClient();
async function main() {
    await createDefaultUsers(prisma);
    await createTokenUsageTypes(prisma);
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
