export interface CartItem {
  pokemon: any
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export const initialCartState: CartState = {
  items: []
}
