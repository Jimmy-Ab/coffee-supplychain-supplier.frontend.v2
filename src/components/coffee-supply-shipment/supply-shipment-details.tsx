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
import { DeliverSupplyCoffeeShipment, GetAllSupplyCoffeeShipment, ReturnSupplyCoffeeShipment } from "@/api/supply";
import { SupplyShipmentResult } from "@/features/supply/supplySlice";
import SupplyShipmentBags from "./supply-shipment-bags";

function SupplyShipmentDetail() {

    const dispatch = useAppDispatch();
    const coffeeSupplyShipments = useAppSelector(state => state.supply.supplyShipment.response);
    const transportations = useAppSelector(state => state.transportation.tranportation.response);
    const loading = useAppSelector(state => state.supply.loading);
    const adding = useAppSelector(state => state.supply.adding);
    const delivering = useAppSelector(state => state.supply.delivering);
    const returning = useAppSelector(state => state.supply.returning);
    const error = useAppSelector(state => state.supply.error);
    const [selectedCoffeeSupply, setSelectedCoffeeSupply] = useState<SupplyShipmentResult>();
    const router = useRouter()
    const { id } = router.query

    const [values, setValues] = useState({
        bags: [],
        coffeeType: '',
        deliveryDate: '',
        destination: '',
        id: '',
        owner: '',
        quantity: '',
        recievedBy: '',
        shipmentDate: '',
        status: '',
        supplyCoffeeBatch: '',
        transporter: '',
        truck: '',
        txId: ''
    });
    const [deliverValues, setDeliverValues] = useState({
        id: id,
        deliveryDate: '',
        recievedBy: ''
    })

    const [deliverAnchorEl, setDeliverAnchorEl] = useState<HTMLButtonElement | null>(null);
    const deliverOpen = Boolean(deliverAnchorEl);
    const deliverPopOverId = deliverOpen ? 'simple-popover' : undefined;

    const HandleChange = (event: any) => {
        setDeliverValues({
            ...deliverValues,
            [event.target.name]: event.target.value
        })
    }

    const handleDeliverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDeliverAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setDeliverAnchorEl(null);
    };


    const HandleDeliver = async () => {
        handleClose();
        await dispatch(DeliverSupplyCoffeeShipment(deliverValues));
        await dispatch(GetAllSupplyCoffeeShipment());
        Router
            .push('/coffee-supply-shipment')
            .catch(console.error);
    }

    const openNotification = (message: string) => {
        notification.open({
            message: 'Success',
            description: message,
            placement: 'bottomRight'
        });
    };

    useEffect(() => {
        setSelectedCoffeeSupply(coffeeSupplyShipments.find(g => g.Record.id === id));
        setValues({
            bags: selectedCoffeeSupply?.Record.bags || [],
            coffeeType: selectedCoffeeSupply?.Record.coffeeType || '',
            deliveryDate: selectedCoffeeSupply?.Record.deliveryDate || '',
            destination: selectedCoffeeSupply?.Record.destination || '',
            id: selectedCoffeeSupply?.Record.id || '',
            owner: selectedCoffeeSupply?.Record.owner || '',
            quantity: selectedCoffeeSupply?.Record.quantity || '',
            recievedBy: selectedCoffeeSupply?.Record.recievedBy || '',
            shipmentDate: selectedCoffeeSupply?.Record.shipmentDate || '',
            status: selectedCoffeeSupply?.Record.status || '',
            supplyCoffeeBatch: selectedCoffeeSupply?.Record.supplyCoffeeBatch || '',
            transporter: transportations.find(t => t.Record.id === selectedCoffeeSupply?.Record.transporter)?.Record.givenFor || '',
            truck: selectedCoffeeSupply?.Record.truck || '',
            txId: selectedCoffeeSupply?.Record.txId || ''
        })
    }, [selectedCoffeeSupply])
    return (
        <>

            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <SupplyShipmentBags />
                </Grid>
                <Grid
                    item
                    md={8}
                    xs={12}
                >
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
                                            label="Coffee Type"
                                            name="address"
                                            value={values.coffeeType}
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
                                            label="Delivery Date"
                                            name="deliveryDate"
                                            value={values.deliveryDate}
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
                                            label="Destination"
                                            name="destination"
                                            value={values.destination}
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
                                            label="Owner"
                                            name="owner"
                                            value={values.owner}
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
                                            label="Quantity"
                                            name="quantity"
                                            value={values.quantity}
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
                                            label="Recieved By"
                                            name="recievedBy"
                                            value={values.recievedBy}
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
                                            label="Shipment Date"
                                            name="shipmentDate"
                                            value={values.shipmentDate}
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
                                            label="Supply Coffee Batch Number"
                                            name="supplyCoffeeBatch"
                                            value={values.supplyCoffeeBatch}
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
                                            label="Transporter"
                                            name="transporter"
                                            value={values.transporter}
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
                                            label="Truck"
                                            name="truck"
                                            value={values.truck}
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
                                            label="Status"
                                            name="status"
                                            value={values.status}
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

                                {delivering ?
                                    <Stack
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <CircularProgress
                                            color="success"
                                        />
                                    </Stack>
                                    :
                                    <Button
                                        fullWidth
                                        color="secondary"
                                        variant="contained"
                                        disabled={
                                            delivering ||
                                            returning ||
                                            loading ||
                                            values.status === "DELIVERED" ||
                                            values.status === "RETURNED"

                                        }
                                        onClick={handleDeliverClick}
                                    >
                                        Deliver
                                    </Button>
                                }

                            </Box>
                        </form>
                        <Box>
                            <Popover
                                sx={{ p: 3 }}
                                id={deliverPopOverId}
                                open={deliverOpen}
                                anchorEl={deliverAnchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Box sx={{ m: 2 }} >
                                    <Typography >
                                        Are you sure you want Deliver this shipment?
                                    </Typography>
                                    <TextField
                                        sx={{ mt: 2 }}
                                        size='small'
                                        fullWidth
                                        type='date'
                                        label="Delivery Date"
                                        name="deliveryDate"
                                        value={deliverValues.deliveryDate}
                                        onChange={HandleChange}
                                    />
                                    <TextField
                                        sx={{ mt: 2 }}
                                        size='small'
                                        fullWidth
                                        label="Recieved By"
                                        name="recievedBy"
                                        value={deliverValues.recievedBy}
                                        onChange={HandleChange}
                                    />
                                    <Button
                                        color="primary"
                                        fullWidth
                                        variant="text"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="secondary"
                                        fullWidth
                                        variant="contained"
                                        onClick={HandleDeliver}
                                        disabled={deliverValues.deliveryDate === '' || deliverValues.recievedBy === ''}
                                    >
                                        Yes, Deliver
                                    </Button>
                                </Box>
                            </Popover>
                        </Box>
                    </Card >
                </Grid>
            </Grid>
        </>
    );
}


export default SupplyShipmentDetail;