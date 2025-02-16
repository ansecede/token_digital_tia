import { AgGridColDef } from "./types";
import { ApiToken } from "../api/Token";

export type ParsedToken = {
    id: number;
    token: string;
    fechaGeneracion: string;
    fechaExpiracion: string;
    activo: boolean;
    nombreCliente: string;
};

export const tokenColDefs: AgGridColDef<ParsedToken> = [
    { field: "id", filter: true, flex: 0.75 },
    { field: "token", filter: true, flex: 0.75 },
    { field: "fechaGeneracion", filter: true },
    { field: "fechaExpiracion", filter: true },
    { field: "activo", filter: true, flex: 0.75 },
    { field: "nombreCliente", filter: true },
];

export function parseTokenReponse(token: ApiToken[]): ParsedToken[] {
    return token.map((token) => {
        const { fechaGeneracion, fechaExpiracion, cliente, ...rest } = token;
        return {
            fechaGeneracion: new Date(fechaGeneracion).toLocaleString(),
            fechaExpiracion: new Date(fechaExpiracion).toLocaleString(),
            nombreCliente: cliente.nombre,
            ...rest,
        };
    });
}
