import { FetchAllWashedCoffee, GetAllProducedCoffee } from "../../api/supply";
import { ProducedCoffeeResult } from "../../features/supply/supplySlice";
import { Avatar, Box, Button, Card, Chip, Container, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { Skeleton, Space, Tag } from "antd";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/store';
import NextLink from 'next/link';
import { GetAllGrowers } from "@/api/grower";
import { GetAllTransportationCertificate } from "@/api/transportation";
import React from "react";
import FilterListIcon from '@mui/icons-material/FilterList';

export const AllProducedCoffee = () => {
    const dispatch = useAppDispatch();
    let allProducedCoffees = useAppSelector(state => state.supply.producedCoffee.result);
    let loading = useAppSelector(state => state.supply.loading)
    let loadingGrowers = useAppSelector(state => state.grower.loading);
    let loadingTransporters = useAppSelector(state => state.transportation.loading);
    const [filteredProducedCoffee, setFilteredProducedCoffee] = useState<ProducedCoffeeResult[]>([]);
    const [producedCoffeeToBeFiltered, setProducedCoffeeToBeFiltered] = useState<ProducedCoffeeResult[]>([]);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSearch = (event: any) => {

        let pc = producedCoffeeToBeFiltered?.filter(producedCoffee =>
            producedCoffee.Record.bagSize?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            producedCoffee.Record.batchNumber?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            producedCoffee.Record.coffeeType?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            producedCoffee.Record.productionPlace?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            producedCoffee.Record.status?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            producedCoffee.Record.owner?.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredProducedCoffee(pc);
    }

    const FilterDatas = async () => {
        const filteredProducedCoffee = await allProducedCoffees.filter((value, index, self) =>
            self.findIndex(v => v.Record.batchNumber === value.Record.batchNumber) === index
        );
        setProducedCoffeeToBeFiltered(filteredProducedCoffee)
        setFilteredProducedCoffee(filteredProducedCoffee);
    }

    const handleLimitChange = (event: any) => {
        setRowsPerPage(event.target.value);

    };
    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
        console.log(newPage);
    };

    const HandleOnFilter = async (value: string) => {

        if (value === "WASHED_COFFEE") {
            await FilterDatas();
            setFilteredProducedCoffee(producedCoffeeToBeFiltered.filter(pc => pc.Record.coffeeType === "WASHED_COFFEE"));
        }
        else if (value === "NATURAL_COFFEE") {
            await FilterDatas();

            setFilteredProducedCoffee(producedCoffeeToBeFiltered.filter(pc => pc.Record.coffeeType === "NATURAL_COFFEE"));
        }
        else {
            await FilterDatas();
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(GetAllProducedCoffee());
            dispatch(GetAllGrowers());
            dispatch(GetAllTransportationCertificate());
        }
        fetchData();
        FilterDatas();
    }, [allProducedCoffees.length])
    return (
        <>
            <Head>
                <title>
                    Produced Coffee | Adey supply-chain
                </title>
            </Head>
            <Card
                sx={{
                    p: 4
                }}>

                <Grid style={{ marginBottom: 10 }} container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item style={{ paddingLeft: 25 }} xs={12} md={6}>
                        <Box sx={{
                            m: 1, alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}>
                            <React.Fragment>
                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <Tooltip title="Filter">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <FilterListIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={() => HandleOnFilter("All")}>
                                        All
                                    </MenuItem>
                                    <MenuItem onClick={() => HandleOnFilter("WASHED_COFFEE")}>
                                        Washed Coffee
                                    </MenuItem>
                                    <MenuItem onClick={() => HandleOnFilter("NATURAL_COFFEE")}>
                                        Natural Coffee
                                    </MenuItem>
                                </Menu>
                            </React.Fragment>
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
                                        Batch Number
                                    </TableCell>
                                    <TableCell>
                                        Quantity
                                    </TableCell>
                                    <TableCell>
                                        Bag Size
                                    </TableCell>
                                    <TableCell>
                                        Coffee Type
                                    </TableCell>
                                    <TableCell>
                                        Is Shipped
                                    </TableCell>
                                    <TableCell>
                                        Status
                                    </TableCell>
                                    <TableCell>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProducedCoffee?.
                                    slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).
                                    map((coffee) => (
                                        <TableRow
                                            hover
                                            key={coffee.Key}
                                        >
                                            <TableCell>
                                                {coffee.Record.batchNumber}
                                            </TableCell>
                                            <TableCell>
                                                {allProducedCoffees.filter(pc => pc.Record.batchNumber === coffee.Record.batchNumber).length || "NaN"}
                                            </TableCell>
                                            <TableCell>
                                                {coffee.Record.bagSize}
                                            </TableCell>
                                            <TableCell>
                                                {coffee.Record.coffeeType}
                                            </TableCell>
                                            <TableCell>
                                                {coffee.Record.isShipped ? 'Yes' : 'No'}
                                            </TableCell>
                                            <TableCell>
                                                <Tag
                                                    color={(coffee.Record.status === 'UNPROCESSED' && '#FFB020')
                                                        || (coffee.Record.status === 'PROCESSED' && '#14B8A6')
                                                        || '#D14343'}
                                                >
                                                    {coffee.Record.status.toUpperCase()}
                                                </Tag>
                                            </TableCell>
                                            <TableCell>
                                                <NextLink
                                                    href={`supply-coffee/produced-coffee-detail?batch_number=${coffee.Record.batchNumber}`}
                                                    passHref
                                                    legacyBehavior
                                                >
                                                    <Button
                                                        disabled={loading || loadingGrowers || loadingTransporters}
                                                    >
                                                        Details
                                                    </Button>
                                                </NextLink>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={filteredProducedCoffee.length}
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