import { FetchAllWashedCoffee } from "../../api/supply";
import { WashedCoffeeResult } from "../../features/supply/supplySlice";
import { Box, Button, Card, Chip, Container, Divider, Grid, InputAdornment, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { Skeleton, Space } from "antd";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/store';
import NextLink from 'next/link';
import ProduceWashedCoffees from "./produce-washed-coffee";

export const WashedCoffeeInd = () => {
    const dispatch = useAppDispatch();
    let allWashedCoffees = useAppSelector(state => state.supply.washedCoffee.result);
    let loading = useAppSelector(state => state.supply.loading)
    const [filteredWashedCoffee, setFilteredWashedCoffee] = useState<WashedCoffeeResult[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const onSearch = (event: any) => {

        let wc = allWashedCoffees?.filter(washedCoffee =>
            washedCoffee.Record.address?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            washedCoffee.Record.distanceFromRiver?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            washedCoffee.Record.owner?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            washedCoffee.Record.size?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            washedCoffee.Record.warehouseSize?.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredWashedCoffee(wc);
    }

    const handleLimitChange = (event: any) => {
        setRowsPerPage(event.target.value);

    };
    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
        console.log(newPage);
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(FetchAllWashedCoffee());
        }
        fetchData();

        setFilteredWashedCoffee(allWashedCoffees);
    }, [allWashedCoffees.length, filteredWashedCoffee.length])
    return (
        <>
            <Head>
                <title>
                    Coffee supply | Adey supply-chain
                </title>
            </Head>
            <Card
                sx={{
                    p: 4
                }}>

                <Grid style={{ marginBottom: 10 }} container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item style={{ paddingLeft: 25 }} xs={12} md={6}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                m: -1
                            }}
                        >
                            <Box sx={{
                                m: 1, alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                            }}>
                                <NextLink href='supply-coffee/add-washed-coffee' passHref legacyBehavior>
                                    <Button
                                        variant="contained"
                                        sx={{ mr: 1 }}
                                    >
                                        Register Washed Coffee
                                    </Button>
                                </NextLink>
                                <ProduceWashedCoffees />
                                <Button
                                    startIcon={(<DownloadIcon fontSize="small" />)}
                                    sx={{ mr: 1 }}
                                >
                                    Export
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ maxWidth: 500 }}>
                            <TextField
                                fullWidth
                                onChange={onSearch}
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="end">
                                            <SvgIcon
                                                color="action"
                                                fontSize="small"
                                            >
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder="Search washed Coffee"
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{ m: 1 }}>
                            <Chip icon={<EmojiObjectsIcon />} label="Tip: Search by entering a keyword from the table" />
                        </Box>
                    </Grid>
                </Grid>
                {loading ?
                    <Box sx={{ padding: 0 }}>

                        <Skeleton active paragraph />
                        <Divider sx={{ my: 2 }} />
                        <Skeleton active />
                        <Divider sx={{ my: 2 }} />
                        <Skeleton active />
                    </Box>
                    :
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            py: 2
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Address
                                    </TableCell>
                                    <TableCell>
                                        distance from river
                                    </TableCell>
                                    <TableCell>
                                        Owner
                                    </TableCell>
                                    <TableCell>
                                        Size
                                    </TableCell>
                                    <TableCell>
                                        warehouse size
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredWashedCoffee?.
                                    slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).
                                    map((coffee) => (
                                        <TableRow
                                            hover
                                            key={coffee.Key}
                                        >
                                            <TableCell>
                                                {coffee.Record.name}
                                            </TableCell>
                                            <TableCell>
                                                {coffee.Record.address}
                                            </TableCell>
                                            <TableCell>
                                                {coffee.Record.distanceFromRiver}
                                            </TableCell>
                                            <TableCell>
                                                {coffee.Record.owner}
                                            </TableCell>
                                            <TableCell>
                                                {coffee.Record.size}
                                            </TableCell>
                                            <TableCell>
                                                {coffee.Record.warehouseSize}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={filteredWashedCoffee.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleLimitChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                        />
                    </Box>
                }
            </Card>
        </>
    );
}