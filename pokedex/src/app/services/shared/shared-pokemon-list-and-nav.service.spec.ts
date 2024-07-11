import { TestBed } from '@angular/core/testing';

import { SharedPokemonListAndNavService } from './shared-pokemon-list-and-nav.service';

describe('SharedPokemonListAndNavService', () => {
  let service: SharedPokemonListAndNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPokemonListAndNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
