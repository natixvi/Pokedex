import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Pokemon } from '../../models/pokemon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NavbarToPokemonListService } from '../../services/shared/navbar-to-pokemon-list.service';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterModule,SpinnerComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit, OnDestroy{

  pokemons: Pokemon[]= []
  types: string[] = []
  currentLimit: number = 20
  currentOffset: number = 0
  maxLoadedPokemon: number = 0
  isLoading:boolean = false;

    constructor(private pokemonService: PokemonService, private router: Router, private route: ActivatedRoute,private pokemonNavbarToPokemonList: NavbarToPokemonListService){
   
  }
 
  
  ngOnInit(): void {
 
    this.route.queryParams.subscribe(params => {
      let limit = +params['limit'] || 151
      let offset = +params['offset'] || 0;  
      if (this.types.length === 0) {
      this.getPokemons(limit,offset);
      }
    });


    this.pokemonNavbarToPokemonList.types$.subscribe(response => {
      this.types = response
      if (response.length > 0) {
      this.getPokemonsByType(this.types)
      }
      })
 
   
  }

  ngOnDestroy(): void {
   
  }


  getPokemons(limit?:number,offset?: number){
      this.isLoading = true
      this.currentOffset= offset ?? 0
      this.currentLimit = 20
      this.maxLoadedPokemon = (limit?? 20) + this.currentOffset;  

      this.pokemonService.getPokemons(this.currentLimit,this.currentOffset).subscribe( response => {
      this.pokemons = response.results;
      this.currentOffset += this.currentLimit;
      setTimeout(() => {this.isLoading= false},1500 )
    })

  }
  getPokemonsByType(types: string[]){
    this.pokemonService.getPokemonByType(types).subscribe(response =>{this.pokemons = response; this.currentOffset=1; this.maxLoadedPokemon=1})
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

