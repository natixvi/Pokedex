import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { PokemonDetails } from '../../models/pokemonDetails';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule  } from '@angular/common';
import { ZeroPadPipe } from '../../pipes/zero-pad.pipe';
import { PokemonTypeTagComponent } from '../pokemon-type-tag/pokemon-type-tag.component';
import { PokemonSpecies } from '../../models/pokemonSpecies';
import { EvolutionChain } from '../../models/EvolutionChain';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [RouterModule, CommonModule, ZeroPadPipe, FieldsetModule, CardModule, PokemonTypeTagComponent, ButtonModule],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent implements OnInit {


  pokemonDetails?: PokemonDetails;
  pokemonSpeciesDetails?: PokemonSpecies;
  evolutionChain?: EvolutionChain;
  evolutionChainList: any[] = [];
  isVertical: boolean = false;
  previousPokemon: PokemonDetails = {} as PokemonDetails;
  nextPokemon: PokemonDetails = {} as PokemonDetails;

  pokemonName: string = '';
  
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const name = params.get('name');
        if(name){
          this.getPokemonDetails(name);
        }
      }
    );
  }

  getPokemonDetails(name: string) : void{
    this.pokemonService.getPokemonDetailsWithEvolution(name).subscribe(data =>{
      this.pokemonDetails = data.pokemonDetails,
      this.pokemonSpeciesDetails = data.speciesDetails,
      this.evolutionChain = data.evolutionChain;
      const currentId = this.pokemonDetails?.id;
      console.log(currentId)
      if(currentId && currentId > 1){
        this.pokemonService.getPokemonById(currentId - 1).subscribe(prevData => {
          this.previousPokemon = prevData;
        });
      }
      else{
        this.previousPokemon = {} as PokemonDetails;
      }
      if(currentId && currentId < 1302){
        this.pokemonService.getPokemonById(currentId + 1).subscribe(nextData => {
          this.nextPokemon = nextData;
        });
      }else{
        this.nextPokemon = {} as PokemonDetails;
      }

      })
  }

  getPreviousAndNextPokemonDetails(){
    this.pokemonService
  }

  moveToAnotherPokemon(name: string){
    this.router.navigate(['/pokemon', name]);
  }


}
