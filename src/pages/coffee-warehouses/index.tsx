import React, { useEffect, useState } from 'react';
import { Space, notification, Skeleton } from 'antd';
import { Table, Box, Card, Typography, Button as MaterialButton, TableHead, TableRow, TableCell, Tooltip, TableSortLabel, TableBody, Divider, TablePagination, Popover, TableContainer } from '@mui/material';
import Head from 'next/head';
import { WarehouseToolbar } from '@/components/coffee-warehouse/warehouse-toolbar';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { DashboardLayout } from '@/components/dashboard-layout';
import { WarehouseResult } from '@/features/warehouse/warehouseSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { DeleteWarehouse, fetchAllWarehouses } from '@/api/warehouse';

function Page() {
    const dispatch = useAppDispatch();
    let warehouses = useAppSelector(state => state.warehouse.warehouses.response);
    const loading = useAppSelector(state => state.warehouse.loading);
    const error = useAppSelector(state => state.warehouse.error);
    const [filteredWarehouses, setFilteredWarehouses] = useState<WarehouseResult[]>();
    const [toBeDeleted, setToBeDeleted] = useState("");
    const [warehouseToBeEdited, setWarehouseToBeEdited] = useState<WarehouseResult>();
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const popOverOpen = Boolean(anchorEl);
    const popOverId = popOverOpen ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToBeDeleted = (id: string) => {
        setToBeDeleted(id);
    }

    const HandleDelete = async () => {
        handleClose();
        setFilteredWarehouses(filteredWarehouses?.filter(wh => wh.Record.id !== toBeDeleted));
        await dispatch(DeleteWarehouse(toBeDeleted));
        setToBeDeleted("");
        await dispatch(fetchAllWarehouses());
    }

    const HandleEdit = async (key: string) => {
        setWarehouseToBeEdited(filteredWarehouses?.find(wh => wh.Key === key));
        setEdit(true);
        setOpen(true);
    }
    const onSearch = (event: any) => {

        let whs = warehouses?.filter(warehouse =>
            warehouse.Record.address?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            warehouse.Record.name?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            warehouse.Record.capacity?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            warehouse.Record.owner?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            warehouse.Record.size?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            warehouse.Record.warehouseNo?.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredWarehouses(whs);
        console.log(filteredWarehouses)
    }
    const handleLimitChange = (event: any) => {
        setRowsPerPage(event.target.value);

    };
    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
        console.log(newPage);
    };
    // const handlePageChange = (event: any, newPage: any) => {
    //     setPage(newPage);
    // };
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchAllWarehouses());
        }

        const openNotification = () => {
            notification.open({
                message: 'Something went Wrong',
                description: error,
                placement: 'bottomRight'
            });
        };

        fetchData();

        if (error) {
            openNotification();
        }

        setFilteredWarehouses(warehouses);

    }, [warehouses.length, error])
    return (
        <div style={{ margin: '20px 20px' }}>
            <Head>
                <title>
                    Warehouses | Adey supply-chain
                </title>
            </Head>
            <Typography
                sx={{ m: 1 }}
                variant="h4"
            >
                Warehouses
            </Typography>

            <Card
                sx={{
                    p: 4
                }}
            >

                <div>
                    <WarehouseToolbar
                        setWarehouseToBeEdited={setWarehouseToBeEdited}
                        warehouseToBeEdited={warehouseToBeEdited}
                        setOpen={setOpen}
                        open={open}
                        setEdit={setEdit}
                        edit={edit}
                        dispatch={dispatch}
                        onSearch={onSearch}
                    />
                </div>
                {loading ?
                    <Box sx={{ padding: 0 }}>
                        <Skeleton active paragraph />
                        <Divider sx={{ my: 2 }} />
                        <Skeleton active />
                        <Divider sx={{ my: 2 }} />
                        <Skeleton active />
                    </Box>
                    :
                    <Box>
                        <SimpleBar>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    active
                                                    direction="desc"
                                                >
                                                    Name
                                                </TableSortLabel>
                                            </Tooltip>

                                        </TableCell>
                                        <TableCell>
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    active
                                                    direction="desc"
                                                >
                                                    Capacity
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            Address
                                        </TableCell>
                                        <TableCell>
                                            Owner
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    active
                                                    direction="desc"
                                                >
                                                    Size
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell sortDirection="desc">
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    active
                                                    direction="desc"
                                                >
                                                    Warehouse No
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredWarehouses?.slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).map((warehouse) => (
                                        <TableRow
                                            hover
                                            key={warehouse.Key}
                                        >
                                            <TableCell>
                                                {warehouse.Record.name}
                                            </TableCell>
                                            <TableCell>
                                                {warehouse.Record.capacity}
                                            </TableCell>
                                            <TableCell>
                                                {warehouse.Record.address}
                                            </TableCell>
                                            <TableCell>
                                                {warehouse.Record.owner}
                                            </TableCell>
                                            <TableCell>
                                                {warehouse.Record.size}
                                            </TableCell>
                                            <TableCell>
                                                {warehouse.Record.warehouseNo}
                                            </TableCell>
                                            <TableCell>
                                                <Space size='small'>
                                                    <MaterialButton
                                                        component='a'
                                                        href={"https://maps.google.com/maps?q=" + warehouse?.Record.latitude + "," + warehouse?.Record.longitude + "&hl=en&z=14&amp;output=embed"}
                                                        // onClick={() => ViewMap(warehouse.Key)}
                                                        target="_blank"
                                                    >
                                                        Map
                                                    </MaterialButton>

                                                    <MaterialButton
                                                        onClick={() => HandleEdit(warehouse.Key)}
                                                    >
                                                        Edit
                                                    </MaterialButton>
                                                    {/* {toBeDeleted === warehouse.Record.id ?
                                                        <Spin size="small" />
                                                        : */}
                                                    <MaterialButton
                                                        color='error'
                                                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                            handleClick(event)
                                                            handleToBeDeleted(warehouse.Record.id)
                                                        }}
                                                    >
                                                        Delete
                                                    </MaterialButton>
                                                    {/* } */}
                                                    <Box
                                                        sx={{
                                                            alignItems: 'center',
                                                            display: 'flex',
                                                        }}
                                                    >
                                                        <Popover
                                                            sx={{ p: 2 }}
                                                            id={popOverId}
                                                            open={popOverOpen}
                                                            anchorEl={anchorEl}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'left',
                                                            }}
                                                        >
                                                            <Typography sx={{ p: 2 }}>Are you sure you want delete the warehouse?</Typography>
                                                            <MaterialButton
                                                                color="success"
                                                                fullWidth
                                                                variant="text"
                                                                onClick={handleClose}
                                                            >
                                                                Cancel
                                                            </MaterialButton>
                                                            <MaterialButton
                                                                color="error"
                                                                fullWidth
                                                                variant="contained"
                                                                onClick={HandleDelete}
                                                            >
                                                                Delete
                                                            </MaterialButton>
                                                        </Popover>
                                                    </Box>
                                                </Space>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </SimpleBar>
                        <TablePagination
                            component="div"
                            count={warehouses.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleLimitChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                        />
                    </Box>

                }
            </Card>
        </div>
    );
}
Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Page;


