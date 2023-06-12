import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { ApproveContractDelivery, DeleteContractDelivery, GetAllContractDelivery, PayContractDelivery, RejectContractDelivery, RequestNewContractDelivery } from '@/api/contract-delivery';

export interface ContractDelivery {
    response: ContractDeliveryResult[];
}

export interface ContractDeliveryResult {
    Key: string,
    Record: {
        coffeePrice: string,
        coffeeType: string,
        contractId: string,
        deliveryDate: string,
        id: string,
        quantity: string,
        shipmentId: string,
        status: string
    }
}

export interface ContractDeliveryState {
    loading: boolean,
    adding: boolean,
    deleting: boolean,
    approving: boolean,
    rejecting: boolean,
    paying: boolean,
    contractDelivery: ContractDelivery,
    error?: string
}

const initialState: ContractDeliveryState = {
    loading: false,
    adding: false,
    deleting: false,
    paying: false,
    approving: false,
    rejecting: false,
    contractDelivery: { response: [] },
    error: ''
}

export const contractDeliverySlice = createSlice({
    name: 'contractDelivery',
    initialState: initialState,
    extraReducers(builder) {
        builder.addCase(GetAllContractDelivery.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetAllContractDelivery.fulfilled, (state, action) => {
            state.loading = false;
            state.contractDelivery.response = action.payload.response;
            state.error = '';
        })
        builder.addCase(GetAllContractDelivery.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message;
        })

        builder.addCase(RequestNewContractDelivery.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(RequestNewContractDelivery.fulfilled, (state, action) => {
            state.adding = false;
            state.error = '';

        })
        builder.addCase(RequestNewContractDelivery.rejected, (state, action) => {
            state.adding = false
            state.error = action.error.message;
        })

        builder.addCase(ApproveContractDelivery.pending, (state) => {
            state.approving = true;
        })
        builder.addCase(ApproveContractDelivery.fulfilled, (state, action) => {
            state.approving = false;
            state.error = '';
        })
        builder.addCase(ApproveContractDelivery.rejected, (state, action) => {
            state.approving = false
            state.error = action.error.message;
        })

        builder.addCase(PayContractDelivery.pending, (state) => {
            state.paying = true;
        })
        builder.addCase(PayContractDelivery.fulfilled, (state, action) => {
            state.paying = false;
            state.error = '';
        })
        builder.addCase(PayContractDelivery.rejected, (state, action) => {
            state.paying = false
            state.error = action.error.message;
        })

        builder.addCase(RejectContractDelivery.pending, (state) => {
            state.rejecting = true;
        })
        builder.addCase(RejectContractDelivery.fulfilled, (state, action) => {
            state.rejecting = false;
            state.error = '';
        })
        builder.addCase(RejectContractDelivery.rejected, (state, action) => {
            state.rejecting = false
            state.error = action.error.message;
        })

        builder.addCase(DeleteContractDelivery.pending, (state) => {
            state.deleting = true;
        })
        builder.addCase(DeleteContractDelivery.fulfilled, (state, action) => {
            state.deleting = false;
            state.error = '';
        })
        builder.addCase(DeleteContractDelivery.rejected, (state, action) => {
            state.deleting = false
            state.error = action.error.message;
        })
    },
    reducers: {
    }
})

export const { } = contractDeliverySlice.actions

export default contractDeliverySlice.reducer