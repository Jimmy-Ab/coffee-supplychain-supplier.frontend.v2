import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    Popover,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { notification } from "antd"
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Router from 'next/router';
import { GetAllSupplyCoffeeShipment } from "@/api/supply";
import {
    SignDeliveryContract,
} from "@/api/delivery-contract";

import { DeliveryContractResult } from "@/features/delivery-contract/deliveryContractSlice";

function DeliveryContractDetail() {

    const dispatch = useAppDispatch();
    const deliveryContracts = useAppSelector(state => state.deliveryContract.deliveryContract.response);
    const loading = useAppSelector(state => state.supply.loading);
    const approving = useAppSelector(state => state.deliveryContract.approving);
    const signing = useAppSelector(state => state.deliveryContract.signing);
    const terminating = useAppSelector(state => state.deliveryContract.terminating);
    const deleting = useAppSelector(state => state.deliveryContract.deleting);
    const error = useAppSelector(state => state.deliveryContract.error);
    const [selectedDeliveryContract, setSelectedDeliveryContract] = useState<DeliveryContractResult>();
    const router = useRouter()
    const { id } = router.query

    const [values, setValues] = useState({
        BuyerRemark: '',
        buyer: '',
        buyerObligation: '',
        buyerRight: '',
        contractGoal: '',
        contractStatus: '',
        contractType: '',
        cta: '',
        deliveredQuantity: '',
        deliveryAddress: '',
        ectRemark: '',
        endDate: '',
        expectedQuantity: '',
        id: '',
        initiatedDate: '',
        pricePercentage: '',
        seller: '',
        sellerObligation: '',
        sellerRight: '',
        startDate: '',
        signedDate: '',
        txId: ''
    })

    const [signValues, setSignValues] = useState({
        id: id,
        sellerRemark: 'OrgsupplierMSP',
    })

    const HandleSignChange = (event: any) => {
        setSignValues({
            ...signValues,
            [event.target.name]: event.target.value
        })
    }

    const [signAnchorEl, setSignAnchorEl] = useState<HTMLButtonElement | null>(null);
    const signOpen = Boolean(signAnchorEl);
    const signPopOverId = signOpen ? 'simple-popover' : undefined;



    const handleSignClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSignAnchorEl(event.currentTarget);
    };



    const handleClose = () => {
        setSignAnchorEl(null);
    };

    const HandleSign = async () => {
        handleClose();
        await dispatch(SignDeliveryContract(signValues));
        await dispatch(GetAllSupplyCoffeeShipment());

        Router
            .push('/coffee-delivery-contract')
            .catch(console.error);
    }

    const openNotification = (status: string, message: string) => {
        notification.open({
            message: status,
            description: message,
            placement: 'bottomRight'
        });
    };

    useEffect(() => {
        setSelectedDeliveryContract(deliveryContracts.find(g => g.Record.id === id));

        setValues({
            BuyerRemark: selectedDeliveryContract?.Record.BuyerRemark || '',
            buyer: selectedDeliveryContract?.Record.buyer || '',
            buyerObligation: selectedDeliveryContract?.Record.buyerObligation || '',
            buyerRight: selectedDeliveryContract?.Record.buyerRight || '',
            contractGoal: selectedDeliveryContract?.Record.contractGoal || '',
            contractStatus: selectedDeliveryContract?.Record.contractStatus || '',
            contractType: selectedDeliveryContract?.Record.contractType || '',
            cta: selectedDeliveryContract?.Record.cta || '',
            deliveredQuantity: selectedDeliveryContract?.Record.deliveredQuantity || '',
            deliveryAddress: selectedDeliveryContract?.Record.deliveryAddress || '',
            ectRemark: selectedDeliveryContract?.Record.ectRemark || '',
            endDate: selectedDeliveryContract?.Record.endDate || '',
            expectedQuantity: selectedDeliveryContract?.Record.expectedQuantity || '',
            id: selectedDeliveryContract?.Record.id || '',
            initiatedDate: selectedDeliveryContract?.Record.initiatedDate || '',
            pricePercentage: selectedDeliveryContract?.Record.pricePercentage || '',
            seller: selectedDeliveryContract?.Record.seller || '',
            sellerObligation: selectedDeliveryContract?.Record.sellerObligation || '',
            sellerRight: selectedDeliveryContract?.Record.sellerRight || '',
            startDate: selectedDeliveryContract?.Record.startDate || '',
            signedDate: selectedDeliveryContract?.Record.signedDate || '',
            txId: selectedDeliveryContract?.Record.txId || ''
        })
        if (error) {
            openNotification('Error', error);
        }
    }, [selectedDeliveryContract, error])
    return (
        <>
            <Card
                sx={{
                    p: 2
                }}
            >
                <form
                    autoComplete="off"
                    noValidate
                >
                    <CardHeader
                        subheader="This information cannot be edited"
                        title="Details"
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="Buyer Remark"
                                    name="BuyerRemark"
                                    value={values.BuyerRemark}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="Buyer"
                                    name="buyer"
                                    value={values.buyer}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Buyer Obligation"
                                    name="buyerObligation"
                                    value={values.buyerObligation}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Buyer Right"
                                    name="buyerRight"
                                    value={values.buyerRight}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Contract Goal"
                                    name="contractGoal"
                                    value={values.contractGoal}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Id"
                                    name="id"
                                    value={values.id}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Contract Type "
                                    name="contractType"
                                    value={values.contractType}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="CTA"
                                    name="cta"
                                    value={values.cta}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Delivered Quantity"
                                    name="deliveredQuantity"
                                    value={values.deliveredQuantity}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Delivery Address"
                                    name="deliveryAddress"
                                    value={values.deliveryAddress}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="ECT Remark"
                                    name="ectRemark"
                                    value={values.ectRemark}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Start Date"
                                    name="startDate"
                                    value={values.startDate}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="End Date"
                                    name="endDate"
                                    value={values.endDate}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Expected Quantity"
                                    name="expectedQuantity"
                                    value={values.expectedQuantity}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Initiated Date"
                                    name="initiatedDate"
                                    value={values.initiatedDate}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Price Percentage"
                                    name="pricePercentage"
                                    value={values.pricePercentage}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Seller"
                                    name="seller"
                                    value={values.seller}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Seller Obligation"
                                    name="sellerObligation"
                                    value={values.sellerObligation}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Seller Right"
                                    name="sellerRight"
                                    value={values.sellerRight}
                                />
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Signed Date"
                                    name="signedDate"
                                    value={values.signedDate}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            pt: 2
                        }}
                    >
                        {signing ?
                            <Stack
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <CircularProgress
                                    color="primary"
                                />
                            </Stack>
                            :
                            <Button
                                fullWidth
                                color="primary"
                                variant="contained"
                                disabled={
                                    signing ||
                                    deleting ||
                                    loading ||
                                    values.contractStatus === "APPROVED" ||
                                    values.contractStatus === "SIGNED"
                                }
                                onClick={handleSignClick}

                            >
                                Sign
                            </Button>
                        }
                    </Box>
                </form>
                <Box>
                    <Popover
                        sx={{ p: 2 }}
                        id={signPopOverId}
                        open={signOpen}
                        anchorEl={signAnchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{ m: 2 }} >
                            <Typography >
                                Are you sure you want Sign this Contract?
                            </Typography>
                            {/* <TextField
                                sx={{ mt: 2 }}
                                size='small'
                                fullWidth
                                label="Seller Remark"
                                name="sellerRemark"
                                value={signValues.sellerRemark}
                                onChange={HandleSignChange}
                            /> */}
                            <Button
                                color="primary"
                                fullWidth
                                variant="text"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                fullWidth
                                variant="contained"
                                // disabled={signValues.sellerRemark === ''}
                                onClick={HandleSign}
                            >
                                Yes, Sign
                            </Button>
                        </Box>
                    </Popover>
                </Box>
            </Card >
        </>
    );
}


export default DeliveryContractDetail;