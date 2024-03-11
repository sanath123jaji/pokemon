import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonDetailsComponent ],
      imports: [MatCardModule, MatIconModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind pokemon input', () => {
    const mockPokemon = {
      name: 'Pikachu',
      base_experience: 112,
      height: 4,
      weight: 60,
      abilities: [{ ability: { name: 'static' } }],
      types: [{ type: { name: 'electric' } }],
      stats: [{ stat: { name: 'speed' }, base_stat: 90 }],
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://example.com/sprite.png'
          }
        }
      }
    };
    component.pokemon = mockPokemon;
    fixture.detectChanges();
  
    const titleElement = fixture.nativeElement.querySelector('mat-card-title');
    expect(titleElement.textContent).toContain('Pikachu');
  });

  it('should return correct sprite URL', () => {
    component.pokemon = {
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://example.com/sprite.png'
          }
        }
      }
    };
  
    expect(component.getSpriteUrl()).toEqual('https://example.com/sprite.png');
  });

  it('should return abilities as comma-separated string', () => {
    component.pokemon = {
      abilities: [
        { ability: { name: 'static' } },
        { ability: { name: 'lightning-rod' } }
      ]
    };
  
    expect(component.getAbilities()).toEqual('static, lightning-rod');
  });

  it('should return types as comma-separated string', () => {
    component.pokemon = {
      types: [
        { type: { name: 'electric' } },
        { type: { name: 'flying' } }
      ]
    };
  
    expect(component.getTypes()).toEqual('electric, flying');
  });
  
  it('should return default sprite URL if not available', () => {
    component.pokemon = {};
    expect(component.getSpriteUrl()).toEqual('-');
  });

  it('should return default value if no abilities are available', () => {
    component.pokemon = {};
    expect(component.getAbilities()).toEqual('-');
  });

  it('should return an empty string if no types are available', () => {
    component.pokemon = {sprites: {}};
    expect(component.getTypes()).toEqual('');
  });

  it('should handle missing pokemon input', () => {
    component.pokemon = undefined;
    expect(component.getSpriteUrl()).toEqual('-');
    expect(component.getAbilities()).toEqual('-');
    expect(component.getTypes()).toEqual('');
  });

  it('should handle missing nested properties in pokemon input', () => {
    component.pokemon = { sprites: {} };
    expect(component.getSpriteUrl()).toEqual('-');
  });

  it('should display base experience', () => {
    const mockPokemon = {
      base_experience: 112
    };
    component.pokemon = mockPokemon;
    fixture.detectChanges();
  
    const subtitleElement = fixture.nativeElement.querySelector('mat-card-subtitle');
    expect(subtitleElement.textContent).toContain('Base Experience: 112');
  });
  
});
