import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllDeliveryContract = createAsyncThunk('DeliveryContract/getAll', async () => {
    return (await axiosInstance())
        .get('/api/coffee-delivery-contract/get-all-contract')
        .then((response) => response.data)
});

export const InitiateDeliveryContract = createAsyncThunk('DeliveryContract/Initiate', async (contract: any) => {
    return (await axiosInstance())
        .post('/api/coffee-delivery-contract/initiat-contact', contract)
        .then((response) => response.data)
});

export const SignDeliveryContract = createAsyncThunk('DeliveryContract/Sign', async (contract: any) => {
    return (await axiosInstance())
        .put('/api/coffee-delivery-contract/sign-contact', contract)
        .then((response) => response.data)
});

export const ApproveDeliveryContract = createAsyncThunk('DeliveryContract/Approve', async (contract: any) => {
    return (await axiosInstance())
        .put('/api/coffee-delivery-contract/approve-contact', contract)
        .then((response) => response.data)
});

export const TerminateDeliveryContract = createAsyncThunk('DeliveryContract/Terminate', async (contract: any) => {
    return (await axiosInstance())
        .put('/api/coffee-delivery-contract/terminate-contact', contract)
        .then((response) => response.data)
});

export const DeleteDeliveryContract = createAsyncThunk('DeliveryContract/Delete', async (id: any) => {
    return (await axiosInstance())
        .delete(`/api/coffee-delivery-contract/delete-contract/${id}`)
        .then((response) => response.data)
});