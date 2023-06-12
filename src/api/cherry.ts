import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cherry } from "../features/cherry/cherrySlice";

export interface DeleteDelivery {
    deliveredTo: string,
    batchNumber: string,
    deliveryId: string
}

export interface InspectDelivery {
    deliveredTo: string,
    batchNumber: string,
    deliveryId: string,
    quality: string
}

export const GetAllCherryDelivery = createAsyncThunk<Cherry>('CherryDelivery/GetAll', async () => {
    return (await axiosInstance())
        .get('/api/coffee-cherry/get-all-coffee-cherry')
        .then((response) => response.data)
});

export const AddNewCherryDelivery = createAsyncThunk('CherryDelivery/AddNew', async (delivery: any) => {
    return (await axiosInstance())
        .post('/api/coffee-cherry/coffee-cherry-delivery', delivery)
        .then((response) => response.data)
});

export const UpdateCherryDelivery = createAsyncThunk('CherryDelivery/Update', async (delivery: any) => {
    return (await axiosInstance())
        .put('/api/coffee-cherry/update-coffee-cherry-delivery', delivery)
        .then((response) => response.data)
});

export const DeleteCherryDelivery = createAsyncThunk('CherryDelivery/Delete', async (deleteDelivery: DeleteDelivery) => {
    return (await axiosInstance())
        .delete(`/api/coffee-cherry/delete-coffee-cherry/${deleteDelivery.deliveredTo}/${deleteDelivery.batchNumber}/${deleteDelivery.deliveryId}`)
        .then((response) => response.data)
});

export const InspectCherryDelivery = createAsyncThunk('CherryDelivery/Inspect', async (inspectDelivery: InspectDelivery) => {
    return (await axiosInstance())
        .put('/api/coffee-cherry/coffee-cherry-quality-inspection', inspectDelivery)
        .then((response) => response.data)
});