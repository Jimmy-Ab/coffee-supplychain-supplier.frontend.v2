import Head from 'next/head';
import {
    Box,
    Card,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useRouter } from 'next/router'
import { useAppSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { ProducedCoffeeResult,  } from '@/features/supply/supplySlice';
import { } from 'antd';

function ProducedCoffeeBags() {
    let allProducedCoffees = useAppSelector(state => state.supply.producedCoffee.result);

    const router = useRouter()
    const { batch_number } = router.query
    const [selectedProducedCoffee, setSelectedProducedCoffee] = useState<ProducedCoffeeResult[]>([]);
    const [bagCount, setBagCount] = useState(0);
    const [page, setPage] = useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        setSelectedProducedCoffee(allProducedCoffees.filter(g => g.Record.batchNumber === batch_number));
        setBagCount(selectedProducedCoffee?.length || 0);
    })
    return (
        <>
            <Card
                sx={{
                    p: 4
                }}>
                <Typography
                    variant="h6"
                >
                    Bags({bagCount})
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Bag Id
                            </TableCell>
                            <TableCell>
                                Bag Size
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedProducedCoffee?.slice((page - 1) * 10, (page - 1) * 10 + 10).map((pc) => (
                            <TableRow
                                key={pc.Key}
                            >
                                <TableCell>
                                    {pc.Record.bagId}
                                </TableCell>
                                <TableCell>
                                    {pc.Record.bagSize}
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
                        count={Math.ceil(bagCount / 10)}
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

export default ProducedCoffeeBags;