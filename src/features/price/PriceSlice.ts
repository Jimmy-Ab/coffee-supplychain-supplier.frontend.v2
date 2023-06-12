import { createSlice } from "@reduxjs/toolkit";
import { GetAllDailyPrice, FetchMonthlyPrice, FetchYearlyPrices, SetCoffeeDailyPrice, UpdateCoffeeDailyPrice } from "../../api/price";

export interface CoffeePrice {
    result: PriceResult[]
}

export interface PriceResult {
    Key: string,
    Record: {
        coffeeType: string;
        currency: string;
        date: string;
        grade: string;
        id: string;
        measurmentUnit: string;
        price: string;
        txId: string;
    }
}

export interface NewPrice {
    id: string,
    date: string,
    coffeeType: string,
    grade: string,
    price: string,
    currency: string,
    measurmentUnit: string
}

export interface CoffeePriceState {
    loadingDailyPrice: boolean,
    loadingMonthlyPrice: boolean,
    loadingYearlyPrice: boolean,
    dailyCoffeePrice: CoffeePrice,
    monthlyCoffeePrice: CoffeePrice,
    yearlyCoffeePrice: CoffeePrice,
    settingPrice: boolean,
    error?: string
}

const initialState: CoffeePriceState = {
    loadingDailyPrice: false,
    loadingMonthlyPrice: false,
    loadingYearlyPrice: false,
    settingPrice: false,
    dailyCoffeePrice: { result: [] },
    monthlyCoffeePrice: { result: [] },
    yearlyCoffeePrice: { result: [] },
    error: ''
}


export const priceSlice = createSlice({
    name: 'price',
    initialState: initialState,
    extraReducers(builder) {
        builder.addCase(GetAllDailyPrice.pending, (state) => {
            state.loadingDailyPrice = true;
        })
        builder.addCase(GetAllDailyPrice.fulfilled, (state, action) => {
            state.loadingDailyPrice = false;
            state.dailyCoffeePrice.result = action.payload.result
        })
        builder.addCase(GetAllDailyPrice.rejected, (state, action) => {
            state.loadingDailyPrice = false;
            state.error = action.error.message;
        })

        builder.addCase(FetchMonthlyPrice.pending, (state) => {
            state.loadingMonthlyPrice = true;
        })

        builder.addCase(FetchMonthlyPrice.fulfilled, (state, action) => {
            state.loadingMonthlyPrice = false;
            state.monthlyCoffeePrice.result = action.payload.result
        })
        builder.addCase(FetchMonthlyPrice.rejected, (state, action) => {
            state.loadingMonthlyPrice = false;
            state.error = action.error.message;
        })

        builder.addCase(FetchYearlyPrices.pending, (state) => {
            state.loadingYearlyPrice = true;
        })
        builder.addCase(FetchYearlyPrices.fulfilled, (state, action) => {
            state.loadingYearlyPrice = false;
            state.yearlyCoffeePrice.result = action.payload.result
        })
        builder.addCase(FetchYearlyPrices.rejected, (state, action) => {
            state.loadingYearlyPrice = false;
            state.error = action.error.message;
        })

        builder.addCase(SetCoffeeDailyPrice.pending, (state) => {
            state.settingPrice = true;
        })
        builder.addCase(SetCoffeeDailyPrice.fulfilled, (state) => {
            state.settingPrice = false;
        })
        builder.addCase(SetCoffeeDailyPrice.rejected, (state, action) => {
            state.settingPrice = false;
            state.error = action.error.message;
        })

        builder.addCase(UpdateCoffeeDailyPrice.pending, (state) => {
            state.settingPrice = true;
        })
        builder.addCase(UpdateCoffeeDailyPrice.fulfilled, (state) => {
            state.settingPrice = false;
        })
        builder.addCase(UpdateCoffeeDailyPrice.rejected, (state, action) => {
            state.settingPrice = false;
            state.error = action.error.message;
        })
    },
    reducers: {

    }
})

export default priceSlice.reducer


