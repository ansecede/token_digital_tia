import { getAllTokens } from "@/src/api/Token";
import { getUsosToken } from "@/src/api/usoToken";
import { ParsedToken, tokenColDefs } from "@/src/lib/Token";
import { AgGridColDef, TypeKeys } from "@/src/lib/types";
import { ParsedUsoToken, usoTokenColDefs } from "@/src/lib/usoToken";
import { useEffect, useState } from "react";

type TableData = {
    token: {
        cols: AgGridColDef<ParsedToken>;
        rows: ParsedToken[];
    };
    usos: {
        cols: AgGridColDef<ParsedUsoToken>;
        rows: ParsedUsoToken[];
    };
};
type TableTypes = TypeKeys<TableData>;

export default function useChangeTableData() {
    const [index, setIndex] = useState<TableTypes>("token");
    const [usos, setUsos] = useState<ParsedUsoToken[]>();
    const [tokens, setTokens] = useState<ParsedToken[]>();

    useEffect(() => {
        async function fetchToken() {
            const usos = await getUsosToken();
            const tokens = await getAllTokens();

            setTokens(tokens);
            setUsos(usos);
        }

        fetchToken();
    }, [index]);

    const tableData: TableData = {
        token: {
            cols: tokenColDefs,
            rows: tokens ?? [],
        },
        usos: {
            cols: usoTokenColDefs,
            rows: usos ?? [],
        },
    };

    return { tableData, index, setIndex };
}
