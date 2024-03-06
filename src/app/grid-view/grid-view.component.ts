import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  pokemons: any[] = [];
  currentPage: number = 1;
  totalPokemons: number = 0;
  pageSize: number = 12; 
  showSpinner = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.fetchPokemons();
  }

  fetchPokemons(): void {
    this.pokemons = [];
    this.pokemonService.getPokemons(this.pageSize, this.paginator?.pageIndex * this.pageSize).subscribe(data => {
      const results = data?.results;
      this.totalPokemons = data?.count;
      this.pokemons = results.map((pokemon:any) => {
        return this.pokemonService.getPokemonById(pokemon.name).toPromise();
      });
      Promise.all(this.pokemons).then(pokemonDetails => {
        this.pokemons = pokemonDetails.map(detail => {
          return {
            name: detail.name,
            image: detail.sprites.other.dream_world.front_default,
            id: detail?.id
          };
        });
      });
      this.showSpinner = false;
    },err => {
      console.log('err',err);
    });
  }

  handlePageEvent(event: any): void {
    this.paginator.pageIndex = event.pageIndex;
    this.showSpinner = true;
    this.fetchPokemons();
  }
}
