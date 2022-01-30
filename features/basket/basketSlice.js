import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     items: [],
}

export const basketSlice = createSlice({
     name: 'basket',
     initialState,
     reducers: {
          addToBasket: (state, actions) => { state.items = [...state.items, actions.payload] },
          removeFromBasket: (state, actions) => {
               const index = state.items.findIndex(
                    (basketItemID) => basketItemID.id === actions.payload.id
               );

               let newBasket = [...state.items];

               if (index >= 0) {
                    // remove From Basket item from
                    newBasket.splice(index, 1);
               } else {
                    console.warn(`Invalid basket item ID : ${actions.payload.id} `)
               }

               state.items = newBasket;
          },
     },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export default basketSlice.reducer;