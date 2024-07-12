import { Pokemon } from "./pokemon";

export interface PokemonResponse{
    next: string | null;
    results: Pokemon[];
}