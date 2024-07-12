import { EvolutionDetails } from "./EvolutionDetails"

export interface EvolutionChain{
    id: number,
    chain: {
        evolves_to: EvolutionDetails[]
    }
}