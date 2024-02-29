import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PokemonEvolutionComponent } from './pokemon-evolution.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

describe('PokemonEvolutionComponent', () => {
  let component: PokemonEvolutionComponent;
  let fixture: ComponentFixture<PokemonEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonEvolutionComponent ],
      imports: [HttpClientModule,MatIconModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: 1 }),
        },
      },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
