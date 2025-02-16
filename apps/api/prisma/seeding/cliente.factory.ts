import { PrismaClient } from "@prisma/client";

export async function createDefaultCustomers(prisma: PrismaClient) {
    const clientes = [
        { id: 1, nombre: "Andres" },
        { id: 2, nombre: "Daniel" },
        { id: 3, nombre: "Jose" },
        { id: 4, nombre: "Sara" },
        { id: 5, nombre: "Mateo" },
        { id: 6, nombre: "Maria" },
    ];
    const creados: (typeof clientes)[number][] = [];
    clientes.forEach(async (cliente) => {
        const insertado = await prisma.cliente.upsert({
            where: { id: cliente.id },
            update: {},
            create: cliente,
        });
        creados.push(insertado);
    });
    console.log({ created: creados });
}
