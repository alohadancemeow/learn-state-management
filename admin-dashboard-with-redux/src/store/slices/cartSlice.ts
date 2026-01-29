import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Adds an item to the cart.
     * 
     * If the item already exists in the cart, it increments the quantity.
     * Otherwise, it adds the new item to the cart array.
     * It also updates the global total quantity and total amount.
     * 
     * @param state - Current cart state
     * @param action - Payload containing item details (excluding quantity, which is optional)
     */
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      const quantityToAdd = newItem.quantity || 1;

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: quantityToAdd,
        });
      } else {
        existingItem.quantity += quantityToAdd;
      }

      state.totalQuantity += quantityToAdd;
      state.totalAmount += newItem.price * quantityToAdd;
    },
    /**
     * Removes an item from the cart by its ID.
     * 
     * It finds the item, subtracts its quantity and total price from the global totals,
     * and then filters it out of the items array.
     * 
     * @param state - Current cart state
     * @param action - Payload containing the ID of the item to remove
     */
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    /**
     * Updates the quantity of a specific item in the cart.
     * 
     * This reducer efficiently updates the global cart totals by calculating the difference
     * between the new quantity and the old quantity, rather than recalculating everything from scratch.
     */
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && quantity > 0) {
        // Calculate the difference between the new quantity and the current quantity.
        // Example: If quantity changes from 3 to 2, difference is -1.
        // Example: If quantity changes from 2 to 5, difference is +3.
        const quantityDifference = quantity - existingItem.quantity;

        // Update the item's quantity to the new value
        existingItem.quantity = quantity;

        // Adjust global totals using the calculated difference.
        // If difference is negative, this effectively subtracts from the totals.
        state.totalQuantity += quantityDifference;
        state.totalAmount += existingItem.price * quantityDifference;
      }
    },
    /**
     * Clears all items from the cart and resets totals to zero.
     * 
     * @param state - Current cart state
     */
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
