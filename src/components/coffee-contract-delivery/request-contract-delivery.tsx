import { GetAllContractDelivery, RequestNewContractDelivery } from "@/api/contract-delivery";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { DeliveryContractResult } from "@/features/delivery-contract/deliveryContractSlice";
import { SupplyShipmentResult } from "@/features/supply/supplySlice";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField
} from "@mui/material";
import { Modal, Space } from "antd";
import { useState } from "react";

interface Props {
    deliveryContracts: DeliveryContractResult[],
    supplyShipments: SupplyShipmentResult[]
}

export const RequestContractDelivery:
    React.FC<Props> = ({
        deliveryContracts,
        supplyShipments
    }) => {


        const dispatch = useAppDispatch();
        const adding = useAppSelector(state => state.contractDelivery.adding);
        const [open, setOpen] = useState(false);
        const [values, setValues] = useState({
            contractId: '',
            quantity: '',
            deliveryCountry: '',
            deliveryCity: '',
            deliveryLongtitude: '',
            deliveryLatitude: '',
            coffeePrice: '',
            coffeeType: '',
            deliveryDate: '',
            shipmentId: ''
        })

        const handleChange = (event: any) => {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            })
        }

        const handleSubmit = async () => {
            await dispatch(RequestNewContractDelivery(values));
            dispatch(GetAllContractDelivery());
            setValues({
                contractId: '',
                quantity: '',
                deliveryCountry: '',
                deliveryCity: '',
                deliveryLongtitude: '',
                deliveryLatitude: '',
                coffeePrice: '',
                coffeeType: '',
                deliveryDate: '',
                shipmentId: ''
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
                    Request Delivery
                </Button>

                <Modal
                    title="Request a new delivery"
                    style={{ top: 70, left: 130 }}
                    open={open}
                    onCancel={() => setOpen(false)}
                    width={1000}
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
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText={deliveryContracts.length === 0 ?
                                        "Contract must be approved to request a delivery. please make sure the contract is APPROVED!"
                                        : null
                                    }
                                    size='medium'
                                    margin="normal"
                                    label="Contracter"
                                    name="contractId"
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.contractId}
                                    onChange={handleChange}
                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    {deliveryContracts.map((contract) => (
                                        <option
                                            key={contract.Key}
                                            value={contract.Record.id}
                                        >
                                            {contract.Record.buyer}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Quantity"
                                    name="quantity"
                                    required
                                    value={values.quantity}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    size='medium'
                                    fullWidth
                                    margin="normal"
                                    label="Delivery Country"
                                    name="deliveryCountry"
                                    required
                                    value={values.deliveryCountry}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Delivery City"
                                    name="deliveryCity"
                                    value={values.deliveryCity}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Delivery Longtitude"
                                    name="deliveryLongtitude"
                                    required
                                    value={values.deliveryLongtitude}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Delivery Latitude"
                                    name="deliveryLatitude"
                                    required
                                    value={values.deliveryLatitude}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Coffee Price"
                                    name="coffeePrice"
                                    required
                                    value={values.coffeePrice}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Coffee Type"
                                    name="coffeeType"
                                    required
                                    value={values.coffeeType}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Delivery Date"
                                    name="deliveryDate"
                                    type='date'
                                    required
                                    value={values.deliveryDate}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText={supplyShipments.length === 0 ?
                                        "Shipment must be DELIVERED. please make sure the supply shipment is DELIVERED to request a delivery!"
                                        : null
                                    }
                                    size='medium'
                                    margin="normal"
                                    label="shipment Id"
                                    name="shipmentId"
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.shipmentId}
                                    onChange={handleChange}
                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    {supplyShipments.map((supply) => (
                                        <option
                                            key={supply.Key}
                                            value={supply.Record.id}
                                        >
                                            {supply.Record.coffeeType} - {supply.Record.owner} - {supply.Record.destination}
                                        </option>
                                    ))}
                                </TextField>
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
                                            values.contractId === "" ||
                                            values.quantity === "" ||
                                            values.deliveryCountry === "" ||
                                            values.deliveryCity === "" ||
                                            values.deliveryLongtitude === "" ||
                                            values.deliveryLatitude === "" ||
                                            values.coffeePrice === "" ||
                                            values.coffeeType === "" ||
                                            values.deliveryDate === "" ||
                                            values.shipmentId === ""
                                        }
                                        onClick={handleSubmit}
                                    >
                                        Request
                                    </Button>
                                }
                            </Space>

                        </Box>
                    </form >
                </Modal >
            </div >
        );
    }

