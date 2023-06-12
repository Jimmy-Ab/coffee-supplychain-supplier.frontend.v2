import Head from 'next/head';
import {
    Box,
    Card,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { useRouter } from 'next/router'
import { useAppSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { SupplyShipmentResult } from '@/features/supply/supplySlice';

function SupplyShipmentBags() {
    const coffeeSupplyShipments = useAppSelector(state => state.supply.supplyShipment.response);

    const router = useRouter()
    const { id } = router.query
    const [selectedSupplyShipment, setSelectedSupplyShipment] = useState<SupplyShipmentResult>();
    const [bagCount, setBagCount] = useState(0);
    const [page, setPage] = useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        setSelectedSupplyShipment(coffeeSupplyShipments.find(g => g.Record.id === id));
        setBagCount(selectedSupplyShipment?.Record.bags.length || 0);
    })
    return (
        <>
            <Card
                sx={{
                    p: 4
                }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Bags({bagCount})</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedSupplyShipment?.Record.bags.slice((page - 1) * 8, (page - 1) * 8 + 8).map((id) => (
                            <TableRow
                                key={id}
                            >
                                <TableCell>
                                    {id}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Pagination
                        count={Math.ceil(bagCount / 8)}
                        size="small"
                        page={page}
                        onChange={handleChange}
                        color="primary"
                    />
                </Box>
            </Card>
        </>
    )
}

export default SupplyShipmentBags;