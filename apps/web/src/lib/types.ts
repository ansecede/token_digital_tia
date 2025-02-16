export type TypeKeys<T> = keyof T;

export type AgGridColDef<T> = Array<{
    field: TypeKeys<T>;
    filter: boolean;
    flex?: number;
}>;
