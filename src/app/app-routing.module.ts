import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiodataComponent } from './biodata/biodata.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailPageComponent } from './components/pokemon-detail-page/pokemon-detail-page.component';
import { PokemonDataPageComponent } from './components/pokemon-data-page/pokemon-data-page.component';

const routes: Routes = [
  {
    path: 'biodata',
    component: BiodataComponent
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'pokemon',
    component: PokemonListComponent
  },
  {
    path: 'pokemon/:name',
    component: PokemonDetailPageComponent
  },
  {
    path: 'pokemon-data',
    component: PokemonDataPageComponent
  },
  {
    path: '**',
    redirectTo: 'homepage'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
