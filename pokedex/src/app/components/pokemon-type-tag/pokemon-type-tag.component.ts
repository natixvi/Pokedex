import { Component, Input } from '@angular/core';
import { POKEMON_TYPE_COLORS } from '../../constants/colorTypes';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-type-tag',
  standalone: true,
  imports: [TagModule, CommonModule],
  templateUrl: './pokemon-type-tag.component.html',
  styleUrl: './pokemon-type-tag.component.css'
})
export class PokemonTypeTagComponent {  
  @Input() type: string = '';

  getBackgroundColor(): string {
    return POKEMON_TYPE_COLORS[this.type] || '#cccccc';
  }
}
