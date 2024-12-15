import { ActivatedRoute } from '@angular/router';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: false,

  templateUrl: './pokemon-detail-page.component.html',
  styleUrl: './pokemon-detail-page.component.css'
})
export class PokemonDetailPageComponent implements OnInit {
  pokemon: any = {}

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name')

    if (name) {
      const fetchedPokemon = await this.pokemonService.getPokemonDetail(name)
      this.pokemon = {
        name: name,
        image: fetchedPokemon.sprites.front_default,
        height: fetchedPokemon.height,
        weight: fetchedPokemon.weight,
        abilities: fetchedPokemon.abilities.map((ability: any) => ability.ability.name).join(', ')
      }

    }
  }
}
