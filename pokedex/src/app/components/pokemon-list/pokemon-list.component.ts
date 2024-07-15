import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CardModule } from 'primeng/card';
import { Subscription} from 'rxjs';
import { SharedPokemonListAndNavService } from '../../services/shared/shared-pokemon-list-and-nav.service';
import { ButtonModule } from 'primeng/button';
import { Pokemon } from '../../models/pokemon';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit, OnDestroy{

  pokemons: Pokemon[]= []
  private subscription: Subscription = {} as Subscription
  currentLimit: number = 20
  currentOffset: number = 0
  maxLoadedPokemon: number = 0

    constructor(private pokemonService: PokemonService, private sharedPokemonListAndNav: SharedPokemonListAndNavService, private router: Router){
   
  }
 
  
  ngOnInit(): void {
    this.subscription = this.sharedPokemonListAndNav.changedParam.subscribe(params => this.getPokemons(params.limit,params.offset))
    this.getPokemons(151)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getPokemons(limit?:number,offset?: number){
    
      this.currentOffset= offset ?? 0
      this.currentLimit = 20
      this.maxLoadedPokemon = (limit?? 20) + this.currentOffset;

      this.pokemonService.getPokemons(this.currentLimit,this.currentOffset).subscribe( response => {
      this.pokemons = response.results;
      this.currentOffset += this.currentLimit;
    })

    

  }

    loadMorePokemon(): void {
    const PokemonToGet = this.maxLoadedPokemon - this.currentOffset

    if(PokemonToGet>0){
        this.currentLimit = Math.min(this.currentLimit,PokemonToGet)
        this.pokemonService.getPokemons(this.currentLimit,this.currentOffset).subscribe( response => {
        this.pokemons = [...this.pokemons, ...response.results];
        this.currentOffset += this.currentLimit;
    });
    }
    }
    moveToTop(){
      window.scrollTo({ top: 0, behavior: 'smooth' })
        }

    goToPokemonDetails(url: string) {
        const id = this.extractIdFromUrl(url);
        console.log(id)
        this.router.navigate(['/pokemon', id]);
    }

    extractIdFromUrl(url: string): number {
        const parts = url.split('/');
        return +parts[parts.length - 2];
    }

}

