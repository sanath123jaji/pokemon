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
  selectedTabIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pokemonId = +params['id'];
      this.selectedTabIndex = 0;
      this.pokemonService.getPokemonDetails(pokemonId).subscribe(data => {
        this.pokemon = data;
      });
    });
  }

  goToPreviousPage(){
    history.back();
  }
}
