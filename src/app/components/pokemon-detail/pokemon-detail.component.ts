import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-detail',
  standalone: false,

  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent {
  @Input() pokemon: any = null
  @Input() theme: 'light' | 'dark' = 'light'

  clearPokemon() {
    this.pokemon = null
  }
}
