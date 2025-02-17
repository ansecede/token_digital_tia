import { ApiUsoToken } from "../api/usoToken";
import { AgGridColDef } from "./types";

export type ParsedUsoToken = {
    id: number;
    fechaUso: string;
    tokenUsado: string;
    tokenId: number;
    nombreCliente: string;
    tipoUsoDescripcion: string;
};

export const usoTokenColDefs: AgGridColDef<ParsedUsoToken> = [
    { field: "id", filter: true },
    { field: "fechaUso", filter: true },
    { field: "tokenUsado", filter: true },
    { field: "tokenId", filter: true },
    { field: "nombreCliente", filter: true },
    { field: "tipoUsoDescripcion", filter: true },
];

export function parseUsoTokenResponse(usos: ApiUsoToken[]): ParsedUsoToken[] {
    return usos.map((uso) => {
        const { fechaUso, tipoUso, cliente, ...rest } = uso;
        return {
            fechaUso: new Date(fechaUso).toLocaleString(),
            tipoUsoDescripcion: tipoUso.descripcion,
            nombreCliente: cliente.nombre,

            ...rest,
        };
    });
}
