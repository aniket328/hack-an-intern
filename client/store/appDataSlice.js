import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    'user_portfolios': [],
    'market_prices': [],
    'pending_buy_orders': [],
    'pending_sell_orders': [],
    'transactions': [],
  }
};

export const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setData: (state, action) => {
      console.log('recieved payload: ')
      console.log(action.payload)
        state.data = action.payload
    }
  },
});

export const { setData } = appDataSlice.actions;

export default appDataSlice.reducer;

{/* <Button onClick={() => {
          dispatch(setUserPortfolios([
            {
              user_name: 'A',
              stocks: 100,
              fiat: 300
            },
            {
                user_name: 'B',
                stocks: 190,
                fiat: 307
            }
      ])      
      )
      
      console.log(userPortfolios)

      
      }}>Set users</Button>
      {
        userPortfolios.length
      } */}