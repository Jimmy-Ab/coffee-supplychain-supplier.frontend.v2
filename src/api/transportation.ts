import { Transportation } from "@/features/transportation/transportationSlice";
import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface cert {
    id: string
}
export const GetAllTransportationCertificate = createAsyncThunk('transportationCertificate/GetAll', async () => {

    return (await axiosInstance()).get("/api/coffee-transportation-certificate/get-all")
        .then((response => response.data));
});

export const RequestTransportationCertificate = createAsyncThunk('transportationCertificate/request', async (request: any) => {

    return (await axiosInstance()).post("/api/coffee-transportation-certificate/request", request)
        .then((response => response.data));
});

export const DeleteCertificateRequest = createAsyncThunk('transportationCertificate/delete', async (id: any) => {

    return (await axiosInstance()).delete(`/api/coffee-transportation-certificate/delete/${id}`)
        .then((response => response.data));
});

export const GrantCertificateRequest = createAsyncThunk('transportationCertificate/grant', async (cert: any) => {

    return (await axiosInstance()).put("/api/coffee-transportation-certificate/grant", cert)
        .then((response => response.data));
});

export const RevokeCertificateRequest = createAsyncThunk('transportationCertificate/revoke', async (cert: any) => {

    return (await axiosInstance()).put("/api/coffee-transportation-certificate/revoke", cert)
        .then((response => response.data));
});