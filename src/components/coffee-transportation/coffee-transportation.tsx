import { GetAllTransportationCertificate } from "@/api/transportation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { TransportationResult } from "@/features/transportation/transportationSlice";
import { Card, Box } from "@mui/material";
import { useEffect, useState } from "react";
import TransportationList from "./transportation-list";
import { TransportationToolbar } from "./transportation-toolbar";
import { notification } from 'antd';

const TransportationCertificate = () => {

    const dispatch = useAppDispatch();
    const transportations = useAppSelector(state => state.transportation.tranportation.response);
    const error = useAppSelector(state => state.transportation.error);
    const [filteredTransportations, setFilteredTransportations] = useState<TransportationResult[]>([]);


    const onSearch = (event: any) => {

        let trnsprt = transportations?.filter(transportation =>
            transportation.Record.address?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            transportation.Record.givenFor?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            transportation.Record.loadingTransportLicence?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            transportation.Record.loadingTrucks?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            transportation.Record.nationality?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            transportation.Record.tinNumber?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            transportation.Record.status?.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredTransportations(trnsprt);
    }

    useEffect(() => {
        dispatch(GetAllTransportationCertificate());

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
        setFilteredTransportations(transportations)
    }, [transportations.length])
    return (
        <>
            <Card
                sx={{
                    p: 4
                }}>
                <Box>
                    <TransportationToolbar
                        onSearch={onSearch}
                    />

                </Box>
                <Box>
                    <TransportationList
                        filteredTransportations={filteredTransportations}
                    />
                </Box>

            </Card>
        </>
    )
}

export default TransportationCertificate;