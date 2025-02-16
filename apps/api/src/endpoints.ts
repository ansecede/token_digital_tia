import { Router, Request } from "express";
import { GenerarTokenQueryParams, UsarTokenQueryParams } from "./types";
import { PrismaClient } from "@prisma/client";
import {
    calcTimeLeft,
    createToken,
    invalidateToken,
    tokenGeneratorFactory,
} from "./Token";

const router: Router = Router();
const prisma = new PrismaClient();

router.get(
    "/generarToken",
    async (req: Request<{}, {}, {}, GenerarTokenQueryParams>, res) => {
        const clientePorBuscar = req.query.cliente;
        if (!clientePorBuscar) {
            const statusCode = 400;
            return res.status(statusCode).json({
                statusCode,
                error: "Bad Request",
                message: "ID del cliente es requerido",
            });
        }
        const cliente = await prisma.usuario.findUnique({
            where: { id: +clientePorBuscar },
        });
        if (!cliente) {
            const statusCode = 400;
            return res.status(statusCode).json({
                statusCode,
                error: "Bad Request",
                message: "Cliente no existe",
            });
        }

        const tokenActivo = await prisma.token.findFirst({
            where: { usuarioId: cliente.id, activo: true },
        });

        const tokenGenerator = tokenGeneratorFactory("simple");
        if (tokenActivo) {
            // Calcular tiempo restante
            const timeLeft = calcTimeLeft(tokenActivo);

            if (timeLeft < 0) {
                // Si el tiempo restante ya paso, invalidar ese token y generar uno nuevo
                invalidateToken(tokenActivo, prisma);
                const newToken = await createToken(
                    cliente.id,
                    prisma,
                    tokenGenerator
                );
                res.send({
                    data: {
                        token: newToken,
                        timeLeft: 61,
                    },
                });
            } else {
                // Devolver el token con el tiempo restante
                res.send({
                    data: {
                        token: tokenActivo,
                        timeLeft: timeLeft,
                    },
                });
            }
        } else {
            // Generar el primer token para el cliente y agregarlo a la db
            const newToken = await createToken(
                cliente.id,
                prisma,
                tokenGenerator
            );
            res.send({
                data: {
                    token: newToken,
                    timeLeft: 61,
                },
            });
        }
    }
);

router.get(
    "/usarToken",
    async (req: Request<{}, {}, {}, UsarTokenQueryParams>, res) => {
        const idCliente = req.query.cliente;
        const tokenEnviado = req.query.token;

        const token = await prisma.token.findFirst({
            where: { usuarioId: +idCliente, activo: true },
        });

        if (token) {
            // Calcular tiempo restante
            const timeLeft = 0;

            if (timeLeft < 0) {
                // Si el tiempo restante ya paso, invalidar ese token y devolver error
            } else {
                // Comparar tokens
            }
        } else {
            // Este usuario no ha generado ningun token aun, así que devolver error
        }
    }
);

export default router;
