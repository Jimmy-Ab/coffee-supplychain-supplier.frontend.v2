import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CoffeePrice, NewPrice, PriceResult } from "../features/price/PriceSlice";

export interface MonthlyPriceParams {
    year: string,
    month: string
}

export interface DeletePriceParams {
    id: string,
    date: string
}

export const GetAllDailyPrice = createAsyncThunk('CoffeePrice/GetAllDailyPrice', async () => {

    return (await axiosInstance())
        .get("/api/coffee-daily-price/get-all-daily-price")
        .then((response => response.data));
});

export const FetchMonthlyPrice = createAsyncThunk('coffeePrice/getMonthlyPrice', async (date: any) => {

    return (await axiosInstance())
        .get(`/api/coffee-daily-price//get-coffee-price-per-month/${date.year}-${date.month}`)
        .then((response => response.data));
});

export const FetchYearlyPrices = createAsyncThunk('coffeePrice/getYearlyPrice', async (year: string) => {

    return (await axiosInstance())
        .get(`/api/coffee-daily-price//get-coffee-price-per-year/${year}`)
        .then((response => response.data));
});

export const SetCoffeeDailyPrice = createAsyncThunk('coffeePrice/setDailyPrice', async (price: any) => {

    return (await axiosInstance())
        .post("/api/coffee-daily-price/set-coffee-daily-price", price)
        .then((response => response.data));
});

export const UpdateCoffeeDailyPrice = createAsyncThunk('coffeePrice/updateDailyPrice', async (price: any) => {

    return (await axiosInstance())
        .put("/api/coffee-daily-price/update-coffee-daily-price", price)
        .then((response => response.data));
});

export const DeleteDailyPrice = createAsyncThunk('warehouse/Delete', async (params: any) => {
    return (await axiosInstance())
        .delete(`/api/coffee-daily-price/delete-coffee-daily-price/${params.date}/${params.id}`,)
        .then((response) => response.data)
});
