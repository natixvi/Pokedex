import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { PokemonResponse } from '../models/pokemonResponse';
import { PokemonDetails } from '../models/pokemonDetails';
import { EvolutionChain } from '../models/EvolutionChain';
import { EvolutionDetails } from '../models/EvolutionDetails';
import { PokemonSpecies } from '../models/pokemonSpecies';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = "https://pokeapi.co/api/v2";
  constructor(private http: HttpClient) { }

  getPokemons(limit?: number, offset?: number): Observable<PokemonResponse>{
    let params = new HttpParams();

    if(offset != undefined){
      params = params.set('offset', offset.toString());
    }
    if(limit != undefined){
      params = params.set('limit', limit.toString());
    }

    return this.http.get<PokemonResponse>(`${this.apiUrl}/pokemon`, { params }).pipe(
      map(response => ({
        next: response.next,
        results: response.results.map( pokemon => ({
          name: pokemon.name,
          image: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`
        }))
      } as PokemonResponse))
    );
  }

  getPokemonByName(name: string): Observable<PokemonDetails>{
    return this.http.get<PokemonDetails>(`${this.apiUrl}/pokemon/${name}/`).pipe(
      map(response => ({
        id: response.id,
        name: response.name,
        height: response.height,
        order: response.order,
        weight: response.weight,
        types: response.types,
        species: { url: response.species.url },
        image: `https://img.pokemondb.net/artwork/large/${response.name}.jpg`
      } as PokemonDetails))
    );

  }

  getPokemonById(id: number): Observable<PokemonDetails>{
    return this.http.get<PokemonDetails>(`${this.apiUrl}/pokemon/${id}/`).pipe(
      map(response => ({
        id: response.id,
        name: response.name,
        height: response.height,
        order: response.order,
        weight: response.weight,
        types: response.types,
        species: { url: response.species.url },
        image: `https://img.pokemondb.net/artwork/large/${response.name}.jpg`
      } as PokemonDetails))
    );
  }


  getPokemonSpecies(url: string): Observable<PokemonSpecies>{
    return this.http.get<PokemonSpecies>(url).pipe(
      map(response => ({
        id: response.id,
        base_happiness: response.base_happiness,
        capture_rate: response.capture_rate,
        is_baby: response.is_baby,
        is_legendary: response.is_legendary,
        is_mythical: response.is_mythical,
        evolution_chain: { url: response.evolution_chain.url}
      } as PokemonSpecies))
    );
  }

  getEvolutionChain(url: string): Observable<EvolutionChain> {
    return this.http.get<any>(url).pipe( 
      map(response => ({
        id: response.id,
        chain: this.mapEvolutionChain(response.chain)
      }))
    );
  }

  private mapEvolutionChain(chain: any): EvolutionDetails {
    return {
      species: {
        name: chain.species.name
      },
      image: `https://img.pokemondb.net/artwork/large/${chain.species.name}.jpg`,
      evolves_to: chain.evolves_to.map((evolve: any) => this.mapEvolutionChain(evolve))
    };
  }
  
  getPokemonDetailsWithEvolution(name: string): Observable<any>{
    return this.getPokemonByName(name).pipe(
      switchMap(pokemonDetails => 
        this.getPokemonSpecies(pokemonDetails.species.url).pipe(
          switchMap(speciesDetails => 
            this.getEvolutionChain(speciesDetails.evolution_chain.url).pipe(
              map(evolutionChain => ({
                pokemonDetails,
                speciesDetails,
                evolutionChain
              }))
            ))
        ))
    )
  }
}
