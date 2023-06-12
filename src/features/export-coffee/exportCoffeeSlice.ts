import { GetAllExportCoffee, GetAllIndExportCoffee, RegisterInd, RequestCoffeeExport } from '@/api/export-coffee';
import { createSlice } from '@reduxjs/toolkit';

export interface CoffeeInd {
    response: CoffeeIndResult[];
}

export interface ExportCoffee {
    response: ExportCoffeeResult[];
}
export interface ExportCoffeeResult {
    Key: string,
    Record: {
        bagId: string,
        bagSize: string,
        batchNumber: string,
        coffeeType: string,
        measurmentUnit: string,
        owner: string,
        productionDate: string,
        productionPlace: string,
        status: string,
        supplyCoffeeBatchNumber: string,
        traceability: {
            coffeeCherryBatchNumber: string,
            coffeeCherryDeliveryDate: string,
            coffeeCheryDeliveryId: string,
            coffeegrower: string,
            farmPlace: string,
            supplyCoffeeBatchnumber: string
        }
    }
}

export interface CoffeeIndResult {
    Key: string,
    Record: {
        address: string,
        hasAirConditioner: string,
        hasColorSorter: string,
        hasDensmetricSeparator: string,
        hasPneumaticAspirate: string,
        hasPreCleaner: string,
        hasScreanGrading: string,
        id: string,
        latitude: string,
        longitude: string,
        machineSpec: string,
        name: string,
        owner: string,
        size: string,
        warehouseSize: string
    }
}

export interface ExportCoffeeState {
    loading: boolean,
    adding: boolean,
    coffeeInd: CoffeeInd,
    exportCoffee: ExportCoffee,
    error?: string
}

const initialState: ExportCoffeeState = {
    loading: false,
    adding: false,
    coffeeInd: { response: [] },
    exportCoffee: { response: [] },
    error: ''
}

export const exportCoffeeSlice = createSlice({
    name: 'exportCoffee',
    initialState: initialState,
    extraReducers(builder) {
        builder.addCase(GetAllExportCoffee.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetAllExportCoffee.fulfilled, (state, action) => {
            state.loading = false;
            state.exportCoffee.response = action.payload.response;
            state.error = '';
        })
        builder.addCase(GetAllExportCoffee.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message;
        })

        builder.addCase(GetAllIndExportCoffee.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetAllIndExportCoffee.fulfilled, (state, action) => {
            state.loading = false;
            state.coffeeInd.response = action.payload.response;
            state.error = '';
        })
        builder.addCase(GetAllIndExportCoffee.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message;
        })

        builder.addCase(RegisterInd.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(RegisterInd.fulfilled, (state, action) => {
            state.adding = false;
            state.error = '';
        })
        builder.addCase(RegisterInd.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message;
        })

        builder.addCase(RequestCoffeeExport.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(RequestCoffeeExport.fulfilled, (state, action) => {
            state.adding = false;
            state.error = '';
        })
        builder.addCase(RequestCoffeeExport.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message;
        })

    },
    reducers: {
    }
})

export const { } = exportCoffeeSlice.actions

export default exportCoffeeSlice.reducer