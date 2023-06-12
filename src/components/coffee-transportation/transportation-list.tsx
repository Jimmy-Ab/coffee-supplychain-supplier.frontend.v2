
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
import { TransportationResult } from "@/features/transportation/transportationSlice";

interface Props {
    filteredTransportations: TransportationResult[]
}

const TransportationList: React.FC<Props> = ({ filteredTransportations }) => {
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
                                            Address
                                        </TableCell>
                                        <TableCell>
                                            Given Date
                                        </TableCell>
                                        <TableCell>
                                            End Date
                                        </TableCell>
                                        <TableCell>
                                            Status
                                        </TableCell>
                                        <TableCell>
                                            Given By
                                        </TableCell>
                                        <TableCell>
                                            Given for
                                        </TableCell>
                                        <TableCell>
                                            License
                                        </TableCell>
                                        <TableCell>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredTransportations?.
                                        slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).
                                        map((transportation) => (
                                            <TableRow
                                                hover
                                                key={transportation.Key}
                                            >
                                                <TableCell>
                                                    {transportation.Record.address}
                                                </TableCell>
                                                <TableCell>
                                                    {transportation.Record.givenDate.replaceAll("-", "/")}
                                                </TableCell>
                                                <TableCell>
                                                    {transportation.Record.endDate.replaceAll("-", "/")}
                                                </TableCell>
                                                <TableCell>
                                                    <Tag
                                                        color={(transportation.Record.status === 'REQUESTED' && '#FFB020')
                                                            || (transportation.Record.status === 'CERTIFIED' && '#14B8A6')
                                                            || '#D14343'}
                                                    >
                                                        {transportation.Record.status.toUpperCase()}
                                                    </Tag>
                                                </TableCell>
                                                <TableCell>
                                                    {transportation.Record.givenBy}
                                                </TableCell>
                                                <TableCell>
                                                    {transportation.Record.givenFor}
                                                </TableCell>
                                                <TableCell>
                                                    {transportation.Record.loadingTransportLicence}
                                                </TableCell>

                                                <TableCell>
                                                    <NextLink
                                                        href={`transportation-certificate/detail?id=${transportation.Record.id}`}
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
                        count={filteredTransportations.length}
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

export default TransportationList;