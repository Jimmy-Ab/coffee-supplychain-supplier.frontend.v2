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
import { TransportationResult } from "@/features/transportation/transportationSlice";
import { DashboardLayout } from "@/components/dashboard-layout";
import Router from 'next/router';
import {
    DeleteCertificateRequest,
    GetAllTransportationCertificate,
    GrantCertificateRequest,
    RevokeCertificateRequest
} from "@/api/transportation";

function CertificateDetail() {

    const certificates = useAppSelector(state => state.transportation.tranportation.response);
    const [selectedCertificate, setSelectedCertificate] = useState<TransportationResult>();
    const router = useRouter()
    const { id } = router.query

    const [values, setValues] = useState({
        address: '',
        endDate: '',
        givenBy: '',
        givenDate: '',
        givenFor: '',
        id: '',
        loadingTransportLicence: '',
        loadingTrucks: '',
        nationality: '',
        startDate: '',
        status: '',
        tinNumber: '',
        txId: ''
    })

    const openNotification = (message: string) => {
        notification.open({
            message: 'Success',
            description: message,
            placement: 'bottomRight'
        });
    };

    useEffect(() => {
        setSelectedCertificate(certificates.find(g => g.Record.id === id));

        setValues({
            address: selectedCertificate?.Record.address || '',
            endDate: selectedCertificate?.Record.endDate || '',
            givenBy: selectedCertificate?.Record.givenBy || '',
            givenDate: selectedCertificate?.Record.givenDate || '',
            givenFor: selectedCertificate?.Record.givenFor || '',
            id: selectedCertificate?.Record.id || '',
            loadingTransportLicence: selectedCertificate?.Record.loadingTransportLicence || '',
            loadingTrucks: selectedCertificate?.Record.loadingTrucks || '',
            nationality: selectedCertificate?.Record.nationality || '',
            startDate: selectedCertificate?.Record.startDate || '',
            status: selectedCertificate?.Record.status || '',
            tinNumber: selectedCertificate?.Record.tinNumber || '',
            txId: selectedCertificate?.Record.txId || ''
        })
    }, [selectedCertificate])
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
                        title="Detail"
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
                                    label="Address"
                                    name="address"
                                    value={values.address}
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
                                    label="Given By"
                                    name="givenBy"
                                    value={values.givenBy}
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
                                    label="Given Date"
                                    name="givenDate"
                                    value={values.givenDate}
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
                                    label="Given For"
                                    name="givenFor"
                                    value={values.givenFor}
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
                                    label="Loading Transport Licence"
                                    name="loadingTransportLicence"
                                    value={values.loadingTransportLicence}
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
                                    label="Loading Trucks"
                                    name="loadingTrucks"
                                    value={values.loadingTrucks}
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
                                    label="Nationality"
                                    name="nationality"
                                    value={values.nationality}
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
                                    label="Status"
                                    name="status"
                                    value={values.status}
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
                                    label="Tin Number"
                                    name="tinNumber"
                                    value={values.tinNumber}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </form>
            </Card >
        </>
    );
}


export default CertificateDetail;