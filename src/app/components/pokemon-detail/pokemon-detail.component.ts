import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  standalone: false,

  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent {
  @Input() pokemon: any = null
  @Input() theme: 'light' | 'dark' = 'light'

  constructor(private router: Router) {}

  clearPokemon() {
    this.pokemon = null
  }

  navigate(name: string) {
    this.router.navigateByUrl(name)
  }
}
