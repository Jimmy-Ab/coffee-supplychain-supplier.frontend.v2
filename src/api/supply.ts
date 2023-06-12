import { NaturalCoffee, SupplyShipment, WashedCoffee, } from "@/features/supply/supplySlice";
import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const FetchAllWashedCoffee = createAsyncThunk<WashedCoffee>('WashedCoffee/GetAll', async () => {

    return (await axiosInstance())
        .get("/api/supply-coffee/get-all-washed-coffee-ind")
        .then((response => response.data));
});

export const FetchAllNaturalCoffee = createAsyncThunk<NaturalCoffee>('NaturalCoffee/GetAll', async () => {

    return (await axiosInstance())
        .get("/api/supply-coffee/get-all-natural-coffee-ind")
        .then((response => response.data));
});

export const RegisterWashedCoffee = createAsyncThunk('WashedCoffee/AddNew', async (washedCoffee: any) => {

    return (await axiosInstance())
        .post("/api/supply-coffee/register-washed-coffee-ind", washedCoffee)
        .then((response => response.data));
});

export const RegisterNaturalCoffee = createAsyncThunk('NaturalCoffee/AddNew', async (naturalCoffee: any) => {

    return (await axiosInstance())
        .post("/api/supply-coffee/register-natural-coffee-ind", naturalCoffee)
        .then((response => response.data));
});

export const ProduceWashedCoffee = createAsyncThunk('WashedCoffee/Produce', async (washedCoffee: any) => {

    return (await axiosInstance())
        .post("/api/supply-coffee/produc-washed-supply-coffee", washedCoffee)
        .then((response => response.data));
});

export const ProduceNaturalCoffee = createAsyncThunk('NaturalCoffee/Produce', async (naturalCoffee: any) => {

    return (await axiosInstance())
        .post("/api/supply-coffee/produce-natural-supply-coffee", naturalCoffee)
        .then((response => response.data));
});

export const AddSupplyCoffeeShipment = createAsyncThunk('SupplyShipment/Add', async (shipment: any) => {

    return (await axiosInstance())
        .put("/api/supply-coffee/supply-coffee-shipment", shipment)
        .then((response => response.data));
});

export const GetAllSupplyCoffeeShipment = createAsyncThunk('SupplyShipment/GetAll', async () => {

    return (await axiosInstance())
        .get("/api/supply-coffee/get-all-supply-coffee-shipment")
        .then((response => response.data));
});

export const DeliverSupplyCoffeeShipment = createAsyncThunk('SupplyShipment/Deliver', async (shipment: any) => {

    return (await axiosInstance())
        .put("/api/supply-coffee/deliver-supply-coffee-shipment", shipment)
        .then((response => response.data));
});

export const ReturnSupplyCoffeeShipment = createAsyncThunk('SupplyShipment/Return', async (shipment: any) => {

    return (await axiosInstance())
        .put("/api/supply-coffee/return-supply-coffee-shipment", shipment)
        .then((response => response.data));
});

export const GetAllProducedCoffee = createAsyncThunk('ProducedCoffee/GetAll', async () => {

    return (await axiosInstance())
        .get("/api/supply-coffee/get-supply-coffee/OrgsupplierMSP")
        .then((response => response.data));
});

export const GradeProducedCoffee = createAsyncThunk('ProducedCoffee/Grade', async (grade: any) => {

    return (await axiosInstance())
        .put("/api/supply-coffee/grade", grade)
        .then((response => response.data));
});

export const DeleteSupplycoffee = createAsyncThunk('SupplyCoffee/Delete', async (id: string | undefined) => {

    return (await axiosInstance())
        .delete(`/api/supply-coffee/delete-supply-coffee/OrgsupplierMSP/${id}`)
        .then((response => response.data));
});