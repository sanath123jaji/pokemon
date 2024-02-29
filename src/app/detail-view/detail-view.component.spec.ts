import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewComponent } from './detail-view.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { PokemonService } from '../pokemon.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('DetailViewComponent', () => {
  let component: DetailViewComponent;
  let fixture: ComponentFixture<DetailViewComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemonDetails']);
    mockActivatedRoute = { params: of({ id: '1' }) };

    await TestBed.configureTestingModule({
      declarations: [ DetailViewComponent ],
      imports: [HttpClientModule, MatPaginatorModule, MatProgressSpinnerModule, MatIconModule, RouterModule.forRoot([])],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PokemonService, useValue: mockPokemonService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch Pokémon details on init', () => {
    const mockPokemonDetails = { name: 'Pikachu', id: 1 };
    mockPokemonService.getPokemonDetails.and.returnValue(of(mockPokemonDetails));

    component.ngOnInit();

    expect(mockPokemonService.getPokemonDetails).toHaveBeenCalledWith(1);
    expect(component.pokemon).toEqual(mockPokemonDetails);
  });
});
