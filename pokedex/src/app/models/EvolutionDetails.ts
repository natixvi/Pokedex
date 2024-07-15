export interface EvolutionDetails{
    species: {
        name: string,
    };
    image: string;
    evolves_to?: EvolutionDetails[];
}