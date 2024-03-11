import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PokemonEvolutionComponent } from './pokemon-evolution.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonService } from '../pokemon.service';

describe('PokemonEvolutionComponent', () => {
  let component: PokemonEvolutionComponent;
  let fixture: ComponentFixture<PokemonEvolutionComponent>;
  let pokemonService: PokemonService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonEvolutionComponent],
      imports: [HttpClientModule, MatIconModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
          },
        },
        PokemonService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonEvolutionComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedPokemonID on init', () => {
    expect(component.selectedPokemonID).toEqual('1');
  });

  it('should call getPokemonSpecies and getPokemonEvolutionChain on init', () => {
    const speciesSpy = spyOn(pokemonService, 'getPokemonSpecies').and.returnValue(of({}));
    const evolutionChainSpy = spyOn(pokemonService, 'getPokemonEvolutionChain').and.returnValue(of({}));
    component.ngOnInit();
    expect(speciesSpy).toHaveBeenCalledOnceWith('1');
    expect(evolutionChainSpy).toHaveBeenCalled();
  });

  it('should build the evolution chain correctly', fakeAsync(() => {
    const mockChain = {
      species: { name: 'Bulbasaur' },
      evolves_to: [{
        species: { name: 'Ivysaur' },
        evolves_to: [{
          species: { name: 'Venusaur' }
        }]
      }]
    };
    const mockDetailsBulbasaur = { id: 1, species: { name: 'Bulbasaur' }, sprites: { front_default: 'bulbasaur.png' }, evolution_details: [{ min_level: 'N/A', trigger: { name: 'N/A' } }] };
    const mockDetailsIvysaur = { id: 2, species: { name: 'Ivysaur' }, sprites: { front_default: 'ivysaur.png' }, evolution_details: [{ min_level: 'N/A', trigger: { name: 'N/A' } }] };
    const mockDetailsVenusaur = { id: 3, species: { name: 'Venusaur' }, sprites: { front_default: 'venusaur.png' }, evolution_details: [{ min_level: 'N/A', trigger: { name: 'N/A' } }] };
  
    spyOn(component['pokemonService'], 'getPokemonDetailsByName').and.callFake((name) => {
      if (name === 'Bulbasaur') return of(mockDetailsBulbasaur);
      if (name === 'Ivysaur') return of(mockDetailsIvysaur);
      if (name === 'Venusaur') return of(mockDetailsVenusaur);
      return throwError(() => new Error(`No mock data for ${name}`));
    });
  
    component.buildEvolutionChain(mockChain);
    tick();
  
    expect(component.evolutionChain.length).toBe(3);
    expect(component.evolutionChain[0]).toEqual({ speciesName: 'Bulbasaur', id: 1, minLevel: 'N/A', triggerName: 'N/A', image: 'bulbasaur.png' });
    expect(component.evolutionChain[1]).toEqual({ speciesName: 'Ivysaur', id: 2, minLevel: 'N/A', triggerName: 'N/A', image: 'ivysaur.png' });
    expect(component.evolutionChain[2]).toEqual({ speciesName: 'Venusaur', id: 3, minLevel: 'N/A', triggerName: 'N/A', image: 'venusaur.png' });
  }));
  

  it('should handle errors when fetching pokemon details', () => {
    const chain = {
      species: { name: 'Bulbasaur' },
      evolves_to: [],
    };
    spyOn(pokemonService, 'getPokemonDetailsByName').and.returnValue(of({ error: 'Error fetching details for Bulbasaur' }));
    component.buildEvolutionChain(chain);
    expect(component.evolutionChain).toEqual([
      { speciesName: 'N/A', minLevel: 'N/A', triggerName: 'N/A', image: 'default-image-path.png' },
    ]);
  });

  it('should navigate to detail tab on click', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.openDetailTab('2');
    expect(navigateSpy).toHaveBeenCalledWith(['/pokemon', '2']);
  });
});
