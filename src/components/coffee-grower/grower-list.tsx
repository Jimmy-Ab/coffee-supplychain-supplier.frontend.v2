import {
    useAppSelector
} from "@/app/store";
import {
    Avatar,
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
import { Skeleton, Space } from "antd";
import { useState } from "react";
import NextLink from 'next/link';
import { GrowerResult } from "@/features/grower/growerSlice";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { getInitials } from "@/utils/get-initials";
interface Props {
    filteredGrowers: GrowerResult[]
}

const GrowerList: React.FC<Props> = ({ filteredGrowers }) => {
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
                                        </TableCell>
                                        <TableCell>
                                            Full Name
                                        </TableCell>
                                        <TableCell>
                                            Farm Place
                                        </TableCell>
                                        <TableCell>
                                            Farm Size
                                        </TableCell>
                                        <TableCell>
                                            Gender
                                        </TableCell>
                                        <TableCell sortDirection="desc">
                                            Nationality Id
                                        </TableCell>
                                        <TableCell>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredGrowers?.
                                        slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).
                                        map((grower) => (
                                            <TableRow
                                                hover
                                                key={grower.Key}
                                            >
                                                <TableCell>
                                                    <Avatar
                                                        sx={{ backgroundColor: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6) }}
                                                    >
                                                        {getInitials(grower.Record.fullName)}
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell>
                                                    <NextLink
                                                        href={`coffee-growers/detail?id=${grower.Record.id}`}
                                                        passHref
                                                        legacyBehavior
                                                    >
                                                        <Button
                                                            color="primary"
                                                        >
                                                            {grower.Record.fullName}
                                                        </Button>
                                                    </NextLink>
                                                </TableCell>
                                                <TableCell>
                                                    {grower.Record.farmPlace}
                                                </TableCell>
                                                <TableCell>
                                                    {grower.Record.farmSize}
                                                </TableCell>
                                                <TableCell>
                                                    {grower.Record.gender}
                                                </TableCell>
                                                <TableCell>
                                                    {grower.Record.nationalityId}
                                                </TableCell>
                                                <TableCell>
                                                    <Space size="middle">
                                                        <NextLink
                                                            href={`coffee-growers/detail?id=${grower.Record.id}`}
                                                            passHref
                                                            legacyBehavior
                                                        >
                                                            <Button
                                                                color="secondary"
                                                            >
                                                                Details
                                                            </Button>
                                                        </NextLink>
                                                    </Space>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </SimpleBar>
                    <TablePagination
                        component="div"
                        count={filteredGrowers.length}
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

export default GrowerList;