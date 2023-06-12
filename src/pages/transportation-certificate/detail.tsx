import { useAppSelector } from "@/app/store";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { TransportationResult } from "@/features/transportation/transportationSlice";
import { DashboardLayout } from "@/components/dashboard-layout";
import Head from "next/head";
import CertificateDetail from "@/components/coffee-transportation/transport-certificate-details";

function Page() {

    return (
        <>
            <Head>
                <title>
                    Certificate Detail | Adey Supply-Chain
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 3
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h5"
                    >
                        Transportation Certificate Detail
                    </Typography>

                    <Box>
                        <CertificateDetail />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;