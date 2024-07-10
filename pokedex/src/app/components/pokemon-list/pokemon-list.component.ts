import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonResponse } from '../../models/pokemonResponse';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CardModule,AsyncPipe],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {

  pokemons: Observable<PokemonResponse> = {} as Observable<PokemonResponse>
  constructor(private pokemonService: PokemonService){

  }

  ngOnInit(): void {
   this.pokemons = this.getPokemons(151)
   
  }

  getPokemons(limit?:number,offset?: number): Observable<PokemonResponse>{
    return this.pokemonService.getPokemons(limit,offset)
  }



  
}
