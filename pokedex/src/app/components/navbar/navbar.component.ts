import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
 
  items?: MenuItem[];

  constructor(){

  }

  ngOnInit(): void {
    this.items =[
        {
          label: 'Files',
          icon: 'pi pi-file',
          items: [
            {label: 'Gen-1',},
            {label: 'Gen-2',},
            {label: 'Gen-3',}
            
          ]
        }
    ]
  }

}
