import { Avatar, Box, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';
import { Spin, Table, Card, Tag, DatePicker, DatePickerProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dateFormat from 'dateformat';
import { useEffect, useState } from 'react';
import { FetchMonthlyPrice } from '@/api/price';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { PriceResult } from '@/features/price/PriceSlice';

function MonthlyPrice() {
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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, result) => (
                <>{result.Record.price}{result.Record.currency} / {result.Record.measurmentUnit}</>
            ),
        }
    ];
    const dispatch = useAppDispatch();
    const coffeeMonthlyPrice = useAppSelector(state => state.coffeePrice.monthlyCoffeePrice.result);
    const loadingMonthlyPrice = useAppSelector(state => state.coffeePrice.loadingMonthlyPrice);
    const [year, setYear] = useState<string>(new Date().getFullYear().toString());
    const [month, setMonth] = useState<string>("");

    const onMonthChanged: DatePickerProps['onChange'] = async (date, dateString) => {

        if (dateString !== "") {
            console.log(dateString)

            var splitted = dateString.split("-", 2);
            console.log(splitted)

            setYear(splitted[0])
            setMonth(splitted[1])

            setYear(dateString)
            await dispatch(FetchMonthlyPrice({ month: month, year: year }));
        }
    };

    useEffect(() => {
        let mon = new Date().getUTCMonth() + 1;
        setMonth(mon.toString())
        dispatch(FetchMonthlyPrice({ month: mon.toString(), year: year }));
    }, [coffeeMonthlyPrice.length, year, dispatch]);

    return (
        <>
            <Card>
                <Grid style={{ marginBottom: 10 }} container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <CardHeader title={"Monthly Price"} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2
                            }}
                        >
                            <DatePicker picker="month" bordered={true} style={{ width: '100%' }} onChange={onMonthChanged} />
                        </Box>
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
                                AVERAGE MONTHLY PRICE
                            </Typography>
                            {loadingMonthlyPrice ?
                                <Spin style={{ display: "block" }} />
                                :
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    $26k
                                </Typography>
                            }
                        </Grid>
                        <Grid item>
                            <Avatar
                                sx={{
                                    backgroundColor: 'primary.main',
                                    height: 56,
                                    width: 56
                                }}
                            >
                                <MoneyIcon />
                            </Avatar>
                        </Grid>
                    </Grid>

                </CardContent>

                <Table bordered={false} size={'small'} tableLayout="auto" loading={loadingMonthlyPrice} rowKey="Key" columns={columns} dataSource={coffeeMonthlyPrice} />
            </Card>
        </>
    );
}

export default MonthlyPrice;