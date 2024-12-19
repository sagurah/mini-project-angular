import { selectCartItems } from './../../state/cart/cart.selectors';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';
import { Store } from '@ngrx/store';
import { clearCart } from '../../state/cart/cart.actions';
import { CartItem } from '../../state/cart/cart';

@Component({
  selector: 'app-checkout',
  standalone: false,

  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]>
  cartItems: CartItem[] = []

  constructor(
    private store: Store,
    private rtdb: RealtimeDatabaseService,
  ) {
    this.cartItems$ = this.store.select(selectCartItems)
  }

  ngOnInit() {
    this.cartItems$.subscribe(items => this.cartItems = items)
  }

  checkoutForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  })

  async onSubmit() {
    if (this.checkoutForm.valid) {
      const { firstName, lastName, email, address, phone } = this.checkoutForm.value
      const order = {
        firstName,
        lastName,
        email,
        address,
        phone,
        pokemonToBuy: this.cartItems.map(item => {
          return {
            quantity: item.quantity,
            pokemon: Array.from({ length: item.quantity }).map(() => item.pokemon.name)
          }
        })
      }
      await this.rtdb.saveFormSubmission(order)
      this.store.dispatch(clearCart())

      this.checkoutForm.reset()

      alert('Order submitted successfully')
    }
  }
}
