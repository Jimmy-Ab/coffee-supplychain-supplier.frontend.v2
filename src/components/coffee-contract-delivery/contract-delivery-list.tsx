import Head from 'next/head';
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Pagination,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { GetAllDeliveryContract } from '@/api/delivery-contract';
import { Skeleton } from 'antd';
import { ContractDeliveryCard } from './contract-delivery-card';
import { ContractDeliveryResult } from '@/features/contract-delivery/contractDeliverySlice';
import { GetAllContractDelivery } from '@/api/contract-delivery';
import { ContractDeliveryToolbar } from './contract-delivery-toolbar';
import { DeliveryContractResult } from '@/features/delivery-contract/deliveryContractSlice';
import { GetAllSupplyCoffeeShipment } from '@/api/supply';

function ContractDeliveryList() {
    const dispatch = useAppDispatch();
    const contractDeliverys = useAppSelector(state => state.contractDelivery.contractDelivery.response);
    const deliveryContracts = useAppSelector(state => state.deliveryContract.deliveryContract.response);
    const supplyShipments = useAppSelector(state => state.supply.supplyShipment.response);
    const loading = useAppSelector(state => state.contractDelivery.loading);
    const loading1 = useAppSelector(state => state.deliveryContract.loading);

    const [filteredContractDeliveries, setFilteredContractDeliveries] = useState<ContractDeliveryResult[]>();
    const [filteredDeliveryContracts, setFilteredDeliveryContracts] = useState<DeliveryContractResult[]>([]);

    const [page, setPage] = useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const onSearch = (event: any) => {
        let contracts = contractDeliverys?.filter(deliveries =>
            deliveries.Record.coffeePrice?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            deliveries.Record.coffeeType?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            deliveries.Record.deliveryDate?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            deliveries.Record.quantity?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            deliveries.Record.status?.toLowerCase().includes(event.target.value.toLowerCase())

        )
        setFilteredContractDeliveries(contracts);
    }

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(GetAllDeliveryContract());
            await dispatch(GetAllContractDelivery());
            await dispatch(GetAllSupplyCoffeeShipment())
        }

        fetchData();

        setFilteredContractDeliveries(contractDeliverys);
        setFilteredDeliveryContracts(deliveryContracts);
    }, [contractDeliverys.length])
    return (
        <>
            <Card
                sx={{
                    p: 4
                }}>
                <Stack
                    spacing={1}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <ContractDeliveryToolbar
                            onSearch={onSearch}
                            deliveryContracts={deliveryContracts.filter(c => c.Record.contractStatus === "APPROVED")}
                            supplyShipments={supplyShipments.filter(s => s.Record.status === "DELIVERED")}
                        />
                    </Stack>
                    {loading || loading1 ?
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <Card>
                                    <Box sx={{ padding: 0 }}>
                                        <Skeleton active paragraph />
                                        <Divider sx={{ my: 2 }} />
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <Card>
                                    <Box sx={{ padding: 0 }}>
                                        <Skeleton active paragraph />
                                        <Divider sx={{ my: 2 }} />
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                        :
                        <Grid
                            container
                            spacing={2}
                        >
                            {filteredContractDeliveries?.slice((page - 1) * 6, (page - 1) * 6 + 6).map((contractDelivery) => (
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={6}
                                    key={contractDelivery.Key}
                                >
                                    <ContractDeliveryCard
                                        contractDelivery={contractDelivery}
                                        deliveryContracts={filteredDeliveryContracts}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    }
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Pagination
                            count={Math.ceil(contractDeliverys.length / 6)}
                            size="small"
                            page={page}
                            onChange={handleChange}
                            color="primary"
                        />
                    </Box>
                </Stack>
            </Card>
        </>
    )
}

export default ContractDeliveryList;