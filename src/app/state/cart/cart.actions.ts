import { createAction, props } from "@ngrx/store";

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ pokemon: any, quantity: number }>()
)

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ pokemonName: string }>()
)

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ pokemonName: string, quantity: number }>()
)

export const clearCart = createAction(
  '[Cart] Clear Cart'
)
