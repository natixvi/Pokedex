import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonService } from './services/pokemon.service';
import { PokemonDetails } from './models/pokemonDetails';
import { PokemonResponse } from './models/pokemonResponse';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex';

  pokemon: PokemonDetails = {} as PokemonDetails;
  pokemonResponse: PokemonResponse = {} as PokemonResponse;

  constructor(private pokemonService: PokemonService){}

  onClickDetails(){
    this.pokemonService.getPokemonByName('bulbasaur').subscribe( (response) => {
      this.pokemon =  response;
    })
  }

  onClickAll(){
      this.pokemonService.getPokemons(151).subscribe( (response) => {
        this.pokemonResponse = response;
      })
  }

  view(){
    console.log('Pokemon Details:', this.pokemon);
    console.log('All Pokemons:', this.pokemonResponse);
  }
}