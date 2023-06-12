import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import millify from "millify";
import { GetAllDailyPrice } from '@/api/price';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { PriceResult } from '@/features/price/PriceSlice';

function TodayPrice() {

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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, result) => (
                <>{millify(Number(result.Record.price))}{result.Record.currency} / {result.Record.measurmentUnit}</>
            ),
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
            render: (_, result) => (
                <Tag color="green">{result.Record.grade}</Tag>
            ),
        }
    ];
    const dispatch = useAppDispatch();
    const coffeeDailyPrice = useAppSelector(state => state.coffeePrice.dailyCoffeePrice.result);
    const loadingDailyPrice = useAppSelector(state => state.coffeePrice.loadingDailyPrice);
    const [latest, setLattest] = useState<PriceResult>();

    useEffect(() => {
        dispatch(GetAllDailyPrice());
        setLattest(coffeeDailyPrice[0]);
        console.log(latest)
    }, [coffeeDailyPrice.length]);

    return (
        <>
            <Card>
                <Grid style={{ marginBottom: 10 }} container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={8}>
                        <CardHeader title="Daily Price" />
                    </Grid>
                </Grid>
                <CardContent>
                    <Grid
                        container
                        // spacing={3}
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Grid item>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                LATEST PRICE
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                {millify(Number(latest?.Record?.price))}
                                {/* $24k */}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar
                                sx={{
                                    backgroundColor: 'success.main',
                                    height: 56,
                                    width: 56
                                }}
                            >
                                <AttachMoneyIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                </CardContent>

                <Table bordered={false} size={'small'} tableLayout="auto" loading={loadingDailyPrice} rowKey="Key" columns={columns} dataSource={coffeeDailyPrice} />
            </Card>
        </>
    );
}

export default TodayPrice;