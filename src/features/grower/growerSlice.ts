import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { AddGrower, DeleteGrower, GetAllGrowers, UpdateGrower } from '../../api/grower';

export interface Grower {
    result: GrowerResult[];
}


export interface GrowerResult {

    Key: string,
    Record: {
        dateOfBirth: string;
        deliveries: Deliveries[];
        farmPlace: string;
        farmSize: string;
        fullName: string;
        gender: string;
        id: string;
        latitude: string;
        longitude: string;
        maritalStatus: string;
        nationalityId: string;
        registeredAt: string;
        taxId: string;
    }
}

export interface Deliveries {
    batchNumber: string;
    deliveredTo: string;
    deliveryId: string;
    quantity: string;
}

export interface GrowerState {
    loading: boolean,
    adding: boolean,
    growers: Grower,
    error?: string
}

const initialState: GrowerState = {
    loading: false,
    adding: false,
    growers: { result: [] },
    error: ''
}

export const growerSlice = createSlice({
    name: 'grower',
    initialState: initialState,
    extraReducers(builder) {
        builder.addCase(GetAllGrowers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetAllGrowers.fulfilled, (state, action) => {
            state.loading = false;
            state.growers.result = action.payload.result;
            state.error = '';
        })
        builder.addCase(GetAllGrowers.rejected, (state, action) => {
            state.growers.result = []
            state.loading = false
            state.error = action.error.message;
        })
        builder.addCase(AddGrower.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(AddGrower.fulfilled, (state, action) => {
            state.adding = false;
        })
        builder.addCase(AddGrower.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })
        builder.addCase(UpdateGrower.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(UpdateGrower.fulfilled, (state, action) => {
            state.adding = false;
        })
        builder.addCase(UpdateGrower.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })

        builder.addCase(DeleteGrower.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(DeleteGrower.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(DeleteGrower.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
    reducers: {
    }
})

// export const { addNewGrower } = growerSlice.actions

export default growerSlice.reducer