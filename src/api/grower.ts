import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllGrowers = createAsyncThunk('growers/GetAll', async () => {

    return (await axiosInstance())
        .get("/api/coffee-grower/get-all-coffee-growers")
        .then((response => response.data));
});

export const AddGrower = createAsyncThunk('grower/addNew', async (grower: any) => {

    return (await axiosInstance())
        .post("/api/coffee-grower/register-coffee-grower", grower)
        .then((response => response.data));
});

export const UpdateGrower = createAsyncThunk('grower/update', async (grower: any) => {

    return (await axiosInstance())
        .put("/api/coffee-grower/update-coffee-grower", grower)
        .then((response => response.data));
});

export const DeleteGrower = createAsyncThunk('grower/delete', async (id: string | undefined) => {

    return (await axiosInstance())
        .delete(`/api/coffee-grower/delete-coffee-growers/${id}`)
        .then((response => response.data));
});