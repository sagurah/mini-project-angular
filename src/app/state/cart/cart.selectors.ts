import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart";

export const selectCartState = createFeatureSelector<CartState>('cart')

export const selectCartItems = createSelector(
  selectCartState,
  state => state.items
)

export const selectCartItemsCount = createSelector(
  selectCartItems,
  items => items.reduce((acc, item) => acc + item.quantity, 0)
)
