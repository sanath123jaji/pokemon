import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { getPokemonByIdMockData, getPokemonEvolutionChainMockData, getPokemonSpeciesMockData, getPokemonsMockData } from './mock-data';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPokemons should return expected data', () => {
    const limit = 2;
    const offset = 0;

    service.getPokemons(limit, offset).subscribe(data => {
      expect(data).toEqual(getPokemonsMockData);
    });

    const req = httpTestingController.expectOne(`${service.baseUrl}?limit=${limit}&offset=${offset}`);
    expect(req.request.method).toEqual('GET');
    req.flush(getPokemonsMockData);
  });


  it('getPokemonById should return expected data', () => {
    const id = 1;

    service.getPokemonById(id).subscribe(data => {
      expect(data).toEqual(getPokemonByIdMockData);
    });

    const req = httpTestingController.expectOne(`${service.baseUrl}/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(getPokemonByIdMockData);
  });


  it('getPokemonDetailsByName should return expected data', () => {
    const name = 'bulbasaur';

    service.getPokemonDetailsByName(name).subscribe(data => {
      expect(data).toEqual(getPokemonByIdMockData);
    });

    const req = httpTestingController.expectOne(`${service.baseUrl}/${name}`);
    expect(req.request.method).toEqual('GET');
    req.flush(getPokemonByIdMockData);
  });


  it('getPokemonEvolutionChain should return expected data', () => {
    const evolutionUrl = 'https://pokeapi.co/api/v2/evolution-chain/1';

    service.getPokemonEvolutionChain(evolutionUrl).subscribe(data => {
      expect(data).toEqual(getPokemonEvolutionChainMockData);
    });

    const req = httpTestingController.expectOne(evolutionUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(getPokemonEvolutionChainMockData);
  });


  it('getPokemonSpecies should return expected data', () => {
    const pokemonId = '1';

    service.getPokemonSpecies(pokemonId).subscribe(data => {
      expect(data).toEqual(getPokemonSpeciesMockData);
    });

    const req = httpTestingController.expectOne(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(getPokemonSpeciesMockData);
  });

  it('getPokemonDetails should return expected data', () => {
    const pokemonId = 1;

    service.getPokemonDetails(pokemonId).subscribe(data => {
      expect(data).toEqual(getPokemonByIdMockData);
    });

    const req = httpTestingController.expectOne(`${service.baseUrl}/${pokemonId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(getPokemonByIdMockData);
  });
});
