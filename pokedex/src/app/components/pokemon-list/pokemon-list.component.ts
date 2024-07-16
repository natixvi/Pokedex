import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Pokemon } from '../../models/pokemon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit, OnDestroy{

  pokemons: Pokemon[]= []
  currentLimit: number = 20
  currentOffset: number = 0
  maxLoadedPokemon: number = 0

    constructor(private pokemonService: PokemonService, private router: Router, private route: ActivatedRoute){
   
  }
 
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentLimit = +params['limit'] || 20;
      this.currentOffset = +params['offset'] || 0;  
      this.maxLoadedPokemon = this.currentOffset + this.currentLimit;
      this.getPokemons();
    });
   
  }

  ngOnDestroy(): void {
   
  }


  getPokemons(){
  
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

