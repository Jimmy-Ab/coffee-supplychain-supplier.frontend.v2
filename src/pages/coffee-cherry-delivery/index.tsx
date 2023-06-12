import React, { useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    TextField,
    InputAdornment,
    SvgIcon,
    Chip,
    Menu,
    MenuItem,
    Card,
    Popover
} from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../app/store";
import { CherryResult } from "../../features/cherry/cherrySlice";
import dateFormat from "dateformat";
import { Tag, Table, Space } from "antd";
import { DeleteCherryDelivery, GetAllCherryDelivery, InspectCherryDelivery } from "../../api/cherry";
import { ColumnsType } from "antd/es/table";
import { Search as SearchIcon } from '../../icons/search';
import { Download as DownloadIcon } from '../../icons/download';
import { Upload as UploadIcon } from '../../icons/upload';
import { GetAllGrowers } from "../../api/grower";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import NextLink from 'next/link';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { DashboardLayout } from "@/components/dashboard-layout";
import { fetchAllWarehouses } from "@/api/warehouse";
function Page() {

    const deliveryColumns: ColumnsType<CherryResult> = [
        {
            title: 'BATCH NUMBER',
            dataIndex: 'batchNumber',
            key: 'batchNumber',
            render: (_, delivery) => (
                <>{delivery.Record.batchNumber}</>
            ),
        },
        {
            title: 'COFFEE GROWER',
            dataIndex: 'coffeeGrower',
            key: 'coffeeGrower',
            render: (_, delivery) => (
                <NextLink
                    href={`coffee-grower/detail?id=${delivery.Record.coffeegrower}`}
                    passHref
                    legacyBehavior
                >
                    <a>
                        {growers.find(g => g.Record.id === delivery.Record.coffeegrower)?.Record.fullName}
                    </a>
                </NextLink>
            ),
        },
        {
            title: 'DATE',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            render: (_, delivery) => (
                <>{delivery.Record.deliveryDate}</>
            ),
        },
        {
            title: 'DELIVERED TO',
            dataIndex: 'deliveredTo',
            key: 'deliveredTo',
            render: (_, delivery) => (
                <>{delivery.Record.deliveredTo}</>
            ),

        },
        {
            title: 'Warehouse',
            dataIndex: 'warehouseId',
            key: 'warehouseId',
            render: (_, delivery) => (
                <>
                    {warehouses.find(w => w.Record.id === delivery.Record.warehouseId)?.Record.name}
                </>
            ),

        },
        {
            title: 'SELLING PRICE',
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
            render: (_, delivery) => (
                <>{delivery.Record.sellingPrice}{delivery.Record.currency}</>
            ),
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (_, delivery) => (
                <Tag
                    color={(delivery.Record.status === 'Collected' && '#FFB020')
                        || (delivery.Record.status === 'Processed' && '#14B8A6')
                        || '#14B8A6'}
                >
                    {delivery.Record.status}
                </Tag>
            ),
        }
    ]
    const coffeeCherrys = useAppSelector(state => state.cherry.cherrys.result);
    const loading = useAppSelector(state => state.cherry.loading);
    const growers = useAppSelector(state => state.grower.growers.result);
    const warehouses = useAppSelector(state => state.warehouse.warehouses.response);
    const dispatch = useAppDispatch();
    const [filteredDeliveries, setFilteredDeliveries] = useState<CherryResult[]>();
    const [toBeDeleted, setToBeDeleted] = useState({ deliveredTo: '', batchNumber: '', deliveryId: '' });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
    const popOverOpen = Boolean(popoverAnchorEl);
    const popOverId = popOverOpen ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPopoverAnchorEl(event.currentTarget);
    };
    const handleInspect = async (deliveredTo: string, batchNumber: string, deliveryId: string, quality: string) => {
        setAnchorEl(null);
        await dispatch(InspectCherryDelivery({ deliveredTo, batchNumber, deliveryId, quality }));
        await dispatch(GetAllCherryDelivery());
    };

    const handleClose = () => {
        setAnchorEl(null);
        setPopoverAnchorEl(null);
    };
    const onSearch = (event: any) => {

        let deliveries = coffeeCherrys?.filter(cherry =>
            cherry.Record.batchNumber?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            cherry.Record.deliveredTo?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            cherry.Record.status?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            cherry.Record.sellingPrice?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            cherry.Record.farmPlace?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            cherry.Record.qualityStatus?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            cherry.Record.quantity?.toLowerCase().includes(event.target.value.toLowerCase())

        )
        setFilteredDeliveries(deliveries);
    }
    const handleToBeDeleted = async (deliveredTo: string, batchNumber: string, deliveryId: string) => {
        setToBeDeleted({
            deliveredTo: deliveredTo,
            batchNumber: batchNumber,
            deliveryId: deliveryId
        });
    }

    const onDelete = async () => {
        handleClose();
        setFilteredDeliveries(filteredDeliveries?.filter(d => d.Record.deliveryId !== toBeDeleted.deliveryId))
        await dispatch(DeleteCherryDelivery({ deliveredTo: toBeDeleted.deliveredTo, batchNumber: toBeDeleted.batchNumber, deliveryId: toBeDeleted.deliveryId }))
        setToBeDeleted({
            deliveredTo: '',
            batchNumber: '',
            deliveryId: ''
        });
        await dispatch(GetAllCherryDelivery());
    }

    useEffect(() => {

        const fetchData = async () => {
            await dispatch(GetAllCherryDelivery());
            await dispatch(GetAllGrowers());
            await dispatch(fetchAllWarehouses());
        }

        fetchData();

        setFilteredDeliveries(coffeeCherrys);
    }, [coffeeCherrys.length])
    return (
        <div style={{ margin: '20px 20px' }}>
            <PerfectScrollbar>
                <Typography
                    sx={{ m: 1 }}
                    variant="h4"
                >
                    Cherry Delivery
                </Typography>
                <Card sx={{ p: 2 }}>
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
                                <Box sx={{ m: 1 }}>
                                    <NextLink href='coffee-cherry-delivery/add' passHref legacyBehavior>
                                        <Button
                                            // component='a'
                                            // href='add-cherry-delivery'
                                            color="primary"
                                            variant="contained"
                                        >
                                            Add Delivery
                                        </Button>
                                    </NextLink>
                                    <Button
                                        startIcon={(<UploadIcon fontSize="small" />)}
                                        sx={{ mr: 1 }}
                                    >
                                        Import
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
                                        placeholder="Search deliveries"
                                        variant="outlined"
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ m: 1 }}>
                                <Chip icon={<EmojiObjectsIcon />} label="Tip: Search by entering a keyword from the table" />
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
                <div>
                    <SimpleBar>
                        <Table bordered={false} size={'large'}
                            expandable={{
                                expandedRowRender: (cherry) => <div style={{ marginRight: 35, marginLeft: 30 }}>
                                    <List>
                                        <ListItem alignItems="flex-start"
                                            secondaryAction={
                                                <Space size='small'>
                                                    <div style={{ marginRight: 50, marginBottom: 30 }}>
                                                        Quality: <Tag
                                                            color={(cherry.Record.qualityStatus === 'Failed' && '#D14343')
                                                                || (cherry.Record.qualityStatus === 'Passed' && '#14B8A6')
                                                                || '#FFB020'}
                                                        >
                                                            {cherry.Record.qualityStatus}
                                                        </Tag>
                                                    </div>
                                                    <div style={{ marginRight: 70, marginBottom: 30 }}>
                                                        Quantity: <Typography
                                                            component="span"
                                                            variant="h6"
                                                            color="main.primary"
                                                            gutterBottom
                                                        >
                                                            {cherry.Record.quantity} {cherry.Record.unitOfMeasure}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            color="secondary"
                                                            id="basic-button"
                                                            aria-controls={open ? 'basic-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={handleClick}
                                                        >
                                                            Inspect
                                                        </Button>
                                                        <Menu
                                                            id="basic-menu"
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                            MenuListProps={{
                                                                'aria-labelledby': 'basic-button',
                                                            }}
                                                        >
                                                            <MenuItem onClick={() => handleInspect(cherry.Record.deliveredTo, cherry.Record.batchNumber, cherry.Record.deliveryId, "Passed")}>Passed</MenuItem>
                                                            <MenuItem onClick={() => handleInspect(cherry.Record.deliveredTo, cherry.Record.batchNumber, cherry.Record.deliveryId, "Failed")}>Failed</MenuItem>
                                                        </Menu>
                                                    </div>
                                                    <NextLink href={`coffee-cherry-delivery/add?id=${cherry.Record.deliveryId}`} passHref legacyBehavior>
                                                        <Button>Edit</Button>
                                                    </NextLink>
                                                    <Button color='error' onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                        handleDeleteClick(event)
                                                        handleToBeDeleted(cherry.Record.deliveredTo, cherry.Record.batchNumber, cherry.Record.deliveryId)
                                                    }}>
                                                        Delete
                                                    </Button>
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
                                                            anchorEl={popoverAnchorEl}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'left',
                                                            }}
                                                        >
                                                            <Typography sx={{ p: 2 }}>Are you sure you want delete the delivery?</Typography>
                                                            <Button
                                                                color="success"
                                                                fullWidth
                                                                variant="text"
                                                                onClick={handleClose}
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                color="error"
                                                                fullWidth
                                                                variant="contained"
                                                                onClick={onDelete}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </Popover>
                                                    </Box>
                                                </Space>

                                            }>
                                            <ListItemText
                                                primary={
                                                    <div style={{ marginBottom: 10 }}>
                                                        Farm Place - {cherry.Record.farmPlace}
                                                    </div >
                                                }
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography

                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {growers.find(g => g.Record.id === cherry.Record.coffeegrower)?.Record.fullName}
                                                        </Typography>
                                                        {` - collected on ${dateFormat(cherry.Record.collectionDate, "mmm d, yyyy")} from ${cherry.Record.farmPlace} (${cherry.Record.longitude},${cherry.Record.latitude})`}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </div>,

                                rowExpandable: (record) => record.Record.collectionDate !== 'Not Expandable',
                            }}
                            tableLayout="auto"
                            // scroll={{ x: '70vw' }}
                            loading={loading}
                            rowKey="Key"
                            columns={deliveryColumns}
                            dataSource={filteredDeliveries}
                        />
                    </SimpleBar>
                </div>
            </PerfectScrollbar >
        </div >
    );
}
Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Page;