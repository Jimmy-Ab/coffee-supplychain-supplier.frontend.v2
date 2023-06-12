import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { Modal, Form, Input, Space } from 'antd';
import { RequiredMark } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { AddWarehouse, UpdateWarehouse, fetchAllWarehouses } from '../../api/warehouse';
import { useAppSelector } from '../../app/store';
import { WarehouseResult } from '../../features/warehouse/warehouseSlice';

interface Props {
    setWarehouseToBeEdited: any
    warehouseToBeEdited: any
    setOpen: any
    open: boolean
    setEdit: any
    edit: boolean
    dispatch: any
}

const AddNewWarehouse: React.FC<Props> = ({ setWarehouseToBeEdited, warehouseToBeEdited, setOpen, open, setEdit, edit, dispatch }) => {
    const adding = useAppSelector(state => state.warehouse.adding);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [owner, setOwner] = useState("");
    const [size, setSize] = useState("");
    const [warehouseNo, setWarehouseNo] = useState("");

    const HandleSubmit = async () => {
        const warehouse: WarehouseResult["Record"] = {
            id: warehouseToBeEdited?.Record.id,
            name: name,
            capacity: capacity,
            latitude: latitude,
            longitude: longitude,
            address: address,
            txId: "",
            size: size,
            warehouseNo: warehouseNo,
            owner: owner
        }
        if (edit) {
            await dispatch(UpdateWarehouse(warehouse));

        }
        else {
            await dispatch(AddWarehouse(warehouse));
        }
        dispatch(fetchAllWarehouses())
        setOpen(false);
        setEdit(false);
        setWarehouseToBeEdited(null);
        ResetFields();
    }

    const onCancel = () => {
        setOpen(false);
        setEdit(false);
        ResetFields();
        setWarehouseToBeEdited(null);
    }
    const ResetFields = () => {
        setAddress("");
        setName("");
        setCapacity("");
        setLatitude("");
        setLongitude("");
        setOwner("");
        setSize("");
        setWarehouseNo("");
    }

    useEffect(() => {
        if (edit) {
            setAddress(warehouseToBeEdited.Record.address);
            setName(warehouseToBeEdited.Record.name);
            setCapacity(warehouseToBeEdited.Record.capacity);
            setLatitude(warehouseToBeEdited.Record.latitude);
            setLongitude(warehouseToBeEdited.Record.longitude);
            setOwner(warehouseToBeEdited.Record.owner);
            setSize(warehouseToBeEdited.Record.size);
            setWarehouseNo(warehouseToBeEdited.Record.warehouseNo);
        }
    }, [warehouseToBeEdited, edit])
    return (
        <div>
            <Button
                color="primary"
                variant="contained"
                onClick={() => setOpen(true)}
                size="small"
            >
                Add Warehouse
            </Button>

            <Modal
                title={edit ? "EDIT WAREHOUSE" : "ADD NEW WAREHOUSE"}
                style={{ top: 70, left: 130 }}
                open={open}
                onOk={() => setOpen(false)}
                onCancel={onCancel}
                width={800}
                footer={[


                ]}
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
                                label="Addess"
                                name="address"
                                required

                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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
                                label="Capacity"
                                name="capacity"
                                required

                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
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

                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
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

                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
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
                                label="Name"
                                name="name"
                                required

                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                label="Owner"
                                name="owner"
                                required

                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
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
                                label="Size"
                                name="size"
                                required

                                value={size}
                                onChange={(e) => setSize(e.target.value)}
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
                                label="Warehouse No"
                                name="warehouseNo"
                                required

                                value={warehouseNo}
                                onChange={(e) => setWarehouseNo(e.target.value)}
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
                            <Button color='error' disabled={adding} onClick={onCancel}>
                                Cancel
                            </Button>
                            {adding ? <CircularProgress size={15} /> :
                                <Button
                                    color="primary"
                                    disabled={
                                        adding ||
                                        capacity === "" ||
                                        address === "" ||
                                        name === "" ||
                                        latitude === ""
                                        || longitude === ""
                                        || size === "" ||
                                        owner === "" ||
                                        warehouseNo === ""
                                    }
                                    onClick={HandleSubmit}>
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

export default AddNewWarehouse;