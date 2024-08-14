import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarToPokemonListService {

  private typesSubject = new BehaviorSubject<string[]>([])
  public types$ = this.typesSubject.asObservable()
  constructor() { }

  sendTypesToListComponent(types: string[]){
    this.typesSubject.next(types)
    this.typesSubject.next([])
  }
}
