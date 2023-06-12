import { useAppDispatch, useAppSelector } from "@/app/store";
import { Deliveries, GrowerResult } from "@/features/grower/growerSlice";
import { LocationOn } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, Grid, TextField } from "@mui/material";
import { ColumnsType } from "antd/es/table";
import { Table, notification } from "antd"
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { GetAllGrowers, UpdateGrower } from "@/api/grower";
import Router from 'next/router';
import { GrowerDeliveries } from "./grower-deliveries";

function GrowerDetail() {
    const dispatch = useAppDispatch();
    const growers = useAppSelector(state => state.grower.growers.result);
    const loading = useAppSelector(state => state.grower.loading);
    const adding = useAppSelector(state => state.grower.adding);
    const error = useAppSelector(state => state.grower.error);
    const [selectedGrower, setSelectedGrower] = useState<GrowerResult>();
    const router = useRouter()
    const { id } = router.query
    const [values, setValues] = useState({
        id: '',
        nationalityId: '',
        fullName: '',
        gender: '',
        farmPlace: '',
        farmSize: '',
        maritalStatus: '',
        dateOfBirth: '',
        latitude: '',
        longitude: '',
        registeredAt: ''
    })

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    const HandleSubmit = async () => {
        await dispatch(UpdateGrower(values))
        if (!error) {
            await dispatch(GetAllGrowers())
            openNotification("Grower Updated Successfully");
            Router
                .push('/coffee-growers')
                .catch(console.error);
        }
        else {
            openNotification(error);
        }
    }

    const openNotification = (message: string) => {
        notification.open({
            message: 'Success',
            description: message,
            placement: 'bottomRight'
        });
    };
    useEffect(() => {
        setSelectedGrower(growers.find(g => g.Record.id === id));
        setValues({
            id: selectedGrower?.Record.id || '',
            nationalityId: selectedGrower?.Record.nationalityId || '',
            fullName: selectedGrower?.Record.fullName || '',
            gender: selectedGrower?.Record.gender || '',
            farmPlace: selectedGrower?.Record.farmPlace || '',
            farmSize: selectedGrower?.Record.farmSize || '',
            maritalStatus: selectedGrower?.Record.maritalStatus || '',
            dateOfBirth: selectedGrower?.Record.dateOfBirth || '',
            latitude: selectedGrower?.Record.latitude || '',
            longitude: selectedGrower?.Record.longitude || '',
            registeredAt: selectedGrower?.Record.registeredAt || ''
        });
    }, [selectedGrower])
    return (
        <>
            <Card
                sx={{
                    p: 2
                }}
            >
                <form
                    autoComplete="on"
                    noValidate
                >
                    <CardHeader
                        subheader="The information can be edited"
                        title="Profile"
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
                                    label="Full Name"
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={handleChange}
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
                                    label="Farm Place"
                                    name="farmPlace"
                                    value={values.farmPlace}
                                    onChange={handleChange}
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
                                    label="Farm Size"
                                    name="farmSize"
                                    value={values.farmSize}
                                    onChange={handleChange}
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
                                    label="Nationality Id"
                                    name="nationalityId"
                                    value={values.nationalityId}
                                    onChange={handleChange}
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
                                    label="Registration Date"
                                    name="registeredAt"
                                    disabled
                                    value={values.registeredAt}
                                    onChange={handleChange}
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
                                    label="Gender"
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    SelectProps={{ native: true }}
                                    select
                                >
                                    <option
                                        key=""
                                        value=""
                                    >
                                    </option>
                                    <option
                                        key="male"
                                        value="Male"
                                    >
                                        Male
                                    </option>
                                    <option
                                        key="female"
                                        value="Female"
                                    >
                                        Female
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    type="date"
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    value={values.dateOfBirth}
                                    onChange={handleChange}
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
                                    label="Marital status"
                                    name="maritalStatus"
                                    value={values.maritalStatus}
                                    onChange={handleChange}
                                    SelectProps={{ native: true }}
                                    select
                                >
                                    <option
                                        key=""
                                        value=""
                                    >
                                    </option>
                                    <option
                                        key="married"
                                        value="Married"
                                    >
                                        Married
                                    </option>
                                    <option
                                        key="unMarried"
                                        value="Unmarried"
                                    >
                                        Unmarried
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Grower Id"
                                    name="id"
                                    disabled
                                    value={values.id}
                                    onChange={handleChange}
                                >
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Longitude"
                                    name="longitude"
                                    value={values.longitude}
                                    onChange={handleChange}
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
                                    label="Latitude"
                                    name="latitude"
                                    value={values.latitude}
                                    onChange={handleChange}
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
                        {adding ?
                            <CircularProgress />
                            :
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={HandleSubmit}
                                disabled={loading}
                            >
                                Save details
                            </Button>
                        }
                    </Box>
                    {/* </Card> */}
                </form>
                <Card sx={{
                    p: 2,
                    mt: 2
                }}>
                    <CardHeader
                        title="Deliveries"
                    />
                    <GrowerDeliveries 
                        deliveries={selectedGrower?.Record.deliveries || []}
                    />
                </Card>
            </Card >
        </>
    );
}
export default GrowerDetail;