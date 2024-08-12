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
  previousPokemon: PokemonDetails = {} as PokemonDetails;
  nextPokemon: PokemonDetails = {} as PokemonDetails;
  pokemonName: string = '';
  disablePrevButton: boolean = false;
  disableNextButton: boolean = false;

  iconClass: string = 'pi pi-arrow-right';
  
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if(id){
          this.getPokemonDetails(parseInt(id));
        }
      }
    );
    this.updateIcon(window.innerWidth);
  }

  getPokemonDetails(id: number) : void{
    this.pokemonService.getPokemonDetailsWithEvolution(id).subscribe(data =>{
      this.pokemonDetails = data.pokemonDetails,
      this.pokemonSpeciesDetails = data.speciesDetails,
      this.evolutionChain = data.evolutionChain;
      const currentId = this.pokemonDetails?.id;
      console.log(this.evolutionChain?.chain)
      if(currentId){
        if(currentId > 1){
          this.pokemonService.getPokemonById(currentId - 1).subscribe(prevData => {
            this.previousPokemon = prevData;
          })
        }
        if(currentId < 1025){
          this.pokemonService.getPokemonById(currentId + 1).subscribe(nextData => {
            this.nextPokemon = nextData;
          });
        }
      }})
  }

  moveToAnotherPokemonById(id: number){
    this.router.navigate(['/pokemon', id]);
  }

  moveToAnotherPokemonByName(name: string){
    let pokemon: PokemonDetails =  {} as PokemonDetails;
    this.pokemonService.getPokemonByName(name).subscribe(response => {
      pokemon = response,
      this.router.navigate(['/pokemon', pokemon.id])
      }
    )
   
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.updateIcon(width);
  }

  private updateIcon(width: number) {
    this.iconClass = width < 767 ? 'pi pi-arrow-down' : 'pi pi-arrow-right';
  }
  
}
