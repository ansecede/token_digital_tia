import { PrismaClient } from "@prisma/client";

export async function createDefaultUsers(prisma: PrismaClient) {
    const usuarios = [
        { id: 1, nombre: "Andres" },
        { id: 2, nombre: "Daniel" },
        { id: 3, nombre: "Jose" },
        { id: 4, nombre: "Sara" },
        { id: 5, nombre: "Mateo" },
        { id: 6, nombre: "Maria" },
    ];
    const creados: (typeof usuarios)[number][] = [];
    usuarios.forEach(async (usuario) => {
        const insertado = await prisma.usuario.upsert({
            where: { id: usuario.id },
            update: {},
            create: usuario,
        });
        creados.push(insertado);
    });
    console.log({ created: creados });
}
