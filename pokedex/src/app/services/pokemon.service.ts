import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { concatMap, forkJoin, from, map, Observable, of, switchMap } from 'rxjs';
import { PokemonResponse } from '../models/pokemonResponse';
import { PokemonDetails } from '../models/pokemonDetails';
import { EvolutionChain } from '../models/EvolutionChain';
import { EvolutionDetails } from '../models/EvolutionDetails';
import { PokemonSpecies } from '../models/pokemonSpecies';
import { Pokemon } from '../models/pokemon';
import { pokemonTypeResponse } from '../models/pokemonTypeResponse';

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
          image: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`,
          url: pokemon.url
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
  
  getPokemonDetailsWithEvolution(id: number): Observable<any>{
    return this.getPokemonById(id).pipe(
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

  getPokemonByType(types: string[]): Observable<Pokemon[]>{

    const requests = types.map( type => this.http.get<pokemonTypeResponse>(`${this.apiUrl}/type/${type.toLowerCase()}`)
    .pipe(map(response => response.pokemon.map(pokemon =>({
      name: pokemon.pokemon.name,
      url: pokemon.pokemon.url,
      image: `https://img.pokemondb.net/artwork/large/${pokemon.pokemon.name}.jpg`
    }))))
      
    )
    return forkJoin(requests).pipe(
      map((results) => {
        if (results.length === 1) {
          return results[0];
        } else {
          return results.reduce((acc, curr) =>
            acc.filter((p: Pokemon) =>
              curr.some((p2: Pokemon) => p.name === p2.name)
            )
          );
        }
      })
    );
  
  }
}