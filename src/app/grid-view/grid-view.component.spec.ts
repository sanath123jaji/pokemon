import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {MatPaginatorModule} from '@angular/material/paginator';
import { GridViewComponent } from './grid-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { PokemonService } from '../pokemon.service';
import { ChangeDetectorRef } from '@angular/core';


describe('GridViewComponent', () => {
  let component: GridViewComponent;
  let fixture: ComponentFixture<GridViewComponent>;
  let pokemonService: PokemonService;
  const mockPokemonService = {
    getPokemons: jasmine.createSpy('getPokemons').and.returnValue(of({ results: [], count: 0 })),
    getPokemonById: jasmine.createSpy('getPokemonById').and.returnValue(of({})),
    getPokemonDetailsByName: jasmine.createSpy('getPokemonDetailsByName').and.returnValue(of({}))
  };
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridViewComponent ],
      imports: [HttpClientModule, MatPaginatorModule, MatProgressSpinnerModule, MatIconModule, RouterModule.forRoot([])],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: 1 }),
        },
      },
      { provide: PokemonService, useValue: mockPokemonService },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewComponent);
    component = fixture.componentInstance;
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    pokemonService = TestBed.inject(PokemonService);
    fixture.detectChanges();
  });


  it('should display pokemon details when list is not empty', fakeAsync(() => {
    const mockPokemons = [
      { name: 'Bulbasaur', image: 'bulbasaur.png', id: 1 },
      { name: 'Ivysaur', image: 'ivysaur.png', id: 2 }
    ];
    mockPokemonService.getPokemons.and.returnValue(of({ results: mockPokemons, count: mockPokemons.length }));
  
    component.ngOnInit();
    tick();
    changeDetectorRef.detectChanges();
  
    expect(component.totalPokemons).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.grid-item').length).toBe(2);
  }));
  
  
});
