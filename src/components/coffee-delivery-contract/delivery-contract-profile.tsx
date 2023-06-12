import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Divider,
    Popover,
    Stack,
    Typography
} from '@mui/material';
import { useRouter } from 'next/router'
import { DeleteGrower, GetAllGrowers } from "@/api/grower";
import Router from 'next/router';
import { getInitials } from '@/utils/get-initials';
import { DeliveryContractResult } from "@/features/delivery-contract/deliveryContractSlice";
import { DeleteDeliveryContract, GetAllDeliveryContract } from "@/api/delivery-contract";
import { Tag, notification } from "antd";
import dateFormat from "dateformat";


function DeliveryContractProfile() {
    const dispatch = useAppDispatch();
    const deliveryContracts = useAppSelector(state => state.deliveryContract.deliveryContract.response);
    const deleting = useAppSelector(state => state.deliveryContract.deleting);
    const error = useAppSelector(state => state.deliveryContract.error);
    const [selectedDeliveryContract, setSelectedDeliveryContract] = useState<DeliveryContractResult>();
    const router = useRouter();
    const { id } = router.query;
   
    const openNotification = (message: string) => {
        notification.open({
            message: 'Success',
            description: message,
            placement: 'bottomRight'
        });
    };

    useEffect(() => {
        setSelectedDeliveryContract(deliveryContracts.find(g => g.Record.id === id));
    }, [selectedDeliveryContract, error])
    return (
        <Card >
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                        }}
                    >
                        {getInitials(selectedDeliveryContract?.Record.buyer)}
                    </Avatar>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {selectedDeliveryContract?.Record.buyer}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="h6"
                    >
                        Started {dateFormat(selectedDeliveryContract?.Record.startDate, "mmm d, yyyy")}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        {selectedDeliveryContract?.Record.BuyerRemark}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 2
                        }}
                    >
                        <Tag
                            color={(selectedDeliveryContract?.Record.contractStatus === 'REQUESTED' && '#FFB020')
                                || (selectedDeliveryContract?.Record.contractStatus === 'APPROVED' && '#14B8A6')
                                || (selectedDeliveryContract?.Record.contractStatus === 'SIGNED' && 'success')
                                || '#D14343'}
                        >
                            {selectedDeliveryContract?.Record.contractStatus.toUpperCase()}
                        </Tag>
                    </Box>
                </Box>
            </CardContent>
            <Divider />
        </Card>
    );
}

export default DeliveryContractProfile;