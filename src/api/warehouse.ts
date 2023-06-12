import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DeleteExistingWarehouse, WarehouseResult, Warehouse } from "../features/warehouse/warehouseSlice";

export const fetchAllWarehouses = createAsyncThunk('Warehouses/getAll', async () => {

    return (await axiosInstance()).get("/api/coffee-warehouse/get-all-warehouse")
        .then((response => response.data));
});

export const AddWarehouse = createAsyncThunk('Warehouse/addNew', async (warehouse: any) => {

    return (await axiosInstance()).post("/api/coffee-warehouse/add-new-warehouse", warehouse)
        .then((response => response.data));
});

export const DeleteWarehouse = createAsyncThunk('Warehouse/Delete', async (warehouseNo: string) => {

    return (await axiosInstance()).delete(`/api/coffee-warehouse/delete-warehouse/${warehouseNo}`,)
        .then((response => response.data));
});

export const UpdateWarehouse = createAsyncThunk('warehouse/Update', async (warehouse: any) => {
        return (await axiosInstance()).put("/api/coffee-warehouse/update-warehouse", warehouse)
        .then((response => response.data));
});
