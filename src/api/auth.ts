import { axiosInstance } from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const Login = createAsyncThunk('Auth/Login', async (user: any) => {

    return (await axiosInstance()).post("/api/auth/login", user)
        .then((response => response.data));
});

export const Register = createAsyncThunk('Auth/Register', async (user: any) => {

    return (await axiosInstance()).post("/api/auth/register", user)
        .then((response => response.data));
});