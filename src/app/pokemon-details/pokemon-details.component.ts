import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  @Input() pokemon: any;

  constructor() { }

  ngOnInit(): void {
  }

  getSpriteUrl(): string {
    return this.pokemon?.sprites?.other?.['official-artwork']?.front_default || '-';
  }

  getAbilities(){
    return this.pokemon?.abilities?.map((a:any) => a.ability.name).join(', ') || '-';
  }

  getTypes(){
    return this.pokemon?.types?.map((t:any) => t.type.name).join(', ') || '';
  }
}
