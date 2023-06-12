import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllContractDelivery = createAsyncThunk('ContractDelivery/getAll', async () => {
    return (await axiosInstance())
        .get('/api/coffee-contract-delivery/get-all-contract-delivery')
        .then((response) => response.data)
});

export const RequestNewContractDelivery = createAsyncThunk('ContractDelivery/Request', async (request: any) => {
    return (await axiosInstance())
        .post('/api/coffee-contract-delivery/request-contact-delivery', request)
        .then((response) => response.data)
});

export const ApproveContractDelivery = createAsyncThunk('ContractDelivery/Approve', async (request: any) => {
    return (await axiosInstance())
        .put('/api/coffee-contract-delivery/approve-contact-delivery', request)
        .then((response) => response.data)
});

export const PayContractDelivery = createAsyncThunk('ContractDelivery/Pay', async (request: any) => {
    return (await axiosInstance())
        .put('/api/coffee-contract-delivery/pay-contact-delivery', request)
        .then((response) => response.data)
});

export const RejectContractDelivery = createAsyncThunk('ContractDelivery/Reject', async (request: any) => {
    return (await axiosInstance())
        .put('/api/coffee-contract-delivery/reject-contact-delivery', request)
        .then((response) => response.data)
});

export const DeleteContractDelivery = createAsyncThunk('ContractDelivery/Delete', async (req: any) => {
    return (await axiosInstance())
        .delete(`/api/coffee-contract-delivery/delete/${req.contractId}/${req.deliveryId}`)
        .then((response) => response.data)
});

