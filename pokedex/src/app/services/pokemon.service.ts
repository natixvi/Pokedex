import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = "https://pokeapi.co/api/v2";
  constructor(private http: HttpClient) { }

  getPokemons(limit?: number, offset?: number): Observable<any>{
    let params = new HttpParams();

    if(offset != undefined){
      params = params.set('offset', offset.toString());
    }
    if(limit != undefined){
      params = params.set('limit', limit.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/pokemon`, { params })
  }
}
