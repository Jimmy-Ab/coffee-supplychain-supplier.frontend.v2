import { FetchAllNaturalCoffee } from "../../api/supply";
import { NaturalCoffeeResult } from "../../features/supply/supplySlice";
import { Box, Button, Card, Chip, Container, Divider, Grid, InputAdornment, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { Skeleton, Space } from "antd";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { Download as DownloadIcon } from '../../icons/download';
import { Upload as UploadIcon } from '../../icons/upload';
import { Search as SearchIcon } from '../../icons/search';
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/store';
import NextLink from 'next/link';
import ProduceNaturalCoffees from "./produce-natural-coffee";

export const NaturalCoffeeInd = () => {
    const dispatch = useAppDispatch();
    let allNaturalCoffees = useAppSelector(state => state.supply.naturalCoffee.result);
    let loading = useAppSelector(state => state.supply.loading)
    const [filteredNaturalCoffee, setFilteredNaturalCoffee] = useState<NaturalCoffeeResult[]>();

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const onSearch = (event: any) => {

        let nc = allNaturalCoffees?.filter(naturalCoffee =>
            naturalCoffee.Record.address?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            naturalCoffee.Record.dringAreaSize?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            naturalCoffee.Record.owner?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            naturalCoffee.Record.size?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            naturalCoffee.Record.warehouseSize?.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredNaturalCoffee(nc);
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
            await dispatch(FetchAllNaturalCoffee());
        }
        fetchData();

        setFilteredNaturalCoffee(allNaturalCoffees);
    }, [allNaturalCoffees.length])
    return (
        <>
            <Card
                sx={{
                    p: 4
                }}>
                <Head>
                    <title>
                        Coffee supply | Adey supply-chain
                    </title>
                </Head>
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
                                <NextLink href='supply-coffee/add-natural-coffee' passHref legacyBehavior>
                                    <Button
                                        variant="contained"
                                        sx={{ mr: 1 }}
                                    >
                                        Register Natural Coffee
                                    </Button>
                                </NextLink>
                                <ProduceNaturalCoffees />
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
                        <Box sx={{ mt: 0 }}>
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
                                    placeholder="Search Natural coffees"
                                    variant="outlined"
                                />
                            </Box>
                            <Box sx={{ m: 1 }}>
                                <Chip icon={<EmojiObjectsIcon />} label="Tip: Search by entering a keyword from the table" />
                            </Box>
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
                                        drying area size
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
                                    <TableCell>
                                        actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredNaturalCoffee?.
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
                                                {coffee.Record.dringAreaSize}
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
                                            <TableCell>
                                                <Space size='small'>
                                                    <Button >Edit</Button>
                                                    <Button color='error'>Delete</Button>
                                                </Space>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={allNaturalCoffees.length}
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