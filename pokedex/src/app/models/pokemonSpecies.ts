export interface PokemonSpecies{
    id: number;
    base_happiness: number;
    capture_rate: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    evolution_chain: { url: string };
}