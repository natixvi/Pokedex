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

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [RouterModule, CommonModule, ImageModule, ZeroPadPipe, DividerModule, PokemonTypeTagComponent],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent implements OnInit {


  pokemonDetails$?: Observable<PokemonDetails>;
  pokemonName: string = '';
  
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService){}

  ngOnInit(): void {
    this.pokemonDetails$ = this.route.paramMap.pipe(
      switchMap( params =>
        this.getPokemon(params.get('name') as string)
      ) 
    );
  }

  getPokemon(name: string) : Observable<PokemonDetails>{
    return this.pokemonService.getPokemonByName(name);
  }


}
