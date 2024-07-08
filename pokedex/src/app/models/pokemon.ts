import { Type } from "./type";

export interface Pokemon{
    id: number,
    name: string,
    height: number,
    order: number,
    weight: number,
    types: Type[],
}