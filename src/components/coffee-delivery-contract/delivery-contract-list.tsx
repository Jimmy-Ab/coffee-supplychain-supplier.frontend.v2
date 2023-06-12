import {
    Box,
    Card,
    Divider,
    Pagination,
    Stack,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { DeliveryContractCard } from './delivery-contract-card';
import { DeliveryContractToolbar } from './delivery-contract-toolbar';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { GetAllDeliveryContract } from '@/api/delivery-contract';
import { Skeleton } from 'antd';
import { DeliveryContractResult } from '@/features/delivery-contract/deliveryContractSlice';

function DeliveryContractList() {
    const dispatch = useAppDispatch();
    const deliveryContracts = useAppSelector(state => state.deliveryContract.deliveryContract.response);
    const loading = useAppSelector(state => state.deliveryContract.loading);
    const [filteredDeliverycontracts, setFilteredDeliveryContracts] = useState<DeliveryContractResult[]>();
    const [page, setPage] = useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const onSearch = (event: any) => {
        let contracts = deliveryContracts?.filter(contract =>
            contract.Record.BuyerRemark?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.buyer?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.buyerObligation?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.buyerRight?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.contractGoal?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.contractStatus?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.cta?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.contractType?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.deliveryAddress?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.endDate?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.initiatedDate?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.pricePercentage?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.seller?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            contract.Record.startDate?.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredDeliveryContracts(contracts);
    }

    useEffect(() => {
        dispatch(GetAllDeliveryContract());
        setFilteredDeliveryContracts(deliveryContracts)
    }, [deliveryContracts.length])
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
                        <DeliveryContractToolbar onSearch={onSearch} />
                    </Stack>
                    {loading ?
                        <Grid
                            container
                            spacing={2}
                        >
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={4}
                                >
                                    <Card>
                                        <Box sx={{ padding: 0 }}>
                                            <Skeleton active paragraph />
                                            <Divider sx={{ my: 2 }} />
                                            <Skeleton active />
                                        </Box>
                                    </Card>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={4}
                                >
                                    <Card>
                                        <Box sx={{ padding: 0 }}>
                                            <Skeleton active paragraph />
                                            <Divider sx={{ my: 2 }} />
                                            <Skeleton active />
                                        </Box>
                                    </Card>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={4}
                                >
                                    <Card>
                                        <Box sx={{ padding: 0 }}>
                                            <Skeleton active paragraph />
                                            <Divider sx={{ my: 2 }} />
                                            <Skeleton active />
                                        </Box>
                                    </Card>
                                </Grid>
                        </Grid>
                        :
                        <Grid
                            container
                            spacing={2}
                        >
                            {filteredDeliverycontracts?.slice((page - 1) * 9, (page - 1) * 9 + 9).map((deliveryContract) => (
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={4}
                                    key={deliveryContract.Key}
                                >
                                    <DeliveryContractCard deliveryContract={deliveryContract} />
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
                            count={Math.ceil(deliveryContracts.length / 9)}
                            size="small"
                            page={page}
                            onChange={handleChange}
                            color="primary"
                            showLastButton
                            showFirstButton
                        />
                    </Box>
                </Stack>    
            </Card>
        </>
    )
}

export default DeliveryContractList;