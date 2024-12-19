import { selectCartItemsCount } from './../../state/cart/cart.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount$: Observable<number>

  constructor(
    private store: Store
  ) {
    this.cartItemCount$ = this.store.select(selectCartItemsCount)
  }

  logout() {
    sessionStorage.clear()
    window.location.reload()
  }

  ngOnInit() {
  }

}
