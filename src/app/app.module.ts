import { StoreModule } from '@ngrx/store';
import { cartReducer } from './state/cart/cart.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BiodataComponent } from './biodata/biodata.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonDetailPageComponent } from './components/pokemon-detail-page/pokemon-detail-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PurchaseModalComponent } from './components/purchase-modal/purchase-modal.component';
import { environment } from './environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { AuthComponent } from './auth/auth.component';
import { getAuth } from 'firebase/auth';
import { provideAuth } from '@angular/fire/auth';
import { LayoutComponent } from './components/layout/layout.component';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    BiodataComponent,
    HomepageComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonDetailPageComponent,
    PurchaseModalComponent,
    NavbarComponent,
    AuthComponent,
    LayoutComponent,
    CartComponent,
    CheckoutComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    StoreModule.forRoot(
      { cart: cartReducer },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false
        }
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
