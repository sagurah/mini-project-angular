import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';
import { cartReducer } from "./cart.reducer";

@NgModule({
  imports: [StoreModule.forFeature('cart', cartReducer)],
})

export class CartStateModule {}
