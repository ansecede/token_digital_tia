"use client";
import {
    AllCommunityModule,
    ModuleRegistry,
    themeQuartz,
    colorSchemeDark,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/src/components/ui/button";
import useChangeTableData from "./useChangeTableData";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export default function TablePage() {
    const { tableData, index, setIndex } = useChangeTableData();

    return (
        <div className="h-full p-10 grid grid-cols-[20%_80%]">
            <div className="flex flex-col items-center justify-center gap-10">
                <Button onClick={() => setIndex("token")}>
                    Tokens Generados
                </Button>
                <Button onClick={() => setIndex("usos")}>
                    Usos de los Tokens
                </Button>
            </div>
            <AgGridReact
                rowData={tableData[index].rows}
                columnDefs={tableData[index].cols}
                theme={themeQuartz.withPart(colorSchemeDark)}
            />
        </div>
    );
}
