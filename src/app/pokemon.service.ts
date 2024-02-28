import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset: number) {
    return this.http.get<any>(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonById(id:any) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getPokemonSpecies(pokemonId: string) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
  }

  getPokemonDetails(pokemonId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${pokemonId}`);
  }

  getPokemonEvolutionChain(evolutionUrl: string): Observable<any> {
    return this.http.get<any>(evolutionUrl);
    // return this.http.get<any>(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`)
  }

  getPokemonDetailsByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${name}`);
  }
}
