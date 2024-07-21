import { Column } from "./column.type";

export interface Board{
    id: string,
    columnOrder: string[],
    columns: Column[],
}