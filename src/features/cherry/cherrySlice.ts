import { createSlice } from '@reduxjs/toolkit';
import { AddNewCherryDelivery, GetAllCherryDelivery, InspectCherryDelivery, UpdateCherryDelivery } from '../../api/cherry';

export interface Cherry {
    result: CherryResult[];
}


export interface CherryResult {
    Key: string,
    Record: {
        batchNumber: string;
        coffeegrower: string;
        collectionDate: string;
        currency: string;
        deliveredTo: string;
        deliveryDate: string;
        deliveryId: string;
        farmPlace: string;
        latitude: string;
        longitude: string;
        qualityInspectionDate: string;
        qualityStatus: string;
        quantity: string;
        sellingPrice: string;
        status: string;
        unitOfMeasure: string;
        warehouseId: string;
    }
}

export interface CherryState {
    loading: boolean,
    adding: boolean,
    cherrys: Cherry,
    error?: string
}

const initialState: CherryState = {
    loading: false,
    adding: false,
    cherrys: { result: [] },
    error: ''
}

export const cherrySlice = createSlice({
    name: 'cherry',
    initialState: initialState,
    extraReducers(builder) {
        builder.addCase(GetAllCherryDelivery.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetAllCherryDelivery.fulfilled, (state, action) => {
            state.loading = false;
            state.cherrys.result = action.payload.result;
        })
        builder.addCase(GetAllCherryDelivery.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(AddNewCherryDelivery.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(AddNewCherryDelivery.fulfilled, (state, action) => {
            state.adding = false;
        })
        builder.addCase(AddNewCherryDelivery.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })

        builder.addCase(UpdateCherryDelivery.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(UpdateCherryDelivery.fulfilled, (state, action) => {
            state.adding = false;
        })
        builder.addCase(UpdateCherryDelivery.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })

        builder.addCase(InspectCherryDelivery.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(InspectCherryDelivery.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(InspectCherryDelivery.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
    reducers: {

    }

});

export default cherrySlice.reducer