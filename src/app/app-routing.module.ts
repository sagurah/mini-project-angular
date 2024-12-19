import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiodataComponent } from './biodata/biodata.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuard } from './guards/auth.guard';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailPageComponent } from './components/pokemon-detail-page/pokemon-detail-page.component';
import { PokemonDataPageComponent } from './components/pokemon-data-page/pokemon-data-page.component';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
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
        component: PokemonDataPageComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      }
    ]
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
