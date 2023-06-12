import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    TextField
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { GetAllGrowers } from '../../api/grower';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { AddNewCherryDelivery, GetAllCherryDelivery, UpdateCherryDelivery } from '../../api/cherry';
import { notification } from 'antd';
import Router from 'next/router';
import { useRouter } from 'next/router'
import { fetchAllWarehouses } from '@/api/warehouse';

const AddDeliveryDetails = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useAppDispatch();
    const warehouses = useAppSelector(state => state.warehouse.warehouses.response);
    const growers = useAppSelector(state => state.grower.growers.result);
    const deliveries = useAppSelector(state => state.cherry.cherrys.result);
    const adding = useAppSelector(state => state.cherry.adding);
    const loading = useAppSelector(state => state.cherry.loading);
    const error = useAppSelector(state => state.cherry.error);

    const [values, setValues] = useState({
        deliveryId: '',
        batchNumber: '',
        quantity: '0',
        unitOfMeasure: 'kg',
        farmPlace: '',
        coffeegrower: '',
        collectionDate: '',
        sellingPrice: '',
        warehouseId: '',
        currency: '',
        latitude: '',
        longitude: '',
        status: ''
    });

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
        console.log(values.coffeegrower)
    };

    const HandleSubmit = async () => {
        if (id !== undefined) {
            await dispatch(UpdateCherryDelivery(values))
            await dispatch(GetAllCherryDelivery())
        }
        else {
            await dispatch(AddNewCherryDelivery(values))
            await dispatch(GetAllCherryDelivery())
        }
        if (!error) {
            setValues({
                deliveryId: '',
                batchNumber: '',
                quantity: '0',
                unitOfMeasure: 'kg',
                farmPlace: '',
                coffeegrower: '',
                collectionDate: '',
                sellingPrice: '',
                warehouseId: '',
                currency: '',
                latitude: '',
                longitude: '',
                status: ''
            });
            openNotification("Delivey Added Successfully");
            Router
                .push('/coffee-cherry-delivery')
                .catch(console.error);
        }
        else {
            openNotification(error);
        }
    };
    const openNotification = (message: string) => {
        notification.open({
            message: 'Success',
            description: message,
            placement: 'bottomRight'
        });
    };
    useEffect(() => {
        dispatch(GetAllGrowers());
        dispatch(fetchAllWarehouses());

        if (id !== undefined) {
            const deliveryToBeEdited = deliveries.find(d => d.Record.deliveryId === id);

            setValues({
                deliveryId: deliveryToBeEdited?.Record.deliveryId || '',
                batchNumber: deliveryToBeEdited?.Record.batchNumber || '',
                quantity: deliveryToBeEdited?.Record.quantity || '',
                unitOfMeasure: deliveryToBeEdited?.Record.unitOfMeasure || '',
                farmPlace: deliveryToBeEdited?.Record.farmPlace || '',
                coffeegrower: deliveryToBeEdited?.Record.coffeegrower || '',
                collectionDate: deliveryToBeEdited?.Record.collectionDate || '',
                sellingPrice: deliveryToBeEdited?.Record.sellingPrice || '',
                currency: deliveryToBeEdited?.Record.currency || '',
                warehouseId: deliveryToBeEdited?.Record.currency || '',
                latitude: deliveryToBeEdited?.Record.latitude || '',
                longitude: deliveryToBeEdited?.Record.longitude || '',
                status: deliveryToBeEdited?.Record.status || '',
            });
        }
    }, [growers.length, dispatch])

    return (
        <PerfectScrollbar>
            <form
                autoComplete="on"
                noValidate
            >
                <Card>
                    <CardHeader
                        subheader="All fields are required(*). please fill all of them out"
                        title={id === undefined ? "Add New Coffee Cherry Delivery" : "Edit Coffee Cherry Delivery"}
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            {id === undefined ?
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    sm={6}
                                >
                                    <TextField
                                        fullWidth
                                        helperText="Please specify the batch number"
                                        label="Batch Number"
                                        name="batchNumber"
                                        onChange={handleChange}
                                        required
                                        value={values.batchNumber}

                                    />
                                </Grid>
                                : null
                            }
                            <Grid
                                item
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Quanity"
                                    name="quantity"
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    value={values.quantity}

                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Unit of Measure"
                                    name="unitOfMeasure"
                                    onChange={handleChange}
                                    required
                                    value={values.unitOfMeasure}

                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Farm Place"
                                    name="farmPlace"
                                    required
                                    onChange={handleChange}
                                    value={values.farmPlace}

                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText={growers.length === 0 ? "Coffee Growers needs to be registered." : null}
                                    label="Coffee Grower"
                                    name="coffeegrower"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.coffeegrower}

                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    {growers.map((grower) => (
                                        <option
                                            key={grower.Key}
                                            value={grower.Record.id}
                                        >
                                            {grower.Record.fullName}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Collection Date"
                                    name="collectionDate"
                                    type="date"
                                    required
                                    onChange={handleChange}
                                    value={values.collectionDate}

                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Selling Price"
                                    name="sellingPrice"
                                    type="number"
                                    required
                                    onChange={handleChange}
                                    value={values.sellingPrice}

                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText={warehouses.length === 0 ? "Warehouse needs to be registered." : null}
                                    label="Warehouse"
                                    name="warehouseId"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.warehouseId}

                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    {warehouses.map((warehouse) => (
                                        <option
                                            key={warehouse.Key}
                                            value={warehouse.Record.id}
                                        >
                                            {warehouse.Record.name}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Currency"
                                    name="currency"
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    onChange={handleChange}
                                    value={values.currency}

                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    <option
                                        key="etb"
                                        value="Birr (ETB)"
                                    >
                                        Birr (ETB)
                                    </option>
                                    <option
                                        key="dollar"
                                        value="Dollar ($)"
                                    >
                                        Dollar ($)
                                    </option>
                                    <option
                                        key="euro"
                                        value="Euro (€)"
                                    >
                                        Euro (€)
                                    </option>
                                </TextField>
                            </Grid>

                            <Grid
                                item
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Latitude"
                                    name="latitude"
                                    required
                                    onChange={handleChange}
                                    value={values.latitude}

                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Longitude"
                                    name="longitude"
                                    required
                                    onChange={handleChange}
                                    value={values.longitude}

                                />
                            </Grid>
                            {id === undefined ? null :
                                <Grid
                                    item
                                    md={6}
                                    sm={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Status"
                                        name="status"
                                        required
                                        onChange={handleChange}
                                        SelectProps={{ native: true }}
                                        select
                                        value={values.status}

                                    >
                                        <option
                                            key='collected'
                                            value='Collected'
                                        >
                                            Collected
                                        </option>
                                        <option
                                            key='processed'
                                            value='Processed'
                                        >
                                            Processed
                                        </option>
                                    </TextField>
                                </Grid>
                            }
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        {adding || loading ? <CircularProgress /> :
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={HandleSubmit}
                                disabled={adding
                                    || values.batchNumber === ''
                                    || values.quantity === ''
                                    || values.unitOfMeasure === ''
                                    || values.farmPlace === ''
                                    || values.coffeegrower === ''
                                    || values.collectionDate === ''
                                    || values.sellingPrice === ''
                                    || values.currency === ''
                                    || values.latitude === ''
                                    || values.longitude === ''
                                }
                            >
                                {id === undefined ? "Add Delivery" : "Update Delivery"}
                            </Button>
                        }
                    </Box>
                </Card>
            </form>
        </PerfectScrollbar>
    );
};

export default AddDeliveryDetails;

