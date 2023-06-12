
import {
    useAppSelector
} from "@/app/store";
import {
    Box,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { Skeleton, Space, Tag } from "antd";
import { useState } from "react";
import NextLink from 'next/link';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { SupplyShipmentResult } from "@/features/supply/supplySlice";

interface Props {
    filteredSupplyShipments: SupplyShipmentResult[]
}

const SupplyShipmentList: React.FC<Props> = ({ filteredSupplyShipments: filteredSupplyShipments }) => {
    const loading = useAppSelector(state => state.transportation.loading);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event: any) => {
        setRowsPerPage(event.target.value);

    };
    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    
    return (
        <Box>
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
                        <Box>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Owner
                                        </TableCell>
                                        <TableCell>
                                            Coffee Type
                                        </TableCell>
                                        <TableCell>
                                            Delivery Date
                                        </TableCell>
                                        <TableCell>
                                            Destination
                                        </TableCell>
                                        <TableCell>
                                            Quantity
                                        </TableCell>
                                        <TableCell>
                                            Received By
                                        </TableCell>
                                        <TableCell>
                                            status
                                        </TableCell>
                                        <TableCell>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredSupplyShipments?.
                                        slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).
                                        map((shipment) => (
                                            <TableRow
                                                hover
                                                key={shipment.Key}
                                            >
                                                <TableCell>
                                                    {shipment.Record.owner}
                                                </TableCell>
                                                <TableCell>
                                                    {shipment.Record.coffeeType}
                                                </TableCell>
                                                <TableCell>
                                                    {shipment.Record.deliveryDate.replaceAll("-", "/")}
                                                </TableCell>
                                                <TableCell>
                                                    {shipment.Record.destination}
                                                </TableCell>
                                                <TableCell>
                                                    {shipment.Record.quantity}
                                                </TableCell>
                                                <TableCell>
                                                    {shipment.Record.recievedBy}
                                                </TableCell>
                                                <TableCell>
                                                    <Tag
                                                        color={(shipment.Record.status === 'REQUESTED' && '#FFB020')
                                                            || (shipment.Record.status === 'DELIVERED' && '#14B8A6')
                                                            || '#D14343'}
                                                    >
                                                        {shipment.Record.status.toUpperCase()}
                                                    </Tag>
                                                </TableCell>
                                                <TableCell>
                                                    <NextLink
                                                        href={`coffee-supply-shipment/detail?id=${shipment.Record.id}`}
                                                        passHref
                                                        legacyBehavior
                                                    >
                                                        <Button
                                                            color="primary"
                                                        >
                                                            Details
                                                        </Button>
                                                    </NextLink>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </SimpleBar>
                    <TablePagination
                        component="div"
                        count={filteredSupplyShipments.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                    />
                </Box>

            }
        </Box>
    );
}

export default SupplyShipmentList;