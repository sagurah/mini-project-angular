import { createReducer, on } from "@ngrx/store";
import { CartState, initialCartState } from "./cart";
import { addToCart, removeFromCart, clearCart } from "./cart.actions";

const loadInitialState = (): CartState => {
  if (typeof sessionStorage !== 'undefined') {
    const storedState = sessionStorage.getItem('cart')
    return storedState ? JSON.parse(storedState) : initialCartState
  }

  return initialCartState
}

const saveStateToSessionStorage = (state: CartState) => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('cart', JSON.stringify(state))
  }
}

export const cartReducer = createReducer(
  loadInitialState(),

  on(addToCart, (state, { pokemon, quantity }) => {
    const existingItemIndex = state.items.findIndex(
      item => item.pokemon.id === pokemon.id
    )

    let newState: CartState

    if (existingItemIndex > -1) {
      const updatedItems = state.items.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )

      newState = { ...state, items: updatedItems }
    } else {
      newState = {
        ...state,
        items: [...state.items, { pokemon, quantity }]
      }
    }

    saveStateToSessionStorage(newState)
    return newState
  }),

  on(removeFromCart, (state, { pokemonName }) => {
    const newState = {
      ...state,
      items: state.items.filter(item => item.pokemon.name !== pokemonName)
    }

    saveStateToSessionStorage(newState)
    return newState
  }),

  on(clearCart, () => {
    saveStateToSessionStorage(initialCartState)
    return initialCartState
  })
)
