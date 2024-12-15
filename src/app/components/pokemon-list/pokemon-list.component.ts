import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,

  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit, OnChanges, OnDestroy {
  isLoading: boolean = false
  pokemonList: any[] = []
  filteredPokemonList: any[] = []
  paginatedPokemon: any[] = []
  selectedPokemon: any = null
  theme: 'light' | 'dark' = 'light'
  filter: string = ''
  selectedElement: string = ''
  elements: string[] = ['fire', 'water', 'grass', 'electric, psychic', 'ice', 'dragon', 'dark', 'fairy', 'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel']
  currentPage: number = 1
  itemsPerPage: number = 5
  totalPages: number = 0

  constructor(private pokemonService: PokemonService) {
    console.log("Pokemon List: Constructor Called")
  }

  async ngOnInit() {
    await this.fetchPokemonList()
    this.updatePagination()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`Pokemon List: ngOnChanges Called: ${changes}`)
  }

  ngOnDestroy() {
    console.log("Pokemon List: ngOnDestroy Called")
  }

  async fetchPokemonList() {
    this.isLoading = true
    const response = await this.pokemonService.getPokemonList(25)
    for (const pokemon of response) {
      const pokemonDetail = await this.pokemonService.getPokemonDetail(pokemon.name)
      this.pokemonList.push({
        name: pokemon.name,
        url: pokemon.url,
        image: pokemonDetail.sprites.front_default,
        element: pokemonDetail.types[0]?.type?.name
      })
    }
    this.filteredPokemonList = this.pokemonList
    this.isLoading = false
    this.updatePagination()
  }

  filterPokemon() {
    this.filteredPokemonList = this.pokemonList.filter(pokemon => {
      const matchesName = pokemon.name.toLowerCase().includes(this.filter.toLowerCase())
      const matchesElement = !this.selectedElement || pokemon.element === this.selectedElement

      return matchesName && matchesElement
    })

    this.currentPage = 1
    this.updatePagination()
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredPokemonList.length / this.itemsPerPage)
    this.paginate()
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.paginatedPokemon = this.filteredPokemonList.slice(startIndex, endIndex)
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      this.paginate()
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.paginate()
    }
  }

  async selectPokemon(name: string) {
    this.selectedPokemon = await this.pokemonService.getPokemonDetail(name)
    console.log(this.selectedPokemon)
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
  }
}
