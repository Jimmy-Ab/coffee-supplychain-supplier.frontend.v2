import { AddSupplyCoffeeShipment, GetAllSupplyCoffeeShipment, GetAllProducedCoffee } from "@/api/supply";
import {
    GetAllTransportationCertificate,
    RequestTransportationCertificate
} from "@/api/transportation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { ProducedCoffeeResult } from "@/features/supply/supplySlice";
import { TransportationResult, Transportation } from "@/features/transportation/transportationSlice";
import { WarningAmberOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid,
    TextField
} from "@mui/material";
import { Modal, Space } from "antd";
import { useEffect, useState } from "react";

interface Props {
    filteredTranportations: TransportationResult[],
    filteredCoffeeSupply: ProducedCoffeeResult[]
}

function AddSupplyShipment () {

        const dispatch = useAppDispatch();
        const adding = useAppSelector(state => state.supply.adding);
        const supplyCoffee = useAppSelector(state => state.supply.producedCoffee.result);
        const transportations = useAppSelector(state => state.transportation.tranportation.response);

        const [filteredCoffeeSupplys, setFilteredCoffeeSupplys] = useState<ProducedCoffeeResult[]>([]);
        const [filteredTranstorters, setFilteredTranstorters] = useState<TransportationResult[]>([]);

        const [open, setOpen] = useState(false);
        const [values, setValues] = useState({
            owner: '',
            destination: '',
            batchNo: '',
            transporter: '',
            truck: '',
        })

        const handleChange = (event: any) => {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            })
        }

        const handleSubmit = async () => {
            await dispatch(AddSupplyCoffeeShipment(values));
            dispatch(GetAllSupplyCoffeeShipment());
            setValues({
                owner: '',
                destination: '',
                batchNo: '',
                transporter: '',
                truck: '',
            })
            setOpen(false);
        }

        const FilterDatas = () => {
            const filteredSupply = supplyCoffee.filter((value, index, self) =>
                self.findIndex(v => v.Record.batchNumber === value.Record.batchNumber) === index
            );

            setFilteredCoffeeSupplys(filteredSupply);
            setFilteredTranstorters(transportations);
        }

        useEffect(() => {

            const fetchData = async () => {
                await dispatch(GetAllProducedCoffee());
                await dispatch(GetAllTransportationCertificate());
            }

            fetchData();
            FilterDatas();
        }, [supplyCoffee.length, transportations.length])
        return (
            <div>
                <Button
                    onClick={() => setOpen(true)}
                    variant="contained"
                    color="primary"
                >
                    Add Supply Shipment
                </Button>

                <Modal
                    title="New Supply Shipment"
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
                                    label="Owner"
                                    name="owner"
                                    required
                                    value={values.owner}
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
                                    label="Destination"
                                    name="destination"
                                    required
                                    value={values.destination}
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
                                    helperText={filteredCoffeeSupplys.length === 0 ?
                                        "All existing produced coffees are already transported! please produce a new coffee supply and come back again!"
                                        : null
                                    }
                                    size='medium'
                                    margin="normal"
                                    label="Batch Number"
                                    name="batchNo"
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.batchNo}
                                    onChange={handleChange}
                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    {filteredCoffeeSupplys.filter(cs => cs.Record.isShipped === false).map((supply) => (
                                        <option
                                            key={supply.Key}
                                            value={supply.Record.batchNumber}
                                        >
                                            {supply.Record.batchNumber}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText={filteredTranstorters.filter(t => t.Record.status === "CERTIFIED").length === 0 ?
                                        "There is no CERTIFIED transporter. please register and certify or certify an existing transporter!"
                                        : null
                                    }
                                    size='medium'
                                    margin="normal"
                                    label="Transporter"
                                    name="transporter"
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.transporter}
                                    onChange={handleChange}
                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    {filteredTranstorters.filter(t => t.Record.status === "CERTIFIED").map((tran) => (
                                        <option
                                            key={tran.Key}
                                            value={tran.Record.id}
                                        >
                                            {tran.Record.givenFor}
                                        </option>
                                    ))}
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
                                    margin="normal"
                                    label="Truck"
                                    name="truck"
                                    required
                                    value={values.truck}
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
                                            values.owner === "" ||
                                            values.destination === "" ||
                                            values.batchNo === "" ||
                                            values.transporter === "" ||
                                            values.truck === ""
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

export default AddSupplyShipment;