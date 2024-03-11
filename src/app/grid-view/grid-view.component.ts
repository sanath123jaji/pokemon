import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import {PokemonData, PokemonList} from '../types';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  pokemons$!: Observable<{ name: string; image: string; id: number }[]>;
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
    this.showSpinner = true;
    this.pokemons$ = this.pokemonService.getPokemons(this.pageSize, this.paginator?.pageIndex * this.pageSize).pipe(
      map((data:PokemonList) => {
        this.totalPokemons = data?.count;
        return data?.results;
      }),
      switchMap(results => {
        return forkJoin(
          results.map((pokemon:{ name: string; url: string }) => this.pokemonService.getPokemonDetailsByName(pokemon.name))
        );
      }),
      map((pokemonDetails: PokemonData[]) => {
        return pokemonDetails.map(detail => {
          return {
            name: detail.name || 'N/A',
            image: detail?.sprites?.other?.dream_world?.front_default || '',
            id: detail?.id
          };
        });
      })
    );
    this.showSpinner = false;
  }

  handlePageEvent(event: any): void {
    this.paginator.pageIndex = event.pageIndex;
    this.showSpinner = true;
    this.fetchPokemons();
  }
}
