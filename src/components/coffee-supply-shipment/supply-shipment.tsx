import { GetAllSupplyCoffeeShipment, GetAllProducedCoffee } from "@/api/supply";
import { GetAllTransportationCertificate } from "@/api/transportation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { ProducedCoffeeResult, SupplyShipmentResult } from "@/features/supply/supplySlice";
import { Box, Card } from "@mui/material";
import { notification } from "antd";
import { useEffect, useState } from "react";
import SupplyShipmentList from "./supply-shipment-list";
import { SupplyShipmentToolbar } from "./supply-shipment-toolbar";

function CoffeeSupplyShipment() {
    const dispatch = useAppDispatch();
    const supplyShipments = useAppSelector(state => state.supply.supplyShipment.response);
    const supplyCoffee = useAppSelector(state => state.supply.producedCoffee.result);
    const transportations = useAppSelector(state => state.transportation.tranportation.response);
    const error = useAppSelector(state => state.supply.error);
    const [filteredSupplyShipments, setFilteredSupplyShipments] = useState<SupplyShipmentResult[]>([]);
    const [filteredCoffeeSupply, setFilteredCoffeeSupply] = useState<ProducedCoffeeResult[]>([]);


    const onSearch = (event: any) => {

        let shipment = supplyShipments?.filter(supplyShipment =>
            supplyShipment.Record.owner?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            supplyShipment.Record.coffeeType?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            supplyShipment.Record.deliveryDate?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            supplyShipment.Record.destination?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            supplyShipment.Record.recievedBy?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            supplyShipment.Record.status?.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredSupplyShipments(shipment);
    }

    const FilterDatas = () => {
        const filteredSupply = supplyCoffee.filter((value, index, self) =>
            self.findIndex(v => v.Record.batchNumber === value.Record.batchNumber) === index
        );
        setFilteredCoffeeSupply(filteredSupply);

    }

    useEffect(() => {

        const fetchData = async () => {
            await dispatch(GetAllSupplyCoffeeShipment());
        }
        const openNotification = () => {
            notification.open({
                message: 'Something went Wrong',
                description: error,
                placement: "bottomRight"
            });
        };

        if (error) {
            openNotification();
        }
        fetchData();
        FilterDatas();
        setFilteredSupplyShipments(supplyShipments)
    }, [supplyShipments.length])


    return (
        <>
            <Card
                sx={{
                    p: 4
                }}>
                <Box>
                    <SupplyShipmentToolbar
                        onSearch={onSearch}
                    />

                </Box>
                <Box>
                    <SupplyShipmentList
                        filteredSupplyShipments={filteredSupplyShipments}
                    />
                </Box>

            </Card>
        </>
    );
}

export default CoffeeSupplyShipment;