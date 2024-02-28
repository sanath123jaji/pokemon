import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss']
})
export class PokemonEvolutionComponent implements OnInit {

  evolutionChain: any[] = [];

  constructor(private pokemonService : PokemonService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pokemonId = params['id'];
      this.pokemonService.getPokemonSpecies(pokemonId).subscribe((data:any) => {
        this.pokemonService.getPokemonEvolutionChain(data?.evolution_chain?.url).subscribe((res:any) => {
          this.buildEvolutionChain(res.chain);
        });
      });
    });
  }

  // buildEvolutionChain(chain: any): void {
  //   let currentStage = chain;
  //   const evolutionDetailsRequests = [];
  
  //   while (currentStage && currentStage.species) {
  //     evolutionDetailsRequests.push(
  //       this.pokemonService.getPokemonDetailsByName(currentStage.species.name).pipe(
  //         catchError(error => of(`Error fetching details for ${currentStage.species.name}`))
  //       )
  //     );
  //     console.log('current stage',currentStage);
  //     currentStage = currentStage.evolves_to.length ? currentStage.evolves_to[0] : null;
  //   }
  
  //   forkJoin(evolutionDetailsRequests).subscribe(detailsArray => {
  //     this.evolutionChain = detailsArray.map((details, index) => ({
  //       speciesName: chain.evolves_to[index]?.species?.name || 'N/A',
  //       minLevel: chain.evolves_to[index]?.evolution_details[0]?.min_level || 'N/A',
  //       triggerName: chain.evolves_to[index]?.evolution_details[0]?.trigger?.name || 'unknown',
  //       image: details.sprites?.front_default || 'default-image-path.png'
  //     }));
  //     console.log('sjhbj',this.evolutionChain);
  //   });
  // }

  buildEvolutionChain(chain: any): void {
    let currentStage = chain;
    const evolutionDetailsRequests = [];
  
    // Push the base species first
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
          minLevel: evolutionDetails?.min_level || 'N/A',
          triggerName: evolutionDetails?.trigger?.name || 'unknown',
          image: details?.sprites?.front_default || 'default-image-path.png'
        };
      });
    });
  }
  
  
  
}
