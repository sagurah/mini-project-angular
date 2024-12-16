import { Injectable } from "@angular/core";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private apiUrl = "https://pokeapi.co/api/v2/pokemon"

  constructor() {
    console.log("Pokemon Service: Constructor Called")
  }

  async getPokemonList(limit: number = 20) {
    const response = await axios.get(`${this.apiUrl}?limit=${limit}`)
    return response.data.results
  }

  async getPokemonDetail(name: string) {
    const response = await axios.get(`${this.apiUrl}/${name}`)
    return response.data
  }

  async getPokemonSpecies(url: string) {
    const response = await axios.get(`${url}`)
    return response.data
  }

  async getPokemonEvolutions(url: string) {
    const response = await axios.get(`${url}`)
    return response.data
  }
}
