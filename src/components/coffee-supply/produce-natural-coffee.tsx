import { GetAllCherryDelivery } from "@/api/cherry";
import { ProduceNaturalCoffee } from "@/api/supply";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { CherryResult } from "@/features/cherry/cherrySlice";
import { NaturalCoffeeResult } from "@/features/supply/supplySlice";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { Upload as UploadIcon } from '../../icons/upload';

function ProduceNaturalCoffees() {
    const dispatch = useAppDispatch();
    const adding = useAppSelector(state => state.supply.adding);
    const loading = useAppSelector(state => state.supply.loading);
    const error = useAppSelector(state => state.supply.error);
    const cherrys = useAppSelector(state => state.cherry.cherrys.result);
    const allNaturalCoffees = useAppSelector(state => state.supply.naturalCoffee.result);
    const [filteredCherrys, setFilteredCherrys] = useState<CherryResult[]>();
    const [filteredOwners, setFilteredOwners] = useState<NaturalCoffeeResult[]>();
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        quantity: '',
        bagSize: '',
        owner: 'OrgsupplierMSP',
        coffeeCherryBatchNo: '',
        measurmentUnit: '',
        naturalCoffeeProductionPlace: ''
    });

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const HandleSubmit = async () => {
        await dispatch(ProduceNaturalCoffee(values));
        setValues({
            quantity: '',
            bagSize: '',
            owner: 'OrgsupplierMSP',
            coffeeCherryBatchNo: '',
            measurmentUnit: '',
            naturalCoffeeProductionPlace: ''
        })
        setOpen(false);
    }

    const FilterDatas = () => {
        const filteredCherry = cherrys.filter((value, index, self) =>
            self.findIndex(v => v.Record.batchNumber === value.Record.batchNumber) === index
        );
        setFilteredCherrys(filteredCherry);
        const filteredOwner = allNaturalCoffees.filter((value, index, self) =>
            self.findIndex(v => v.Record.address === value.Record.address) === index
        );
        setFilteredOwners(filteredOwner);
    }

    useEffect(() => {

        const fetchData = async () => {
            await dispatch(GetAllCherryDelivery());
        }

        fetchData();
        FilterDatas();

    }, [allNaturalCoffees.length, cherrys.length])
    return (
        <>
            <div>
                <Button
                    disabled={loading}
                    startIcon={(
                        <UploadIcon
                            fontSize="small"
                        />
                    )}
                    onClick={() => setOpen(true)}
                    sx={{ mr: 1 }}
                >
                    Produce
                </Button>
                <Modal
                    title="Produce Natural Coffee"
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
                                    label="Quantity"
                                    name="quantity"
                                    required
                                    value={values.quantity}
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
                                    label="Bag Size"
                                    name="bagSize"
                                    required
                                    value={values.bagSize}
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
                                    label="Coffee Cherry Batch No"
                                    name="coffeeCherryBatchNo"
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.coffeeCherryBatchNo}
                                    onChange={handleChange}
                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    {filteredCherrys?.map((cherry) => (
                                        <option
                                            key={cherry.Key}
                                            value={cherry.Record.batchNumber}
                                        >
                                            {cherry.Record.batchNumber}
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
                                    label="Measurement Unit"
                                    name="measurmentUnit"
                                    required
                                    value={values.measurmentUnit}
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
                                    label="Production Place"
                                    name="naturalCoffeeProductionPlace"
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.naturalCoffeeProductionPlace}
                                    onChange={handleChange}
                                >
                                    <option
                                        value=""
                                    >
                                    </option>
                                    {filteredOwners?.map((owner) => (
                                        <option
                                            key={owner.Key}
                                            value={owner.Record.id}
                                        >
                                             {owner.Record.name} - {owner.Record.address}
                                        </option>
                                    ))}
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
                                <Button color='error' size="small" disabled={adding} onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                {adding ?
                                    <CircularProgress size={15} />
                                    :
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        disabled={
                                            adding ||
                                            values.quantity === "" ||
                                            values.bagSize === "" ||
                                            values.coffeeCherryBatchNo === "" ||
                                            values.measurmentUnit === "" ||
                                            values.naturalCoffeeProductionPlace === ""
                                        }
                                        onClick={HandleSubmit}
                                    >
                                        Produce
                                    </Button>
                                }
                            </Space>

                        </Box>
                    </form>
                </Modal>
            </div>
        </>
    );
}

export default ProduceNaturalCoffees;