import { Modal, Space } from 'antd';
import React, { useState } from 'react';
import { AddGrower, GetAllGrowers } from '../../api/grower';
import { useAppSelector, useAppDispatch } from '../../app/store';
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField
} from '@mui/material';

function RegisterNewCoffeeGrower() {
    const dispatch = useAppDispatch();
    const adding = useAppSelector(state => state.grower.adding);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        fullName: '',
        nationalityId: '',
        latitude: '',
        longitude: '',
        gender: '',
        farmPlace: '',
        farmSize: '',
        maritalStatus: '',
        dateOfBirth: ''
    });

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const HandleSubmit = async () => {
        await dispatch(AddGrower(values));
        setOpen(false);
        await dispatch(GetAllGrowers());
        setValues({
            fullName: '',
            nationalityId: '',
            latitude: '',
            longitude: '',
            gender: '',
            farmPlace: '',
            farmSize: '',
            maritalStatus: '',
            dateOfBirth: ''
        })
    }

    const onCancel = () => {
        setOpen(false);
    }

    return (
        <div>
            <Button
                color="primary"
                variant="contained"
                onClick={() => setOpen(true)}
                size="small"
            >
                Add Coffee Grower
            </Button>
            <Modal
                title="ADD COFFEE GROWER"
                style={{ top: 70, left: 130 }}
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={800}
                footer={[]}
            >
                <form
                    autoComplete='on'
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
                                label="Name"
                                name="fullName"
                                required
                                value={values.fullName}
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
                                label="Nationality Id"
                                name="nationalityId"
                                required
                                value={values.nationalityId}
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
                                label="Latitude"
                                name="latitude"
                                required
                                value={values.latitude}
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
                                label="Longitude"
                                name="longitude"
                                required
                                value={values.longitude}
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
                                label="Gender"
                                name="gender"
                                required
                                select
                                value={values.gender}
                                onChange={handleChange}
                                SelectProps={{ native: true }}

                            >
                                <option
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
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size='medium'
                                type="date"
                                margin="normal"
                                label="Date of Birth"
                                name="dateOfBirth"
                                required
                                value={values.dateOfBirth}
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
                                label="Farm Place"
                                name="farmPlace"
                                required
                                value={values.farmPlace}
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
                                label="Farm Size"
                                name="farmSize"
                                required
                                value={values.farmSize}
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
                                label="Marital Status"
                                name="maritalStatus"
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.maritalStatus}
                                onChange={handleChange}
                            >
                                <option
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
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            paddingY: 1
                        }}
                    >
                        <Space>
                            <Button
                                color='error'
                                disabled={adding}
                                onClick={onCancel}>
                                Cancel
                            </Button>
                            {adding ?
                                <CircularProgress
                                    size={30}
                                /> :
                                <Button
                                    color="primary"
                                    disabled={
                                        adding ||
                                        values.fullName === "" ||
                                        values.nationalityId === "" ||
                                        values.gender === "" ||
                                        values.latitude === "" ||
                                        values.longitude === "" ||
                                        values.dateOfBirth === "" ||
                                        values.farmPlace === "" ||
                                        values.farmSize === "" ||
                                        values.maritalStatus === ""
                                    }
                                    onClick={HandleSubmit}>
                                    Submit
                                </Button>
                            }
                        </Space>
                    </Box>
                </form>
            </Modal>
        </div>
    );
}

export default RegisterNewCoffeeGrower;