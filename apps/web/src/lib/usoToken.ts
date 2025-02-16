import { ApiUsoToken } from "../api/usoToken";
import { AgGridColDef } from "./types";

export type ParsedUsoToken = {
    id: number;
    fechaUso: string;
    tokenUsado: string;
    tokenId: number;
    clienteId: number;
    tipoUsoId: number;
};

export const usoTokenColDefs: AgGridColDef<ParsedUsoToken> = [
    { field: "id", filter: true },
    { field: "fechaUso", filter: true },
    { field: "tokenUsado", filter: true },
    { field: "tokenId", filter: true },
    { field: "clienteId", filter: true },
    { field: "tipoUsoId", filter: true },
];

export function parseUsoTokenResponse(usos: ApiUsoToken[]): ParsedUsoToken[] {
    return usos.map((uso) => {
        const { fechaUso, ...rest } = uso;
        return {
            fechaUso: new Date(fechaUso).toLocaleString(),
            ...rest,
        };
    });
}
