import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    CardHeader,
    Grid,
} from '@mui/material';
import { Tag, Card, DatePicker, Table, DatePickerProps } from 'antd';
import dateFormat from 'dateformat';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { FetchYearlyPrices } from '@/api/price';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { PriceResult } from '@/features/price/PriceSlice';

function YearlyPrice() {
    const columns: ColumnsType<PriceResult> = [
        {
            title: 'Coffee Type',
            dataIndex: 'coffeeType',
            key: 'coffeeType',
            render: (_, result) => (
                <>{result.Record.coffeeType}</>
            ),
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            render: (_, result) => (
                <>{result.Record.currency}</>
            ),
        },
        {
            title: 'Added Date',
            dataIndex: 'date',
            key: 'date',
            render: (_, result) => (
                <>{dateFormat(result.Record.date, "mmm d, yyyy")}</>
            ),
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
            render: (_, result) => (
                <Tag color="green">{result.Record.grade}</Tag>
            ),
        },
        {
            title: 'Measurment Unit',
            key: 'measurmentUnit',
            dataIndex: 'measurmentUnit',
            render: (_, result) => (
                <>{result.Record.measurmentUnit}</>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, result) => (
                <>{result.Record.price}</>
            ),
        }
    ];

    const dispatch = useAppDispatch();
    const loadingYearlyPrice = useAppSelector(state => state.coffeePrice.loadingYearlyPrice);
    const yearlyPrices = useAppSelector(state => state.coffeePrice.yearlyCoffeePrice.result);
    const [year, setYear] = useState(new Date().getFullYear().toString());

    const onYearChanged: DatePickerProps['onChange'] = (date, dateString) => {
        setYear(dateString)
        dispatch(FetchYearlyPrices(dateString));
    };

    useEffect(() => {
        dispatch(FetchYearlyPrices(year));
    }, [yearlyPrices.length, year, dispatch]);
    return (
        <Card >
            <Grid style={{ marginBottom: 10 }} container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <CardHeader title={year + " Price"} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <DatePicker picker="year" bordered={true} style={{ width: '100%' }} onChange={onYearChanged} />
                    </Box>
                </Grid>
            </Grid>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table bordered={true} size={'large'} tableLayout="auto" loading={loadingYearlyPrice} rowKey="Key" columns={columns} dataSource={yearlyPrices} />
                </Box>
            </PerfectScrollbar>
        </Card>
    )
}

export default YearlyPrice;