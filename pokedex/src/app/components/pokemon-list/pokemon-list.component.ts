import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonResponse } from '../../models/pokemonResponse';
import { CardModule } from 'primeng/card';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SharedPokemonListAndNavService } from '../../services/shared/shared-pokemon-list-and-nav.service';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CardModule,AsyncPipe],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit, OnDestroy {

  pokemons: Observable<PokemonResponse> = {} as Observable<PokemonResponse>
  private subscription: Subscription
  constructor(private pokemonService: PokemonService, private sharedPokemonListAndNav: SharedPokemonListAndNavService){
    this.subscription = this.sharedPokemonListAndNav.changedParam.subscribe(params => this.getPokemons(params.limit,params.offset))
  }
  
  ngOnInit(): void {
   this.getPokemons(386)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getPokemons(limit?:number,offset?: number){
    this.pokemons = this.pokemonService.getPokemons(limit,offset)
  }



  
}
