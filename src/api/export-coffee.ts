import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllExportCoffee = createAsyncThunk('ExportCoffee/GetAll', async () => {
    
    return (await axiosInstance())
        .get('/api/export-coffee/get-all')
        .then((response) => response.data)
});

export const RegisterInd = createAsyncThunk('ExportCoffee/RegisterInd', async (req: any) => {
    
    return (await axiosInstance())
        .post('/api/export-coffee/register-ind', req)
        .then((response) => response.data)
});

export const RequestCoffeeExport = createAsyncThunk('ExportCoffee/RequestExport', async (req: any) => {
    
    return (await axiosInstance())
        .post('/api/export-coffee/produce', req)
        .then((response) => response.data)
});

export const GetAllIndExportCoffee = createAsyncThunk('ExportCoffee/GetAllInd', async () => {
    
    return (await axiosInstance())
        .get('/api/export-coffee/get-all-ind/OrgsupplierMSP')
        .then((response) => response.data)
});

export const DeleteExportCoffee = createAsyncThunk('ExportCoffee/Delete', async (id: string) => {
    
    return (await axiosInstance())
        .delete(`/api/export-coffee/delete-ind/OrgsupplierMSP/${id}`)
        .then((response) => response.data)
});