import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { GetAllGrowers } from '../../api/grower';
import {
    Typography,
    Box,
    Card
} from '@mui/material';
import Head from 'next/head';
import { GrowerResult } from '@/features/grower/growerSlice';
import GrowerList from '@/components/coffee-grower/grower-list';
import { GrowerToolbar } from '@/components/coffee-grower/grower-toolbar';
import { DashboardLayout } from '@/components/dashboard-layout';

function Page() {
    const dispatch = useAppDispatch();
    const growers = useAppSelector(state => state.grower.growers.result);
    const error = useAppSelector(state => state.grower.error);
    const [filteredGrowers, setFilteredGrowers] = useState<GrowerResult[]>([]);

    const onSearch = (event: any) => {

        let grws = growers?.filter(grower =>
            grower.Record.fullName?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            grower.Record.farmPlace?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            grower.Record.farmSize?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            grower.Record.gender?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            grower.Record.maritalStatus?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            grower.Record.nationalityId?.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredGrowers(grws);
    }
    useEffect(() => {
        dispatch(GetAllGrowers());

        const openNotification = () => {
            notification.open({
                message: 'Something went Wrong',
                description: error,
                placement: "bottomRight"
            });
        };

        if (error) {
            openNotification();
        }
        setFilteredGrowers(growers)
    }, [growers.length])
    return (
        <div style={{ margin: '20px 20px' }}>
            <Head>
                <title>
                    Growers | Adey supply-chain
                </title>
            </Head>
            <Typography
                sx={{ m: 1 }}
                variant="h4"
            >
                Coffee Growers
            </Typography>
            <Card
                sx={{
                    p: 4
                }}>
                <Box>
                    <GrowerToolbar
                        onSearch={onSearch}
                    />
                </Box>
                <Box>
                    <GrowerList
                        filteredGrowers={filteredGrowers}
                    />
                </Box>

            </Card>
        </div>
    );
}

Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Page;


