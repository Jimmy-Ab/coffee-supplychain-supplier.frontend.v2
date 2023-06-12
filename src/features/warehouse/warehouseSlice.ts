import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { AddWarehouse, DeleteWarehouse, fetchAllWarehouses, UpdateWarehouse } from '../../api/warehouse';

export interface Warehouse {
    response: WarehouseResult[];
}

export interface WarehouseResult {
   
        Key: string,
        Record: {
            name: string;
            capacity: string;
            latitude: string;
            longitude: string;
            address: string;
            size: string;
            txId: string;
            id: string;
            warehouseNo: string;
            owner: string;
        }
}

export interface WarehouseState {
    loading: boolean,
    adding: boolean,
    warehouses: Warehouse,
    error?: string
}

const initialState: WarehouseState = {
    loading: false,
    adding: false,
    warehouses: {response: []},
    error: ''
}

export const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: initialState,
    extraReducers(builder) {
        builder.addCase(fetchAllWarehouses.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllWarehouses.fulfilled, (state, action) => {
            state.loading = false;
            state.warehouses.response = action.payload.response;
            state.error = '';
        })
        builder.addCase(fetchAllWarehouses.rejected, (state, action) => {
            state.warehouses.response = []
            state.loading = false
            state.error = action.error.message;
        })

        builder.addCase(AddWarehouse.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(AddWarehouse.fulfilled, (state) => {
            state.adding = false;
        })
        builder.addCase(AddWarehouse.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })

        builder.addCase(UpdateWarehouse.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(UpdateWarehouse.fulfilled, (state) => {
            state.adding = false;
        })
        builder.addCase(UpdateWarehouse.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })
    },
    reducers: {
        DeleteExistingWarehouse: (state, action: PayloadAction<string>) => {
            console.log(action.payload)
        }
    }
})

export const { DeleteExistingWarehouse } = warehouseSlice.actions

export default warehouseSlice.reducer