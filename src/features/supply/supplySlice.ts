import { createSlice } from '@reduxjs/toolkit';
import {
    AddSupplyCoffeeShipment,
    DeliverSupplyCoffeeShipment,
    FetchAllNaturalCoffee,
    FetchAllWashedCoffee,
    GetAllSupplyCoffeeShipment,
    GetAllProducedCoffee,
    ProduceNaturalCoffee,
    ProduceWashedCoffee,
    RegisterNaturalCoffee,
    RegisterWashedCoffee,
    ReturnSupplyCoffeeShipment,
    GradeProducedCoffee,
    DeleteSupplycoffee
} from '../../api/supply';

export interface WashedCoffee {
    result: WashedCoffeeResult[];
}

export interface NaturalCoffee {
    result: NaturalCoffeeResult[];
}

export interface SupplyShipment {
    response: SupplyShipmentResult[];
}

export interface ProducedCoffee {
    result: ProducedCoffeeResult[];
}

export interface NaturalCoffeeResult {
    Key: string,
    Record: {
        address: string;
        dringAreaSize: string;
        hasMoistureCalibrator: boolean;
        hasWeightingScale: boolean;
        latitude: string;
        longitude: string;
        machineSpec: string;
        name: string;
        owner: string;
        size: string;
        txId: string;
        id: string;
        warehouseSize: string;
    }
}
export interface WashedCoffeeResult {
    Key: string,
    Record: {
        address: string;
        distanceFromRiver: string;
        hasFermentationPlace: boolean;
        hasMoistureCalibrator: boolean;
        hasSkinDring: boolean;
        hasSortingTable: boolean;
        hasWashingCanal: boolean;
        hasWeightingScale: boolean;
        latitude: string;
        longitude: string;
        name: string;
        owner: string;
        size: string;
        id: string;
        warehouseSize: string;
    }
}

export interface SupplyShipmentResult {
    Key: string,
    Record: {
        bags: [
        ],
        coffeeType: string,
        deliveryDate: string,
        destination: string,
        id: string,
        owner: string,
        quantity: string,
        recievedBy: string,
        shipmentDate: string,
        status: string,
        supplyCoffeeBatch: string,
        transporter: string,
        truck: string,
        txId: string
    }
}

export interface ProducedCoffeeResult {
    Key: string,
    Record: {
        bagId: string,
        bagSize: string,
        batchNumber: string,
        coffeeCherryBatchNo: string,
        coffeeType: string,
        currency: string,
        id: string,
        isShipped: boolean,
        measurmentUnit: string,
        owner: string,
        productionDate: string,
        productionPlace: string,
        shimpemntId: string,
        shipment: {
            destination: string,
            shipmentDate: string,
            transporter: string,
            truck: string
        },
        status: string,
        traceability: {
            batchNumber: string,
            coffeegrower: string,
            deliveryDate: string,
            deliveryId: string,
            farmPlace: string
        },
        txId: string
    }

}
export interface SupplyCoffeeState {
    loading: boolean,
    adding: boolean,
    returning: boolean,
    delivering: boolean,
    grading: boolean,
    deleting: boolean,
    washedCoffee: WashedCoffee,
    naturalCoffee: NaturalCoffee,
    supplyShipment: SupplyShipment,
    producedCoffee: ProducedCoffee,

    error?: string
}

const initialState: SupplyCoffeeState = {
    loading: false,
    adding: false,
    returning: false,
    delivering: false,
    grading: false,
    deleting: false,
    washedCoffee: { result: [] },
    naturalCoffee: { result: [] },
    supplyShipment: { response: [] },
    producedCoffee: { result: [] },
    error: ''
}

export const supplySlice = createSlice({
    name: 'supply',
    initialState: initialState,
    extraReducers(builder) {
        builder.addCase(FetchAllWashedCoffee.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(FetchAllWashedCoffee.fulfilled, (state, action) => {
            state.loading = false;
            state.washedCoffee.result = action.payload.result;
        })
        builder.addCase(FetchAllWashedCoffee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(FetchAllNaturalCoffee.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(FetchAllNaturalCoffee.fulfilled, (state, action) => {
            state.loading = false;
            state.naturalCoffee.result = action.payload.result;
        })
        builder.addCase(FetchAllNaturalCoffee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(RegisterWashedCoffee.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(RegisterWashedCoffee.fulfilled, (state, action) => {
            state.adding = false;
        })
        builder.addCase(RegisterWashedCoffee.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })

        builder.addCase(RegisterNaturalCoffee.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(RegisterNaturalCoffee.fulfilled, (state, action) => {
            state.adding = false;
        })
        builder.addCase(RegisterNaturalCoffee.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })

        builder.addCase(ProduceWashedCoffee.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(ProduceWashedCoffee.fulfilled, (state, action) => {
            state.adding = false;
        })
        builder.addCase(ProduceWashedCoffee.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })

        builder.addCase(ProduceNaturalCoffee.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(ProduceNaturalCoffee.fulfilled, (state, action) => {
            state.adding = false;
        })
        builder.addCase(ProduceNaturalCoffee.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })

        builder.addCase(AddSupplyCoffeeShipment.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(AddSupplyCoffeeShipment.fulfilled, (state, action) => {
            state.adding = false;
        })
        builder.addCase(AddSupplyCoffeeShipment.rejected, (state, action) => {
            state.adding = false;
            state.error = action.error.message;
        })

        builder.addCase(GetAllSupplyCoffeeShipment.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetAllSupplyCoffeeShipment.fulfilled, (state, action) => {
            state.loading = false;
            state.supplyShipment.response = action.payload.response;
        })
        builder.addCase(GetAllSupplyCoffeeShipment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(DeliverSupplyCoffeeShipment.pending, (state) => {
            state.delivering = true;
        })
        builder.addCase(DeliverSupplyCoffeeShipment.fulfilled, (state, action) => {
            state.delivering = false;
        })
        builder.addCase(DeliverSupplyCoffeeShipment.rejected, (state, action) => {
            state.delivering = false;
            state.error = action.error.message;
        })

        builder.addCase(ReturnSupplyCoffeeShipment.pending, (state) => {
            state.returning = true;
        })
        builder.addCase(ReturnSupplyCoffeeShipment.fulfilled, (state, action) => {
            state.returning = false;
        })
        builder.addCase(ReturnSupplyCoffeeShipment.rejected, (state, action) => {
            state.returning = false;
            state.error = action.error.message;
        })

        builder.addCase(GetAllProducedCoffee.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetAllProducedCoffee.fulfilled, (state, action) => {
            state.loading = false;
            state.producedCoffee.result = action.payload.result;
        })
        builder.addCase(GetAllProducedCoffee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(GradeProducedCoffee.pending, (state) => {
            state.grading = true;
        })
        builder.addCase(GradeProducedCoffee.fulfilled, (state, action) => {
            state.grading = false;
        })
        builder.addCase(GradeProducedCoffee.rejected, (state, action) => {
            state.grading = false;
            state.error = action.error.message;
        })

        builder.addCase(DeleteSupplycoffee.pending, (state) => {
            state.deleting = true;
        })
        builder.addCase(DeleteSupplycoffee.fulfilled, (state, action) => {
            state.deleting = false;
        })
        builder.addCase(DeleteSupplycoffee.rejected, (state, action) => {
            state.deleting = false;
            state.error = action.error.message;
        })
    },
    reducers: {}

});

export default supplySlice.reducer