import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { DeleteCertificateRequest, GetAllTransportationCertificate, GrantCertificateRequest, RequestTransportationCertificate, RevokeCertificateRequest } from '@/api/transportation';

export interface Transportation {
    response: TransportationResult[];
}

export interface TransportationResult {
    Key: string,
    Record: {
        address: string,
        endDate: string,
        givenBy: string,
        givenDate: string,
        givenFor: string,
        id: string,
        loadingTransportLicence: string,
        loadingTrucks: string,
        nationality: string,
        startDate: string,
        status: string,
        tinNumber: string,
        txId: string
    }
}

export interface TransportationState {
    loading: boolean,
    adding: boolean,
    deleting: boolean,
    granting: boolean,
    revoking: boolean,
    tranportation: Transportation,
    error?: string
}

const initialState: TransportationState = {
    loading: false,
    adding: false,
    deleting: false,
    granting: false,
    revoking: false,
    tranportation: { response: [] },
    error: ''
}

export const transportationSlice = createSlice({
    name: 'transportation',
    initialState: initialState,
    extraReducers(builder) {
        builder.addCase(GetAllTransportationCertificate.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetAllTransportationCertificate.fulfilled, (state, action) => {
            state.loading = false;
            state.tranportation.response = action.payload.response;
            state.error = '';
        })
        builder.addCase(GetAllTransportationCertificate.rejected, (state, action) => {
            state.tranportation.response = []
            state.loading = false
            state.error = action.error.message;
        })

        builder.addCase(RequestTransportationCertificate.pending, (state) => {
            state.adding = true;
        })
        builder.addCase(RequestTransportationCertificate.fulfilled, (state, action) => {
            state.adding = false;
            state.error = '';
        })
        builder.addCase(RequestTransportationCertificate.rejected, (state, action) => {
            state.adding = false
            state.error = action.error.message;
        })

        builder.addCase(DeleteCertificateRequest.pending, (state) => {
            state.deleting = true;
        })
        builder.addCase(DeleteCertificateRequest.fulfilled, (state, action) => {
            state.deleting = false;
            state.error = '';
        })
        builder.addCase(DeleteCertificateRequest.rejected, (state, action) => {
            state.deleting = false
            state.error = action.error.message;
        })

        builder.addCase(GrantCertificateRequest.pending, (state) => {
            state.granting = true;
        })
        builder.addCase(GrantCertificateRequest.fulfilled, (state, action) => {
            state.granting = false;
            state.error = '';
        })
        builder.addCase(GrantCertificateRequest.rejected, (state, action) => {
            state.granting = false
            state.error = action.error.message;
        })

        builder.addCase(RevokeCertificateRequest.pending, (state) => {
            state.revoking = true;
        })
        builder.addCase(RevokeCertificateRequest.fulfilled, (state, action) => {
            state.revoking = false;
            state.error = '';
        })
        builder.addCase(RevokeCertificateRequest.rejected, (state, action) => {
            state.revoking = false
            state.error = action.error.message;
        })
    },
    reducers: {
    }
})

export const { } = transportationSlice.actions

export default transportationSlice.reducer