import {
    GetAllTransportationCertificate,
    RequestTransportationCertificate
} from "@/api/transportation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField
} from "@mui/material";
import { Modal, Space } from "antd";
import { useState } from "react";


function RequestCertificateRequest() {

    const dispatch = useAppDispatch();
    const adding = useAppSelector(state => state.transportation.adding);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        givenFor: '',
        address: '',
        nationality: '',
        tinNumber: '',
        loadingTransportLicence: '',
        loadingTrucks: ''
    })

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async () => {
        await dispatch(RequestTransportationCertificate(values));
        dispatch(GetAllTransportationCertificate());
        setValues({
            givenFor: '',
            address: '',
            nationality: '',
            tinNumber: '',
            loadingTransportLicence: '',
            loadingTrucks: ''
        })
        setOpen(false);
    }
    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                variant="contained"
                color="primary"
            >
                Request Certificate
            </Button>

            <Modal
                title="Request"
                style={{ top: 70, left: 130 }}
                open={open}
                onCancel={() => setOpen(false)}
                width={800}
                footer={[]}
            >
                <form
                    autoComplete="on"
                >
                    <Grid
                        container
                        columnSpacing={3}
                        p={2}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='medium'
                                margin="normal"
                                label="Given For"
                                name="givenFor"
                                required
                                value={values.givenFor}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='medium'
                                margin="normal"
                                label="Address"
                                name="address"
                                required
                                value={values.address}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='medium'
                                margin="normal"
                                label="Nationality"
                                name="nationality"
                                required
                                value={values.nationality}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='medium'
                                margin="normal"
                                label="Tin Number"
                                name="tinNumber"
                                required
                                value={values.tinNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='medium'
                                margin="normal"
                                label="Loading Transport Licence"
                                name="loadingTransportLicence"
                                required
                                value={values.loadingTransportLicence}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='medium'
                                margin="normal"
                                label="Loading Trucks"
                                name="loadingTrucks"
                                required
                                value={values.loadingTrucks}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            paddingY: 3
                        }}
                    >
                        <Space>
                            <Button color='error' disabled={adding} onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            {adding ?
                                <CircularProgress
                                    size={15}
                                />
                                :
                                <Button
                                    color="primary"
                                    disabled={
                                        adding ||
                                        values.givenFor === "" ||
                                        values.address === "" ||
                                        values.nationality === "" ||
                                        values.tinNumber === "" ||
                                        values.loadingTransportLicence === "" ||
                                        values.loadingTrucks === ""
                                    }
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            }
                        </Space>

                    </Box>
                </form >
            </Modal >
        </div >
    );
}

export default RequestCertificateRequest;