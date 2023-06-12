import { contractDeliverySlice } from "@/features/contract-delivery/contractDeliverySlice";
import { deliveryContractSlice } from "@/features/delivery-contract/deliveryContractSlice";
import { exportCoffeeSlice } from "@/features/export-coffee/exportCoffeeSlice";
import { supplySlice } from "@/features/supply/supplySlice";
import { transportationSlice } from "@/features/transportation/transportationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cherrySlice } from "../features/cherry/cherrySlice";
import { growerSlice } from "../features/grower/growerSlice";
import { priceSlice } from "../features/price/PriceSlice";
import { warehouseSlice } from "../features/warehouse/warehouseSlice";

export const store = configureStore({
    reducer: {
        warehouse: warehouseSlice.reducer,
        grower: growerSlice.reducer,
        coffeePrice: priceSlice.reducer,
        cherry: cherrySlice.reducer,
        supply: supplySlice.reducer,
        transportation: transportationSlice.reducer,
        deliveryContract: deliveryContractSlice.reducer,
        contractDelivery: contractDeliverySlice.reducer,
        exportCoffee: exportCoffeeSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

