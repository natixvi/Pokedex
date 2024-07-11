import {Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SharedPokemonListAndNavService } from '../../services/shared/shared-pokemon-list-and-nav.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
 
  items?: MenuItem[];

  constructor(private sharedPokemonListAndNav: SharedPokemonListAndNavService){

  }


  ngOnInit(): void {
    this.items =[
        {
          label: 'Pokemon`s',
          icon: 'pokeball-icon',
          items: [
            {
              label: 'Generation',
              items:[
                {label:'National', command: () => this.sharedPokemonListAndNav.changePokemonParam(386)},
                {label:'Kanto', command: () => this.sharedPokemonListAndNav.changePokemonParam(151)},
                {label:'Jotho', command: () => this.sharedPokemonListAndNav.changePokemonParam(100,151)},
                {label:'Hoen',command: () => this.sharedPokemonListAndNav.changePokemonParam(135,251)}
              ]
            },
            {
              label: 'Types',
              items:[
                {label:'Bug'},
                {label:'Dark'},
                {label:'Dragon'},
                {label:'Electric'},
                {label:'Fairy'},
                {label:'Fighting'},
                {label:'Fire'},
                {label:'Flying'},
                {label:'Ghost'},
                {label:'Grass'},
                {label:'Ground'},
                {label:'Ice'},
                {label:'Normal'},
                {label:'Poison'},
                {label:'Psychic'},
                {label:'Rock'},
                {label:'Steel'},
                {label:'Water'}
              ]
            }           
          ]
        }
    ]
  }

  
}

