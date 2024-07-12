import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PokemonDetails } from '../../models/pokemonDetails';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule  } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ZeroPadPipe } from '../../pipes/zero-pad.pipe';
import { DividerModule } from 'primeng/divider';
import { PokemonTypeTagComponent } from '../pokemon-type-tag/pokemon-type-tag.component';
import { PokemonSpecies } from '../../models/pokemonSpecies';
import { EvolutionChain } from '../../models/EvolutionChain';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [RouterModule, CommonModule, ImageModule, ZeroPadPipe, DividerModule, PokemonTypeTagComponent],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent implements OnInit {


  pokemonDetails?: PokemonDetails;
  pokemonSpeciesDetails?: PokemonSpecies;
  pokemonEvolutionChain?: EvolutionChain;
  pokemonName: string = '';
  
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService){}

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
      this.pokemonEvolutionChain = data.evolutionChain;
    })
  }


}
