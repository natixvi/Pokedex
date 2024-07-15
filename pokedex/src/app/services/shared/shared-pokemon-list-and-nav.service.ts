import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedPokemonListAndNavService {
  private changeGetPokemonParam = new Subject<{limit?: number, offset?: number}>();
  changedParam = this.changeGetPokemonParam.asObservable();

  changePokemonParam(limit?: number, offset?: number){
    this.changeGetPokemonParam.next({limit,offset});
    this.router.navigate([''])
  }
  constructor(private router: Router) { }
}
