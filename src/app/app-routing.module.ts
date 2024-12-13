import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiodataComponent } from './biodata/biodata.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  {
    path: 'biodata',
    component: BiodataComponent
  },
  {
    path: '**',
    redirectTo: 'pokemon'
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'pokemon',
    component: PokemonListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
