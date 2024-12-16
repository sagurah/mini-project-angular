import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
  pokemonEvolution: any[] = []
  selectedEvolutionName: string = ''
  currentAudio: any = null

  constructor(
    private pokemonService: PokemonService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  setSelectedEvolutionName(name: string) {
    this.selectedEvolutionName = name

    const newUrl = `/pokemon/${name}`
    this.router.navigateByUrl(newUrl).then(() => {
      window.location.href = newUrl
    })

    // this.router.navigate([`/pokemon/${name}`])
  }

  async fetchPokemonEvolution() {
    const speciesResponse = await this.pokemonService.getPokemonSpecies(`${this.pokemon.speciesUrl}`)
    const evolutionChainResponse = await this.pokemonService.getPokemonEvolutions(speciesResponse.evolution_chain.url)
    this.pokemonEvolution = this.parseEvolutionChain(evolutionChainResponse.chain)
  }

  parseEvolutionChain(evolutionChain: any) {
    const evolutions = []
    let current = evolutionChain

    while (current) {
      evolutions.push({
        name: current.species.name,
        url: current.species.url
      })
      current = current.evolves_to[0]
    }

    return evolutions
  }

  playSound() {
    const audio = new Audio()
    audio.src = this.pokemon.cry
    audio.load()
    audio.play()
  }

  async ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name')

    if (name) {
      const fetchedPokemon = await this.pokemonService.getPokemonDetail(name)
      this.pokemon = {
        cry: fetchedPokemon.cries.latest,
        speciesUrl: fetchedPokemon.species.url,
        id: fetchedPokemon.id,
        name: name,
        image: fetchedPokemon.sprites.front_default,
        height: fetchedPokemon.height,
        weight: fetchedPokemon.weight,
        abilities: fetchedPokemon.abilities.map((ability: any) => ability.ability.name).join(', ')
      }
    }

    this.fetchPokemonEvolution()
  }
}
