import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { notification } from 'antd';
import Router from 'next/router';
import { FetchAllWashedCoffee, RegisterWashedCoffee } from '../../api/supply';

const AddWashedCoffeeDetails = () => {
    const dispatch = useAppDispatch();
    const adding = useAppSelector(state => state.supply.adding);
    const loading = useAppSelector(state => state.supply.loading);
    const error = useAppSelector(state => state.supply.error);

    const [values, setValues] = useState({
        name: '',
        owner: '',
        address: '',
        size: '',
        distanceFromRiver: '',
        hasSortingTable: '',
        hasFermentationPlace: '',
        hasWashingCanal: '',
        hasSkinDring: '',
        warehouseSize: '',
        hasWeightingScale: '',
        hasMoistureCalibrator: '',
        latitude: '',
        longitude: '',
    });

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const HandleSubmit = async () => {
        await dispatch(RegisterWashedCoffee(values))
        await dispatch(FetchAllWashedCoffee())
            setValues({
                name: '',
                owner: '',
                address: '',
                size: '',
                distanceFromRiver: '',
                hasSortingTable: '',
                hasFermentationPlace: '',
                hasWashingCanal: '',
                hasSkinDring: '',
                warehouseSize: '',
                hasWeightingScale: '',
                hasMoistureCalibrator: '',
                latitude: '',
                longitude: '',
            });
            openNotification("Washed Coffee Registered Successfully");
            Router
                .push('/supply-coffee')
                .catch(console.error);
        
    };
    const openNotification = (message: string) => {
        notification.open({
            message: 'Success',
            description: message,
            placement: 'bottomRight'
        });
    };
    useEffect(() => {
    }, [adding, error])

    return (
        <PerfectScrollbar>
            <form
                autoComplete="on"
                noValidate
            >
                <Card>
                    <CardHeader
                        subheader="All fields are required(*). please fill all of them out"
                        title="Register Washed Coffee Industry"
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                                sm={6}
                            >
                                <TextField
                                    fullWidth
                                    // helperText="Please specify the owner"
                                    label="Name"
                                    name="name"
                                    onChange={handleChange}
                                    required
                                    value={values.name}
                                  
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                sm={6}
                            >
                                <TextField
                                    fullWidth
                                    // helperText="Please specify the owner"
                                    label="Owner"
                                    name="owner"
                                    onChange={handleChange}
                                    required
                                    value={values.owner}
                                  
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
                                    label="Address"
                                    name="address"
                                    onChange={handleChange}
                                    required
                                    value={values.address}
                                  
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
                                    label="Size"
                                    name="size"
                                    onChange={handleChange}
                                    required
                                    value={values.size}
                                  
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
                                    label="Distance From River"
                                    name="distanceFromRiver"
                                    required
                                    onChange={handleChange}
                                    value={values.distanceFromRiver}
                                  
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
                                    label="Warehouse Size"
                                    name="warehouseSize"
                                    onChange={handleChange}
                                    required
                                    value={values.warehouseSize}
                                  
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
                            <Grid
                                item
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <Card>
                                    <CardHeader
                                        subheader="if the value is true turn on the field."
                                    // title="Register Washed Coffee"
                                    />
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            md={4}
                                            sm={4}
                                            xs={12}
                                        >
                                            <FormControlLabel
                                                labelPlacement="start"
                                                control={
                                                    <Switch
                                                        defaultChecked
                                                        onChange={(event) =>
                                                            setValues({
                                                                ...values, 'hasSortingTable': event.target.checked.toString()
                                                            })}
                                                    />
                                                }
                                                label={
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="body1"
                                                    >
                                                        Has Sorting Table
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={4}
                                            sm={4}
                                            xs={12}
                                        >
                                            <FormControlLabel
                                                labelPlacement="start"
                                                control={
                                                    <Switch
                                                        defaultChecked
                                                        onChange={(event) =>
                                                            setValues({
                                                                ...values, 'hasFermentationPlace': event.target.checked.toString()
                                                            })}
                                                    />
                                                }
                                                label={
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="body1"
                                                    >
                                                        Has Fermentation Place
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={4}
                                            sm={4}
                                            xs={12}
                                        >
                                            <FormControlLabel
                                                labelPlacement="start"
                                                control={
                                                    <Switch
                                                        defaultChecked
                                                        onChange={(event) =>
                                                            setValues({
                                                                ...values, 'hasWashingCanal': event.target.checked.toString()
                                                            })}
                                                    />}
                                                label={
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="body1"
                                                    >
                                                        Has Washing Canal
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={4}
                                            sm={4}
                                            xs={12}
                                        >
                                            <FormControlLabel
                                                labelPlacement="start"
                                                control={
                                                    <Switch
                                                        defaultChecked
                                                        onChange={(event) =>
                                                            setValues({
                                                                ...values, 'hasSkinDring': event.target.checked.toString()
                                                            })}
                                                    />}
                                                label={
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="body1"
                                                    >
                                                        Has Skin Drying
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={4}
                                            sm={4}
                                            xs={12}
                                        >
                                            <FormControlLabel
                                                labelPlacement="start"
                                                control={
                                                    <Switch
                                                        defaultChecked
                                                        onChange={(event) =>
                                                            setValues({
                                                                ...values, 'hasWeightingScale': event.target.checked.toString()
                                                            })}
                                                    />}
                                                label={
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="body1"
                                                    >
                                                        Has Weighting Scale
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={4}
                                            sm={4}
                                            xs={12}
                                        >
                                            <FormControlLabel
                                                labelPlacement="start"
                                                control={
                                                    <Switch
                                                        defaultChecked
                                                        onChange={(event) =>
                                                            setValues({
                                                                ...values, 'hasMoistureCalibrator': event.target.checked.toString()
                                                            })}
                                                    />
                                                }
                                                label={
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="body1"
                                                    >
                                                        Has Moisture Calibrator
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    </Grid>

                                </Card>
                            </Grid>

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
                                    || values.owner === ''
                                    || values.address === ''
                                    || values.size === ''
                                    || values.distanceFromRiver === ''
                                    || values.warehouseSize === ''
                                    || values.latitude === ''
                                    || values.longitude === ''
                                }
                            >
                                Register
                            </Button>
                        }
                    </Box>
                </Card>
            </form>
        </PerfectScrollbar>
    );
};

export default AddWashedCoffeeDetails;

