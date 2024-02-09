import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'

const url = ' https://course-api.com/react-useReducer-cart-project';
const initialState = {
    cartItems : [],
    amount : 4,
    total : 0,
    isLoading:true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', ()=> {
    return fetch(url).then(resp => resp.json()).catch((err)=> console.log(err));
})

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers : {
        clearCart: (state) => {
           
            return {cartItems: []};
        },

        removeItem :(state, action) => {
           const itemId = action.payload;
           state.cartItems = state.cartItems.filter((item)=>
            item.id!=itemId);
        },

        increase :(state, {payload}) => {
            const cartItem = state.cartItems.find((item)=> 
                item.id==payload.id)
                cartItem.amount++;
        },

        decrease :(state, {payload}) => {
            const cartItem = state.cartItems.find((item)=> 
                item.id==payload.id)
                cartItem.amount--;
        },

        calculateTotal :(state)=> {
            let amount =0;
            let total =0;
            state.cartItems.forEach((item)=> {
                amount+=item.amount;
                total=total + item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;
        }
    },

   
    extraReducers: (builder) => {
        builder
          .addCase(getCartItems.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getCartItems.fulfilled, (state, action) => {
         
            state.isLoading = false;
            state.cartItems = action.payload;
          })
          .addCase(getCartItems.rejected, (state, action) => {
            console.log(action);
            state.isLoading = false;
          });
      },
    },
)

export const{clearCart, removeItem, increase, decrease, calculateTotal}=cartSlice.actions;
export default cartSlice.reducer;