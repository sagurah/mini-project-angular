import { selectCartItemsCount, selectCartItems } from './../../state/cart/cart.selectors';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { clearCart, removeFromCart } from '../../state/cart/cart.actions';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems$;
  cartItemsCount$;

  constructor(private store: Store) {
    this.cartItems$ = this.store.pipe(select(selectCartItems));
    this.cartItemsCount$ = this.store.pipe(select(selectCartItemsCount));
  }

  removeItem(pokemonName: string) {
    this.store.dispatch(removeFromCart({ pokemonName }));
    alert(`${pokemonName} removed from cart!`);
  }

  clearCart() {
    this.store.dispatch(clearCart());
    alert('Cart cleared!');
  }
}
