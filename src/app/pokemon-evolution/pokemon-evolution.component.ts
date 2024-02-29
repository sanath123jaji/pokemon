import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss']
})
export class PokemonEvolutionComponent implements OnInit {

  evolutionChain: any[] = [];
  selectedPokemonID : any;

  constructor(private pokemonService : PokemonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pokemonId = params['id'];
      this.selectedPokemonID = pokemonId;
      this.pokemonService.getPokemonSpecies(pokemonId).subscribe((data:any) => {
        this.pokemonService.getPokemonEvolutionChain(data?.evolution_chain?.url).subscribe((res:any) => {
          this.buildEvolutionChain(res.chain);
        });
      });
    });
  }

  buildEvolutionChain(chain: any): void {
    let currentStage = chain;
    const evolutionDetailsRequests = [];
  
    evolutionDetailsRequests.push(
      this.pokemonService.getPokemonDetailsByName(currentStage.species.name).pipe(
        catchError(error => of({ error: `Error fetching details for ${currentStage.species.name}`, species: currentStage.species }))
      )
    );
  
    while (currentStage.evolves_to && currentStage.evolves_to.length) {
      let nextStage = currentStage.evolves_to[0];
      evolutionDetailsRequests.push(
        this.pokemonService.getPokemonDetailsByName(nextStage.species.name).pipe(
          catchError(error => of({ error: `Error fetching details for ${nextStage.species.name}`, species: nextStage.species }))
        )
      );
      currentStage = nextStage;
    }
  
    forkJoin(evolutionDetailsRequests).subscribe(detailsArray => {
      this.evolutionChain = detailsArray.map((details, index) => {
        if (details.error) {
          return {
            speciesName: 'N/A',
            minLevel: 'N/A',
            triggerName: 'unknown',
            image: 'default-image-path.png'
          };
        }
  
        const stage = index === 0 ? chain : chain.evolves_to[index - 1];
        const evolutionDetails = stage?.evolution_details[0] || {};
  
        return {
          speciesName: details?.species?.name || 'N/A',
          id : details?.id,
          minLevel: evolutionDetails?.min_level || 'N/A',
          triggerName: evolutionDetails?.trigger?.name || 'unknown',
          image: details?.sprites?.front_default || 'default-image-path.png'
        };
      });
    });
  }
  
  openDetailTab(id:string){
    this.router.navigate(['/pokemon', id])
  }
  
}
