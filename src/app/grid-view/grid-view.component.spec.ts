import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {MatPaginatorModule} from '@angular/material/paginator';
import { GridViewComponent } from './grid-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { PokemonService } from '../pokemon.service';

describe('GridViewComponent', () => {
  let component: GridViewComponent;
  let fixture: ComponentFixture<GridViewComponent>;
  let pokemonService: PokemonService;
  const mockPokemonService = {
    getPokemons: jasmine.createSpy('getPokemons').and.returnValue(of({ results: [], count: 0 })),
    getPokemonById: jasmine.createSpy('getPokemonById').and.returnValue(of({}))
  };

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pokemons on init', () => {
    expect(pokemonService.getPokemons).toHaveBeenCalled();
  });

  it('should update paginator on page event', () => {
    const event = { pageIndex: 2, pageSize: 9 };
    component.handlePageEvent(event);
    expect(component.paginator.pageIndex).toBe(event.pageIndex);
  });

  it('should call fetchPokemons on init', () => {
    spyOn(component, 'fetchPokemons');
    component.ngOnInit();
    expect(component.fetchPokemons).toHaveBeenCalled();
  });

  it('should set showSpinner to false after data is fetched', fakeAsync(() => {
    component.fetchPokemons();
    tick();
    expect(component.showSpinner).toBeFalse();
  }));
});
