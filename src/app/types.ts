export interface PokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results:Array<{
        name: string;
        url: string;
    }>
}

export interface PokemonData {
    abilities: Array<PokemonAbility>;
    base_experience: number;
    cries: PokemonCries;
    forms: Array<{
        name: string;
        url: string;
    }>;
    game_indices: Array<PokemonGameIndex>;
    height: number;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Array<PokemonMove>;
    name: string;
    order: number;
    species: Array<{
        name: string;
        url: string;
    }>;
    sprites: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        other: {
            dream_world: {
                front_default: string | null;
                front_female: string | null;
            }  
            home: {
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
            'official-artwork': {
                front_default: string | null;
                front_shiny: string | null;
            };
            showdown: {
                back_default: string | null;
                back_female: string | null;
                back_shiny: string | null;
                back_shiny_female: string | null;
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            }
        };
    };
    stats: Array<PokemonStat>;
    types: Array<PokemonType>;
    weight: number;
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

export interface PokemonMove {
    move: {
        name: string;
        url: string;
    };
    version_group_details: Array<{
        level_learned_at: number;
        move_learn_method: {
            name: string;
            url: string;
        };
        version_group: {
            name: string;
            url: string;
        }
    }>
}

export interface PokemonGameIndex {
    game_index: number;
    version: {
        name: string;
        url: string;
    }
}

export interface PokemonCries {
    latest: string;
    legacy: string;
}

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}