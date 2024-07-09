import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PokemonResponse } from '../models/pokemonResponse';
import { PokemonDetails } from '../models/pokemonDetails';

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
        results: response.results
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
        species: { url: response.species.url }
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
        species: { url: response.species.url }
      } as PokemonDetails))
    );
  }
}
