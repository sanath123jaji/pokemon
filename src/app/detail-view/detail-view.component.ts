import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  selectedTab: string = 'details';
  pokemon: any;
  evolutionChain: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pokemonId = +params['id'];
      this.pokemonService.getPokemonDetails(pokemonId).subscribe(data => {
        this.pokemon = data;
        console.log('pokemon',this.pokemon);
      });
    });
  }

  extractEvolutionChain(chain: any): any[] {
    let evolutions = [];
    let current = chain;

    while (current) {
      evolutions.push({
        name: current.species.name,
        url: current.species.url
      });
      current = current.evolves_to.length > 0 ? current.evolves_to[0] : null;
    }

    return evolutions;
  }

  goToPreviousPage(){
    history.back();
  }
}
