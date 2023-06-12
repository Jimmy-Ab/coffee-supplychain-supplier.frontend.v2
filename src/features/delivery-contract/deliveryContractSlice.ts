import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { ApproveDeliveryContract, DeleteDeliveryContract, GetAllDeliveryContract, InitiateDeliveryContract, SignDeliveryContract, TerminateDeliveryContract } from '@/api/delivery-contract';

export interface DeliveryContract {
    response: DeliveryContractResult[];
}

export interface DeliveryContractResult {
    Key: string,
    Record: {
        BuyerRemark: string,
        buyer: string,
        buyerObligation: string,
        buyerRight: string,
        contractGoal: string,
        contractStatus: string,
        contractType: string,
        cta: string,
        deliveredQuantity: string,
        deliveryAddress: string,
        ectRemark: string,
        endDate: string,
        expectedQuantity: string,
        id: string,
        initiatedDate: string,
        pricePercentage: string,
        seller: string,
        sellerObligation: string,
        sellerRight: string,
        startDate: string,
        signedDate: string,
        txId: string
    }
}

export interface DeliveryContractState {
    loading: boolean,
    adding: boolean,
    deleting: boolean,
    signing: boolean,
    approving: boolean,
    terminating: boolean,
    deliveryContract: DeliveryContract,
    error?: string
}

const initialState: DeliveryContractState = {
    loading: false,
    adding: false,
    deleting: false,
    signing: false,
    approving: false,
    terminating: false,
    deliveryContract: { response: [] },
    error: ''
}

export const deliveryContractSlice = createSlice({
    name: 'deliveryContract',
    initialState: initialState,
    extraReducers(builder) {
        builder.addCase(GetAllDeliveryContract.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetAllDeliveryContract.fulfilled, (state, action) => {
            state.loading = false;
            state.deliveryContract.response = action.payload.response;
            state.error = '';
        })
        builder.addCase(GetAllDeliveryContract.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message;
        })

        builder.addCase(InitiateDeliveryContract.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(InitiateDeliveryContract.fulfilled, (state, action) => {
            state.adding = false;
            state.error = '';

        })
        builder.addCase(InitiateDeliveryContract.rejected, (state, action) => {
            state.adding = false
            state.error = action.error.message;
        })

        builder.addCase(SignDeliveryContract.pending, (state) => {
            state.signing = true;
        })
        builder.addCase(SignDeliveryContract.fulfilled, (state, action) => {
            state.signing = false;
            state.error = '';
        })
        builder.addCase(SignDeliveryContract.rejected, (state, action) => {
            state.signing = false
            state.error = action.error.message;
        })

        builder.addCase(ApproveDeliveryContract.pending, (state) => {
            state.approving = true;
        })
        builder.addCase(ApproveDeliveryContract.fulfilled, (state, action) => {
            state.approving = false;
            state.error = '';
        })
        builder.addCase(ApproveDeliveryContract.rejected, (state, action) => {
            state.approving = false
            state.error = action.error.message;
        })

        builder.addCase(TerminateDeliveryContract.pending, (state) => {
            state.terminating = true;
        })
        builder.addCase(TerminateDeliveryContract.fulfilled, (state, action) => {
            state.terminating = false;
            state.error = '';
        })
        builder.addCase(TerminateDeliveryContract.rejected, (state, action) => {
            state.terminating = false
            state.error = action.error.message;
        })

        builder.addCase(DeleteDeliveryContract.pending, (state) => {
            state.deleting = true;
        })
        builder.addCase(DeleteDeliveryContract.fulfilled, (state, action) => {
            state.deleting = false;
            state.error = '';
        })
        builder.addCase(DeleteDeliveryContract.rejected, (state, action) => {
            state.deleting = false
            state.error = action.error.message;
        })
    },
    reducers: {
    }
})

export const { } = deliveryContractSlice.actions

export default deliveryContractSlice.reducer