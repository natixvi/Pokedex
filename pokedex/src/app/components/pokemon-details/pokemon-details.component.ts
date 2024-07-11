import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PokemonDetails } from '../../models/pokemonDetails';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent implements OnInit {


  pokemonDetails?: Observable<PokemonDetails>;
  pokemonName: string = '';
  
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService){}

  ngOnInit(): void {
    this.pokemonDetails = this.route.paramMap.pipe(
      switchMap( (params: ParamMap) =>
        this.getPokemon(params.get('name') as string)
      ) 
    );
  }

  getPokemon(name: string) : Observable<PokemonDetails>{
    return this.pokemonService.getPokemonByName(name);
  }

}
