import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [PanelMenuModule, BadgeModule, CommonModule,ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
 
  items?: MenuItem[];
  selectedTypes: string[] =[]

  constructor(private router: Router){

  }


  ngOnInit(): void {
    this.items =[
        {
          label: 'Pokemon`s',
          icon: 'pokeball-icon',
          items: [
            {
              label: 'Generation',
              icon: 'pi pi-angle-down',
              items:[
                {label:'National', command: () => this.navigateToGeneration(1025,0)},
                {label:'Generation I', command: () => this.navigateToGeneration(151,0)},
                {label:'Generation II', command: () => this.navigateToGeneration(100,151)},
                {label:'Generation III',command: () => this.navigateToGeneration(135,251)},
                {label:'Generation IV',command: () => this.navigateToGeneration(106,386)},
                {label:'Generation V',command: () => this.navigateToGeneration(155,493)},
                {label:'Generation VI',command: () => this.navigateToGeneration(71,649)},
                {label:'Generation VII',command: () => this.navigateToGeneration(87,721)},
                {label:'Generation VIII',command: () => this.navigateToGeneration(95,809)},
                {label:'Generation IX',command: () => this.navigateToGeneration(119,905)}
              ]
            },
            {
              label: 'Types',
              icon: 'pi pi-angle-down',
              items:[
                {label:'Bug',icon:'', command: () => this.addToSelectType('Bug')},
                {label:'Dark',icon:'', command: () => this.addToSelectType('Dark') },
                {label:'Dragon',icon:'', command: () => this.addToSelectType('Dragon')},
                {label:'Electric',icon:'', command: () => this.addToSelectType('Electric')},
                {label:'Fairy',icon:'', command: () => this.addToSelectType('Fairy')},
                {label:'Fighting',icon:'', command: () => this.addToSelectType('Fighting')},
                {label:'Fire',icon:'', command: () => this.addToSelectType('Fire')},
                {label:'Flying',icon:'', command: () => this.addToSelectType('Flying')},
                {label:'Ghost',icon:'', command: () => this.addToSelectType('Ghost')},
                {label:'Grass',icon:'', command: () => this.addToSelectType('Grass')},
                {label:'Ground',icon:'', command: () => this.addToSelectType('Ground')},
                {label:'Ice',icon:'', command: () => this.addToSelectType('Ice')},
                {label:'Normal',icon:'', command: () => this.addToSelectType('Normal')},
                {label:'Poison',icon:'', command: () => this.addToSelectType('Poison')},
                {label:'Psychic',icon:'', command: () => this.addToSelectType('Psychic')},
                {label:'Rock',icon:'', command: () => this.addToSelectType('Rock')},
                {label:'Steel',icon:'', command: () => this.addToSelectType('Steel')},
                {label:'Water',icon:'', command: () => this.addToSelectType('Water')},
                {label:'Search', icon:'pi pi-search right', command: () => this.sendTypesToListComponent(this.selectedTypes)}
              ]
            }           
          ]
        }
    ]
  }
  sendTypesToListComponent(selectedTypes: string[]): void {
    this.router.navigate(['/pokemons'], { queryParams: { types: selectedTypes.join(',') } });
  }

  addToSelectType(item: string){
      const ifExist:number = this.selectedTypes.indexOf(item)
      if(ifExist !==-1){
        this.selectedTypes.splice(ifExist,1);
        this.updateIconState(item,true);
      }
   
      else{
        if(this.selectedTypes.length==2){
           const removed = this.selectedTypes.splice(0,1)
           this.updateIconState(removed[0],true);
         }
        this.selectedTypes.push(item)
        this.updateIconState(item,false);
      }       
      
    }

    updateIconState(itemLabel: string, add:boolean) {
      
      if(this.items && this.items[0].items && this.items[0].items[1].items){
        
      const n = this.items[0].items[1].items.findIndex(l => l.label == itemLabel)
        if(add){
          this.items[0].items[1].items[n].icon = ''
        }
      else{
        this.items[0].items[1].items[n].icon='pi pi-check'
      }
      
       
    }
   
    }
    
    navigateToGeneration(limit: number, offset: number): void {

      this.router.navigate(['/pokemons'], { queryParams: { limit, offset } });
    }

    
   
}

