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
                {label:'National', command: () => this.sharedPokemonListAndNav.changePokemonParam(1025)},
                {label:'Generation I', command: () => this.sharedPokemonListAndNav.changePokemonParam(151)},
                {label:'Generation II', command: () => this.sharedPokemonListAndNav.changePokemonParam(100,151)},
                {label:'Generation III',command: () => this.sharedPokemonListAndNav.changePokemonParam(135,251)},
                {label:'Generation IV',command: () => this.sharedPokemonListAndNav.changePokemonParam(106,386)},
                {label:'Generation V',command: () => this.sharedPokemonListAndNav.changePokemonParam(155,493)},
                {label:'Generation VI',command: () => this.sharedPokemonListAndNav.changePokemonParam(71,649)},
                {label:'Generation VII',command: () => this.sharedPokemonListAndNav.changePokemonParam(87,721)},
                {label:'Generation VIII',command: () => this.sharedPokemonListAndNav.changePokemonParam(95,809)},
                {label:'Generation IX',command: () => this.sharedPokemonListAndNav.changePokemonParam(119,905)}
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

