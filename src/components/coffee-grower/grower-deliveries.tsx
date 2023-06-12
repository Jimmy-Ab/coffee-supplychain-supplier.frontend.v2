
import {
    useAppSelector
} from "@/app/store";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Box,
    Button,
    Card,
    CardContent,
    Divider
} from "@mui/material";
import { Skeleton, Space } from "antd";
import { useState } from "react";
import NextLink from 'next/link';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Deliveries } from "@/features/grower/growerSlice";
interface Props {
    deliveries: Deliveries[]
}

export const GrowerDeliveries:
    React.FC<Props> = ({
        deliveries
    }) => {
        const loading = useAppSelector(state => state.grower.loading);
        const [rowsPerPage, setRowsPerPage] = useState(10);
        const [page, setPage] = useState(0);

        const handleLimitChange = (event: any) => {
            setRowsPerPage(event.target.value);

        };
        const handlePageChange = (event: unknown, newPage: number) => {
            setPage(newPage);
        };

        return (
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <CardContent>
                    <Box>
                        {loading ?
                            <Box sx={{ padding: 0 }}>
                                <Skeleton active paragraph />
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
                                                        Batch Number
                                                    </TableCell>
                                                    <TableCell>
                                                        Delivered To
                                                    </TableCell>
                                                    <TableCell>
                                                        Delivery Id
                                                    </TableCell>
                                                    <TableCell>
                                                        Quantity
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {deliveries?.
                                                    slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).
                                                    map((delivery) => (
                                                        <TableRow
                                                            hover
                                                            key={delivery.deliveryId}
                                                        >
                                                            <TableCell>
                                                                {delivery.batchNumber}
                                                            </TableCell>
                                                            <TableCell>
                                                                {delivery.deliveredTo}
                                                            </TableCell>
                                                            <TableCell>
                                                                {delivery.deliveryId}
                                                            </TableCell>
                                                            <TableCell>
                                                                {delivery.quantity}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </SimpleBar>
                                <TablePagination
                                    component="div"
                                    count={deliveries.length}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleLimitChange}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                />
                            </Box>
                        }
                    </Box>
                </CardContent>
            </Card>
        );
    };