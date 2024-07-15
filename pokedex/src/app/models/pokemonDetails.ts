import { Type } from "./type";

export interface PokemonDetails{
    id: number;
    name: string;
    height: number;
    order: number;
    weight: number;
    types: Type[];
    species: { 
        url: string;
    };
    image: string;
}